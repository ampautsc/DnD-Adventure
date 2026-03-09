import request from 'supertest';
import app from '../index';
import { connectTestDB, closeTestDB, clearTestDB } from './helpers';

const validCharacterBody = {
  name: 'Daria',
  level: 5,
  species: 'High Elf',
  characterClass: 'Wizard',
  background: 'Acolyte',
  abilityScores: {
    strength: 8,
    dexterity: 14,
    constitution: 12,
    intelligence: 18,
    wisdom: 13,
    charisma: 10,
  },
  hitPoints: { max: 32, current: 32 },
  armorClass: 12,
  speed: 30,
  passivePerception: 11,
  combatStats: {
    totalEncounters: 4,
    wins: 3,
    losses: 1,
    kills: 6,
    damageDone: 180,
    damageReceived: 90,
    healingDone: 0,
    knockedOut: 1,
  },
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

describe('GET /api/dashboard/characters', () => {
  it('returns an empty array when there are no characters', async () => {
    const res = await request(app).get('/api/dashboard/characters');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('returns character KPI stats for existing characters', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);

    const res = await request(app).get('/api/dashboard/characters');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    const charStats = res.body[0];
    expect(charStats).toHaveProperty('id');
    expect(charStats).toHaveProperty('name', 'Daria');
    expect(charStats).toHaveProperty('level', 5);
    expect(charStats).toHaveProperty('species', 'High Elf');
    expect(charStats).toHaveProperty('characterClass', 'Wizard');
    expect(charStats).toHaveProperty('kpis');
    expect(charStats.kpis).toHaveProperty('winRate');
    expect(charStats.kpis).toHaveProperty('survivalRate');
    expect(charStats.kpis).toHaveProperty('avgDamagePerEncounter');
    expect(charStats.kpis).toHaveProperty('avgKillsPerEncounter');
  });

  it('computes correct KPI values', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);

    const res = await request(app).get('/api/dashboard/characters');
    const kpis = res.body[0].kpis;

    // 3 wins out of 4 encounters = 75%
    expect(kpis.winRate).toBe(75);
    // 3 survivals out of 4 encounters = 75%
    expect(kpis.survivalRate).toBe(75);
    // 180 damage / 4 encounters = 45
    expect(kpis.avgDamagePerEncounter).toBe(45);
    // 6 kills / 4 encounters = 1.50
    expect(kpis.avgKillsPerEncounter).toBe(1.5);
  });
});

describe('GET /api/dashboard/overview', () => {
  it('returns overview stats with zero counts when database is empty', async () => {
    const res = await request(app).get('/api/dashboard/overview');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totals');
    expect(res.body).toHaveProperty('combatSummary');
    expect(res.body).toHaveProperty('distributions');

    expect(res.body.totals.characters).toBe(0);
    expect(res.body.totals.encounters).toBe(0);
    expect(res.body.totals.activeCombatSessions).toBe(0);
  });

  it('reflects counts after creating characters and encounters', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);
    await request(app).post('/api/characters').send({ ...validCharacterBody, name: 'Brom', characterClass: 'Fighter' });

    const res = await request(app).get('/api/dashboard/overview');
    expect(res.status).toBe(200);
    expect(res.body.totals.characters).toBe(2);
  });

  it('includes class and level distributions', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);

    const res = await request(app).get('/api/dashboard/overview');
    expect(res.body.distributions.byClass).toBeDefined();
    expect(res.body.distributions.byLevel).toBeDefined();
    expect(res.body.distributions.byClass['Wizard']).toBe(1);
    expect(res.body.distributions.byLevel['5-10']).toBe(1);
  });

  it('aggregates combat summary from character stats', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);

    const res = await request(app).get('/api/dashboard/overview');
    expect(res.body.combatSummary.totalWins).toBe(3);
    expect(res.body.combatSummary.totalKills).toBe(6);
    expect(res.body.combatSummary.totalDamageDone).toBe(180);
  });
});
