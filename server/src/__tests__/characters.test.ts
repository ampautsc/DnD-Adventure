import request from 'supertest';
import app from '../index';
import { connectTestDB, closeTestDB, clearTestDB } from './helpers';

const validCharacterBody = {
  name: 'Thalindra',
  level: 1,
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
  hitPoints: { max: 12, current: 12 },
  armorClass: 11,
  speed: 30,
  passivePerception: 11,
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

describe('GET /api/characters', () => {
  it('returns an empty array when there are no characters', async () => {
    const res = await request(app).get('/api/characters');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('returns characters after creation', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);
    const res = await request(app).get('/api/characters');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Thalindra');
  });

  it('filters by class', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);
    await request(app).post('/api/characters').send({ ...validCharacterBody, name: 'Elara', characterClass: 'Wizard' });

    const res = await request(app).get('/api/characters?class=Fighter');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].characterClass).toBe('Fighter');
  });

  it('filters by species', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);
    await request(app).post('/api/characters').send({ ...validCharacterBody, name: 'Elara', species: 'High Elf' });

    const res = await request(app).get('/api/characters?species=Human');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].species).toBe('Human');
  });

  it('filters by level', async () => {
    await request(app).post('/api/characters').send(validCharacterBody);
    await request(app).post('/api/characters').send({ ...validCharacterBody, name: 'Elara', level: 5 });

    const res = await request(app).get('/api/characters?level=5');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].level).toBe(5);
  });
});

describe('POST /api/characters', () => {
  it('creates a character with valid data', async () => {
    const res = await request(app).post('/api/characters').send(validCharacterBody);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Thalindra');
    expect(res.body._id).toBeDefined();
    expect(res.body.createdAt).toBeDefined();
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/characters').send({ name: 'Incomplete' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('stores default combatStats on creation', async () => {
    const res = await request(app).post('/api/characters').send(validCharacterBody);
    expect(res.status).toBe(201);
    expect(res.body.combatStats).toBeDefined();
    expect(res.body.combatStats.totalEncounters).toBe(0);
    expect(res.body.combatStats.wins).toBe(0);
  });
});

describe('GET /api/characters/:id', () => {
  it('returns a single character by id', async () => {
    const created = await request(app).post('/api/characters').send(validCharacterBody);
    const id = created.body._id;

    const res = await request(app).get(`/api/characters/${id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
    expect(res.body.name).toBe('Thalindra');
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).get('/api/characters/000000000000000000000001');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /api/characters/:id/stats', () => {
  it('returns combat performance stats for a character', async () => {
    const created = await request(app).post('/api/characters').send(validCharacterBody);
    const id = created.body._id;

    const res = await request(app).get(`/api/characters/${id}/stats`);
    expect(res.status).toBe(200);
    expect(res.body.characterId).toBeDefined();
    expect(res.body.name).toBe('Thalindra');
    expect(res.body.combatStats).toBeDefined();
    expect(res.body.derived).toBeDefined();
    expect(res.body.derived.winRate).toBe(0);
    expect(res.body.derived.avgDamagePerEncounter).toBe(0);
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).get('/api/characters/000000000000000000000001/stats');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('PUT /api/characters/:id', () => {
  it('updates a character field', async () => {
    const created = await request(app).post('/api/characters').send(validCharacterBody);
    const id = created.body._id;

    const res = await request(app).put(`/api/characters/${id}`).send({ level: 3 });
    expect(res.status).toBe(200);
    expect(res.body.level).toBe(3);
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).put('/api/characters/000000000000000000000001').send({ level: 3 });
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('DELETE /api/characters/:id', () => {
  it('deletes a character', async () => {
    const created = await request(app).post('/api/characters').send(validCharacterBody);
    const id = created.body._id;

    const deleteRes = await request(app).delete(`/api/characters/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.id).toBe(id);

    const getRes = await request(app).get(`/api/characters/${id}`);
    expect(getRes.status).toBe(404);
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).delete('/api/characters/000000000000000000000001');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});
