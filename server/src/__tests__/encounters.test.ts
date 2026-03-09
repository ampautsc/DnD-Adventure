import request from 'supertest';
import app from '../index';
import { connectTestDB, closeTestDB, clearTestDB } from './helpers';

const validEncounterBody = {
  name: 'Goblin Ambush',
  description: 'A pack of goblins attacks from the shadows.',
  difficulty: 'easy',
  type: 'combat',
  minPartySize: 2,
  maxPartySize: 5,
  minLevel: 1,
  maxLevel: 4,
  enemies: [
    { name: 'Goblin', count: 4, cr: '1/4', type: 'humanoid' },
  ],
  environment: 'forest',
  objectives: ['Defeat all goblins'],
  rewards: { xp: 200, gold: 10, items: [] },
  tags: ['ambush', 'forest'],
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

describe('GET /api/encounters', () => {
  it('returns an empty array when there are no encounters', async () => {
    const res = await request(app).get('/api/encounters');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('returns encounters after creation', async () => {
    await request(app).post('/api/encounters').send(validEncounterBody);
    const res = await request(app).get('/api/encounters');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Goblin Ambush');
  });

  it('filters by difficulty', async () => {
    await request(app).post('/api/encounters').send(validEncounterBody);
    await request(app).post('/api/encounters').send({ ...validEncounterBody, name: 'Dragon Lair', difficulty: 'deadly' });

    const res = await request(app).get('/api/encounters?difficulty=deadly');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].difficulty).toBe('deadly');
  });

  it('filters by type', async () => {
    await request(app).post('/api/encounters').send(validEncounterBody);
    await request(app).post('/api/encounters').send({ ...validEncounterBody, name: 'Town Negotiation', type: 'social' });

    const res = await request(app).get('/api/encounters?type=social');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].type).toBe('social');
  });
});

describe('GET /api/encounters/library', () => {
  it('returns both static and database library encounters', async () => {
    const res = await request(app).get('/api/encounters/library');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('static');
    expect(res.body).toHaveProperty('database');
    expect(Array.isArray(res.body.static)).toBe(true);
    expect(Array.isArray(res.body.database)).toBe(true);
  });

  it('includes DB encounters marked as library encounters', async () => {
    await request(app).post('/api/encounters').send({ ...validEncounterBody, isLibraryEncounter: true });

    const res = await request(app).get('/api/encounters/library');
    expect(res.status).toBe(200);
    expect(res.body.database).toHaveLength(1);
  });
});

describe('POST /api/encounters', () => {
  it('creates an encounter with valid data', async () => {
    const res = await request(app).post('/api/encounters').send(validEncounterBody);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Goblin Ambush');
    expect(res.body._id).toBeDefined();
    expect(res.body.enemies).toHaveLength(1);
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/encounters').send({ name: 'Incomplete' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('stores default rewards when not provided', async () => {
    const body = { ...validEncounterBody };
    delete (body as { rewards?: unknown }).rewards;
    const res = await request(app).post('/api/encounters').send(body);
    expect(res.status).toBe(201);
    expect(res.body.rewards).toBeDefined();
    expect(res.body.rewards.xp).toBe(0);
  });
});

describe('GET /api/encounters/:id', () => {
  it('returns a single encounter by id', async () => {
    const created = await request(app).post('/api/encounters').send(validEncounterBody);
    const id = created.body._id;

    const res = await request(app).get(`/api/encounters/${id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(id);
    expect(res.body.name).toBe('Goblin Ambush');
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).get('/api/encounters/000000000000000000000001');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('PUT /api/encounters/:id', () => {
  it('updates an encounter field', async () => {
    const created = await request(app).post('/api/encounters').send(validEncounterBody);
    const id = created.body._id;

    const res = await request(app).put(`/api/encounters/${id}`).send({ difficulty: 'medium' });
    expect(res.status).toBe(200);
    expect(res.body.difficulty).toBe('medium');
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).put('/api/encounters/000000000000000000000001').send({ difficulty: 'medium' });
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('DELETE /api/encounters/:id', () => {
  it('deletes an encounter', async () => {
    const created = await request(app).post('/api/encounters').send(validEncounterBody);
    const id = created.body._id;

    const deleteRes = await request(app).delete(`/api/encounters/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.id).toBe(id);

    const getRes = await request(app).get(`/api/encounters/${id}`);
    expect(getRes.status).toBe(404);
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).delete('/api/encounters/000000000000000000000001');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});
