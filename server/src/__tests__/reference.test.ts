import request from 'supertest';
import app from '../index';

// Reference routes serve static data and do not require a database connection.

describe('GET /api/reference/species', () => {
  it('returns a list of species', async () => {
    const res = await request(app).get('/api/reference/species');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
  });
});

describe('GET /api/reference/species/:name', () => {
  it('returns a single species by name', async () => {
    const res = await request(app).get('/api/reference/species/Human');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Human');
  });

  it('returns 404 for an unknown species', async () => {
    const res = await request(app).get('/api/reference/species/Martian');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /api/reference/classes', () => {
  it('returns a list of classes', async () => {
    const res = await request(app).get('/api/reference/classes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('hitDie');
  });
});

describe('GET /api/reference/classes/:name', () => {
  it('returns a single class by name', async () => {
    const res = await request(app).get('/api/reference/classes/Fighter');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Fighter');
  });

  it('returns 404 for an unknown class', async () => {
    const res = await request(app).get('/api/reference/classes/Necromancer');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /api/reference/backgrounds', () => {
  it('returns a list of backgrounds', async () => {
    const res = await request(app).get('/api/reference/backgrounds');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
  });
});

describe('GET /api/reference/backgrounds/:name', () => {
  it('returns a single background by name', async () => {
    const res = await request(app).get('/api/reference/backgrounds/Acolyte');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Acolyte');
  });

  it('returns 404 for an unknown background', async () => {
    const res = await request(app).get('/api/reference/backgrounds/Astronaut');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /api/reference/spells', () => {
  it('returns a list of spells', async () => {
    const res = await request(app).get('/api/reference/spells');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('level');
  });

  it('filters spells by level', async () => {
    const res = await request(app).get('/api/reference/spells?level=1');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((spell: { level: number }) => {
      expect(spell.level).toBe(1);
    });
  });

  it('filters spells by school', async () => {
    const res = await request(app).get('/api/reference/spells?school=evocation');
    expect(res.status).toBe(200);
    res.body.forEach((spell: { school: string }) => {
      expect(spell.school.toLowerCase()).toBe('evocation');
    });
  });
});

describe('GET /api/reference/spells/:name', () => {
  it('returns 404 for an unknown spell', async () => {
    const res = await request(app).get('/api/reference/spells/Vaporize');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('GET /api/reference/equipment', () => {
  it('returns a list of equipment', async () => {
    const res = await request(app).get('/api/reference/equipment');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
  });
});

describe('GET /api/reference/feats', () => {
  it('returns a list of feats', async () => {
    const res = await request(app).get('/api/reference/feats');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
  });
});

describe('GET /api/reference/monsters', () => {
  it('returns a list of monsters', async () => {
    const res = await request(app).get('/api/reference/monsters');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('filters monsters by CR', async () => {
    const res = await request(app).get('/api/reference/monsters?cr=1/4');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((m: { cr: string }) => {
      expect(m.cr).toBe('1/4');
    });
  });

  it('filters monsters by type', async () => {
    const res = await request(app).get('/api/reference/monsters?type=undead');
    expect(res.status).toBe(200);
    res.body.forEach((m: { type: string }) => {
      expect(m.type.toLowerCase()).toBe('undead');
    });
  });
});

describe('GET /api/reference/monsters/:name', () => {
  it('returns 404 for an unknown monster', async () => {
    const res = await request(app).get('/api/reference/monsters/Tarrasque');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});
