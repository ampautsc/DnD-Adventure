import request from 'supertest';
import app from '../index';
import { connectTestDB, closeTestDB, clearTestDB } from './helpers';

const validCharacterBody = {
  name: 'Brom',
  level: 3,
  species: 'Human',
  characterClass: 'Fighter',
  background: 'Acolyte',
  abilityScores: {
    strength: 16,
    dexterity: 13,
    constitution: 14,
    intelligence: 10,
    wisdom: 12,
    charisma: 8,
  },
  hitPoints: { max: 28, current: 28 },
  armorClass: 13,
  speed: 30,
  passivePerception: 11,
};

const validEncounterBody = {
  name: 'Skeleton Patrol',
  description: 'Three skeletons guard an ancient tomb.',
  difficulty: 'medium',
  type: 'combat',
  minPartySize: 1,
  maxPartySize: 4,
  minLevel: 2,
  maxLevel: 5,
  enemies: [
    { name: 'Skeleton', count: 3, cr: '1/4', type: 'undead' },
  ],
  environment: 'dungeon',
  objectives: ['Defeat all skeletons'],
  rewards: { xp: 150, gold: 0, items: [] },
  tags: ['undead', 'dungeon'],
};

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

beforeEach(async () => {
  await clearTestDB();
});

const createCombatSession = async () => {
  const charRes = await request(app).post('/api/characters').send(validCharacterBody);
  const encRes = await request(app).post('/api/encounters').send(validEncounterBody);
  const startRes = await request(app).post('/api/combat/start').send({
    encounterId: encRes.body._id,
    characterIds: [charRes.body._id],
  });
  return { session: startRes.body, characterId: charRes.body._id, encounterId: encRes.body._id };
};

describe('POST /api/combat/start', () => {
  it('starts a combat session with valid data', async () => {
    const charRes = await request(app).post('/api/characters').send(validCharacterBody);
    const encRes = await request(app).post('/api/encounters').send(validEncounterBody);

    const res = await request(app).post('/api/combat/start').send({
      encounterId: encRes.body._id,
      characterIds: [charRes.body._id],
    });

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.status).toBe('active');
    expect(res.body.participants).toBeDefined();
    expect(res.body.participants.length).toBeGreaterThan(0);
  });

  it('returns 400 when encounterId is missing', async () => {
    const charRes = await request(app).post('/api/characters').send(validCharacterBody);
    const res = await request(app).post('/api/combat/start').send({
      characterIds: [charRes.body._id],
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 when characterIds is missing', async () => {
    const encRes = await request(app).post('/api/encounters').send(validEncounterBody);
    const res = await request(app).post('/api/combat/start').send({
      encounterId: encRes.body._id,
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 404 when encounter does not exist', async () => {
    const charRes = await request(app).post('/api/characters').send(validCharacterBody);
    const res = await request(app).post('/api/combat/start').send({
      encounterId: '000000000000000000000001',
      characterIds: [charRes.body._id],
    });
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  it('returns 404 when no valid characters are found', async () => {
    const encRes = await request(app).post('/api/encounters').send(validEncounterBody);
    const res = await request(app).post('/api/combat/start').send({
      encounterId: encRes.body._id,
      characterIds: ['000000000000000000000001'],
    });
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /api/combat/:id', () => {
  it('returns a combat session by id', async () => {
    const { session } = await createCombatSession();
    const res = await request(app).get(`/api/combat/${session._id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(session._id);
    expect(res.body.status).toBe('active');
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).get('/api/combat/000000000000000000000001');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('POST /api/combat/:id/turn', () => {
  it('executes an attack turn action', async () => {
    const { session } = await createCombatSession();
    const actor = session.participants.find((p: { type: string }) => p.type === 'character');
    const target = session.participants.find((p: { type: string }) => p.type === 'enemy');

    const res = await request(app).post(`/api/combat/${session._id}/turn`).send({
      participantId: actor.id,
      actionType: 'attack',
      targetId: target.id,
    });

    expect(res.status).toBe(200);
    expect(res.body.log.length).toBeGreaterThan(1);
    expect(res.body.rounds).toHaveLength(1);
  });

  it('executes a heal turn action', async () => {
    const { session } = await createCombatSession();
    const actor = session.participants.find((p: { type: string }) => p.type === 'character');

    const res = await request(app).post(`/api/combat/${session._id}/turn`).send({
      participantId: actor.id,
      actionType: 'heal',
    });

    expect(res.status).toBe(200);
    expect(res.body.log.length).toBeGreaterThan(1);
  });

  it('executes a dodge turn action', async () => {
    const { session } = await createCombatSession();
    const actor = session.participants.find((p: { type: string }) => p.type === 'character');

    const res = await request(app).post(`/api/combat/${session._id}/turn`).send({
      participantId: actor.id,
      actionType: 'dodge',
    });

    expect(res.status).toBe(200);
  });

  it('returns 400 when participantId is missing', async () => {
    const { session } = await createCombatSession();
    const res = await request(app).post(`/api/combat/${session._id}/turn`).send({
      actionType: 'attack',
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 404 when participant is not in the session', async () => {
    const { session } = await createCombatSession();
    const res = await request(app).post(`/api/combat/${session._id}/turn`).send({
      participantId: 'nonexistent-id',
      actionType: 'attack',
    });
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 when session is not active', async () => {
    const { session } = await createCombatSession();
    await request(app).post(`/api/combat/${session._id}/end`);

    const actor = session.participants.find((p: { type: string }) => p.type === 'character');
    const res = await request(app).post(`/api/combat/${session._id}/turn`).send({
      participantId: actor.id,
      actionType: 'dodge',
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe('POST /api/combat/:id/end', () => {
  it('ends an active combat session', async () => {
    const { session } = await createCombatSession();
    const res = await request(app).post(`/api/combat/${session._id}/end`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('abandoned');
    expect(res.body.result).toBeDefined();
    expect(res.body.result.outcome).toBe('retreat');
  });

  it('returns 404 for a non-existent session', async () => {
    const res = await request(app).post('/api/combat/000000000000000000000001/end');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 when ending an already-ended session', async () => {
    const { session } = await createCombatSession();
    await request(app).post(`/api/combat/${session._id}/end`);
    const res = await request(app).post(`/api/combat/${session._id}/end`);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('increments totalEncounters on the character after retreat', async () => {
    const { session, characterId } = await createCombatSession();
    await request(app).post(`/api/combat/${session._id}/end`);

    const charRes = await request(app).get(`/api/characters/${characterId}`);
    expect(charRes.status).toBe(200);
    expect(charRes.body.combatStats.totalEncounters).toBe(1);
  });
});

describe('combatStats and XP on victory', () => {
  afterEach(() => {
    jest.spyOn(Math, 'random').mockRestore();
  });

  it('awards encounter XP and increments wins on victory', async () => {
    // Mock random to ensure attacks always hit (roll 20) and deal max damage (8)
    jest.spyOn(Math, 'random').mockReturnValue(0.99);

    const { session, characterId } = await createCombatSession();
    const actor = session.participants.find((p: { type: string }) => p.type === 'character');
    const enemies = session.participants.filter((p: { type: string }) => p.type === 'enemy');

    // Each enemy has 10 HP; each attack deals 8 damage → need 2 hits per enemy
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let finalRes: any;
    for (const enemy of enemies) {
      for (let hit = 0; hit < 2; hit++) {
        finalRes = await request(app).post(`/api/combat/${session._id}/turn`).send({
          participantId: actor.id,
          actionType: 'attack',
          targetId: enemy.id,
        });
      }
    }

    expect(finalRes.status).toBe(200);
    expect(finalRes.body.status).toBe('completed');
    expect((finalRes.body.result as { outcome: string }).outcome).toBe('victory');
    // The test encounter has rewards.xp = 150
    expect((finalRes.body.result as { xpAwarded: number }).xpAwarded).toBe(150);

    const charRes = await request(app).get(`/api/characters/${characterId}`);
    expect(charRes.status).toBe(200);
    expect(charRes.body.combatStats.totalEncounters).toBe(1);
    expect(charRes.body.combatStats.wins).toBe(1);
    // XP should be awarded to the surviving character
    expect(charRes.body.experiencePoints).toBe(150);
    // damageDone: 6 attacks × 8 damage = 48; kills: 3 enemies
    expect(charRes.body.combatStats.damageDone).toBe(48);
    expect(charRes.body.combatStats.kills).toBe(3);
  });
});

describe('character HP persistence after combat', () => {
  afterEach(() => {
    jest.spyOn(Math, 'random').mockRestore();
  });

  it('updates character hitPoints.current in DB after taking damage and retreating', async () => {
    // Mock random: attackRoll = floor(0.99 * 20) + 1 = 20; damage = floor(0.99 * 8) + 1 = 8
    jest.spyOn(Math, 'random').mockReturnValue(0.99);

    const { session, characterId } = await createCombatSession();
    const actor = session.participants.find((p: { type: string }) => p.type === 'character');
    const enemy = session.participants.find((p: { type: string }) => p.type === 'enemy');

    // Enemy attacks character: roll 20 >= AC 13 → hit; damage 8; character HP 28 → 20
    await request(app).post(`/api/combat/${session._id}/turn`).send({
      participantId: enemy.id,
      actionType: 'attack',
      targetId: actor.id,
    });

    // End session (retreat) — HP should be persisted
    await request(app).post(`/api/combat/${session._id}/end`);

    const charRes = await request(app).get(`/api/characters/${characterId}`);
    expect(charRes.status).toBe(200);
    expect(charRes.body.hitPoints.current).toBe(20);
    expect(charRes.body.combatStats.damageReceived).toBe(8);
  });
});

describe('per-turn combatStats tracking', () => {
  afterEach(() => {
    jest.spyOn(Math, 'random').mockRestore();
  });

  it('increments damageDone for a character attacker on a hit', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.99);

    const { session, characterId } = await createCombatSession();
    const actor = session.participants.find((p: { type: string }) => p.type === 'character');
    const enemy = session.participants.find((p: { type: string }) => p.type === 'enemy');

    await request(app).post(`/api/combat/${session._id}/turn`).send({
      participantId: actor.id,
      actionType: 'attack',
      targetId: enemy.id,
    });

    const charRes = await request(app).get(`/api/characters/${characterId}`);
    expect(charRes.status).toBe(200);
    expect(charRes.body.combatStats.damageDone).toBe(8);
  });

  it('increments healingDone for a character after a heal action', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.99);

    const { session, characterId } = await createCombatSession();
    const actor = session.participants.find((p: { type: string }) => p.type === 'character');

    // healAmount = floor(0.99 * 8) + 1 = 8
    await request(app).post(`/api/combat/${session._id}/turn`).send({
      participantId: actor.id,
      actionType: 'heal',
    });

    const charRes = await request(app).get(`/api/characters/${characterId}`);
    expect(charRes.status).toBe(200);
    expect(charRes.body.combatStats.healingDone).toBe(8);
  });
});
