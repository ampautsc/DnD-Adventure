import request from 'supertest';
import app from '../index';
import {
  getBardCandidates,
  runBardBenchmarks,
  getTopBardRecommendation,
  BARD_CANDIDATES,
  BardCandidate,
  BenchmarkResult,
} from '../services/BardBenchmarkService';

// ─── Bard Candidate Data Tests ────────────────────────────────────────────────

describe('BardBenchmarkService - candidate definitions', () => {
  it('returns exactly 3 candidates', () => {
    const candidates = getBardCandidates();
    expect(candidates).toHaveLength(3);
  });

  it('all candidates are Level 8 bards', () => {
    const candidates = getBardCandidates();
    candidates.forEach((c) => {
      // Level 8 proficiency bonus is 3
      expect(c.proficiencyBonus).toBe(3);
      // Level 8 bard should have meaningful HP
      expect(c.maxHitPoints).toBeGreaterThanOrEqual(48);
    });
  });

  it('each candidate has required character fields', () => {
    const candidates = getBardCandidates();
    candidates.forEach((c: BardCandidate) => {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.species).toBeTruthy();
      expect(c.subspecies).toBeTruthy();
      expect(c.subclass).toBeTruthy();
      expect(c.background).toBeTruthy();
      expect(c.abilityScores).toBeDefined();
      expect(c.armorClass).toBeGreaterThanOrEqual(10);
      expect(c.speed).toBe(30);
      expect(c.savingThrows).toContain('Dexterity');
      expect(c.savingThrows).toContain('Charisma');
    });
  });

  it('each candidate has at least 2 feats', () => {
    const candidates = getBardCandidates();
    candidates.forEach((c) => {
      expect(c.feats.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('each candidate has at least 8 known spells', () => {
    const candidates = getBardCandidates();
    candidates.forEach((c) => {
      expect(c.spells.length).toBeGreaterThanOrEqual(8);
    });
  });

  it('each candidate has exactly 2 uncommon magic items', () => {
    const candidates = getBardCandidates();
    candidates.forEach((c) => {
      const magicItems = c.equipment.filter((e) => e.rarity === 'uncommon');
      expect(magicItems.length).toBe(2);
    });
  });

  it('each candidate has Charisma as primary ability (at least 16)', () => {
    const candidates = getBardCandidates();
    candidates.forEach((c) => {
      expect(c.abilityScores.charisma).toBeGreaterThanOrEqual(16);
    });
  });

  it('each candidate has social skill proficiencies', () => {
    const socialSkills = ['Persuasion', 'Deception', 'Performance', 'Intimidation'];
    const candidates = getBardCandidates();
    candidates.forEach((c) => {
      const hasSocialSkill = c.skillProficiencies.some((s) => socialSkills.includes(s));
      expect(hasSocialSkill).toBe(true);
    });
  });

  it('each candidate has at least 2 skill expertises', () => {
    const candidates = getBardCandidates();
    candidates.forEach((c) => {
      expect(c.skillExpertise.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('Lyra Silverstring is Half-Elf College of Lore', () => {
    const lyra = getBardCandidates().find((c) => c.id === 'lyra-silverstring');
    expect(lyra).toBeDefined();
    expect(lyra?.species).toBe('Half-Elf');
    expect(lyra?.subclass).toBe('College of Lore');
    expect(lyra?.abilityScores.charisma).toBe(20);
  });

  it('Cadwyn Ironbeat is Variant Human College of Valor', () => {
    const cadwyn = getBardCandidates().find((c) => c.id === 'cadwyn-ironbeat');
    expect(cadwyn).toBeDefined();
    expect(cadwyn?.species).toBe('Human');
    expect(cadwyn?.subspecies).toBe('Variant Human');
    expect(cadwyn?.subclass).toBe('College of Valor');
  });

  it('Vael Duskwhisper is Tiefling College of Glamour', () => {
    const vael = getBardCandidates().find((c) => c.id === 'vael-duskwhisper');
    expect(vael).toBeDefined();
    expect(vael?.species).toBe('Tiefling');
    expect(vael?.subclass).toBe('College of Glamour');
    expect(vael?.abilityScores.charisma).toBe(20);
  });

  it('candidate IDs are unique', () => {
    const ids = getBardCandidates().map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

// ─── Benchmark Simulation Tests ───────────────────────────────────────────────

describe('BardBenchmarkService - benchmark simulation', () => {
  let benchmarkResults: BenchmarkResult[];

  beforeAll(() => {
    benchmarkResults = runBardBenchmarks();
  });

  it('returns results for all 3 candidates', () => {
    expect(benchmarkResults).toHaveLength(3);
  });

  it('results are ranked 1, 2, 3 with no ties in rank number', () => {
    const ranks = benchmarkResults.map((r) => r.rank);
    expect(ranks).toContain(1);
    expect(ranks).toContain(2);
    expect(ranks).toContain(3);
    expect(new Set(ranks).size).toBe(3);
  });

  it('rank 1 has the highest composite score', () => {
    const sorted = [...benchmarkResults].sort((a, b) => b.compositeScore - a.compositeScore);
    expect(sorted[0].rank).toBe(1);
  });

  it('each result has combat and social scores between 0 and 100', () => {
    benchmarkResults.forEach((r) => {
      expect(r.combatScore).toBeGreaterThanOrEqual(0);
      expect(r.combatScore).toBeLessThanOrEqual(100);
      expect(r.socialScore).toBeGreaterThanOrEqual(0);
      expect(r.socialScore).toBeLessThanOrEqual(100);
      expect(r.compositeScore).toBeGreaterThanOrEqual(0);
      expect(r.compositeScore).toBeLessThanOrEqual(100);
    });
  });

  it('each result has 3 combat scenario details', () => {
    benchmarkResults.forEach((r) => {
      expect(r.combatDetails).toHaveLength(3);
    });
  });

  it('each result has 3 social scenario details', () => {
    benchmarkResults.forEach((r) => {
      expect(r.socialDetails).toHaveLength(3);
    });
  });

  it('combat scenarios include easy, medium, and hard', () => {
    benchmarkResults.forEach((r) => {
      const difficulties = r.combatDetails.map((d) => d.difficulty);
      expect(difficulties).toContain('easy');
      expect(difficulties).toContain('medium');
      expect(difficulties).toContain('hard');
    });
  });

  it('social scenarios include Persuasion, Deception, and Performance', () => {
    benchmarkResults.forEach((r) => {
      const skills = r.socialDetails.map((d) => d.skill);
      expect(skills).toContain('Persuasion');
      expect(skills).toContain('Deception');
      expect(skills).toContain('Performance');
    });
  });

  it('each combat scenario ran 200 iterations', () => {
    benchmarkResults.forEach((r) => {
      r.combatDetails.forEach((d) => {
        expect(d.iterationsRun).toBe(200);
        expect(d.wins + d.losses).toBe(200);
      });
    });
  });

  it('each social scenario ran 200 iterations', () => {
    benchmarkResults.forEach((r) => {
      r.socialDetails.forEach((d) => {
        expect(d.iterationsRun).toBe(200);
        expect(d.successes).toBeGreaterThanOrEqual(0);
        expect(d.successes).toBeLessThanOrEqual(200);
      });
    });
  });

  it('each result has strengths and weaknesses arrays', () => {
    benchmarkResults.forEach((r) => {
      expect(Array.isArray(r.strengths)).toBe(true);
      expect(Array.isArray(r.weaknesses)).toBe(true);
    });
  });

  it('each result has a Savras assessment string', () => {
    benchmarkResults.forEach((r) => {
      expect(typeof r.savrasAssessment).toBe('string');
      expect(r.savrasAssessment.length).toBeGreaterThan(10);
    });
  });

  it('College of Valor bard (Cadwyn) has higher combat survival rate on easy scenarios vs. low-AC builds', () => {
    const cadwyn = benchmarkResults.find((r) => r.candidateId === 'cadwyn-ironbeat');
    expect(cadwyn).toBeDefined();
    const easyScenario = cadwyn!.combatDetails.find((d) => d.difficulty === 'easy');
    expect(easyScenario).toBeDefined();
    // Valor bard with breastplate + shield should have decent survival on easy encounters
    expect(easyScenario!.survivalRate).toBeGreaterThan(50);
  });

  it('College of Glamour bard (Vael) has highest average social scores', () => {
    const vael = benchmarkResults.find((r) => r.candidateId === 'vael-duskwhisper');
    expect(vael).toBeDefined();
    // Vael has Expertise in Deception and Persuasion, Actor feat — should excel socially
    const avgSocial = vael!.socialDetails.reduce((s, d) => s + d.successRate, 0) / vael!.socialDetails.length;
    expect(avgSocial).toBeGreaterThan(70);
  });

  it('getTopBardRecommendation returns the rank-1 candidate', () => {
    const top = getTopBardRecommendation();
    expect(top.rank).toBe(1);
    const topFromFull = benchmarkResults.find((r) => r.rank === 1);
    expect(top.candidateId).toBe(topFromFull?.candidateId);
  });
});

// ─── API Route Tests ──────────────────────────────────────────────────────────

describe('GET /api/bard/candidates', () => {
  it('returns 200 with candidate count and array', async () => {
    const res = await request(app).get('/api/bard/candidates');
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(3);
    expect(Array.isArray(res.body.candidates)).toBe(true);
    expect(res.body.candidates).toHaveLength(3);
  });

  it('each candidate in the response has the expected structure', async () => {
    const res = await request(app).get('/api/bard/candidates');
    const { candidates } = res.body;
    candidates.forEach((c: BardCandidate) => {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.species).toBeTruthy();
      expect(c.subclass).toBeTruthy();
      expect(c.abilityScores).toBeDefined();
      expect(c.feats).toBeDefined();
      expect(c.spells).toBeDefined();
      expect(c.equipment).toBeDefined();
    });
  });

  it('returns all three bard builds by id', async () => {
    const res = await request(app).get('/api/bard/candidates');
    const ids = res.body.candidates.map((c: BardCandidate) => c.id);
    expect(ids).toContain('lyra-silverstring');
    expect(ids).toContain('cadwyn-ironbeat');
    expect(ids).toContain('vael-duskwhisper');
  });
});

describe('POST /api/bard/benchmark', () => {
  it('returns 200 with ranked benchmark results', async () => {
    const res = await request(app).post('/api/bard/benchmark');
    expect(res.status).toBe(200);
    expect(res.body.results).toHaveLength(3);
    expect(res.body.benchmarkIterationsPerScenario).toBe(200);
    expect(res.body.combatScenarios).toBe(3);
    expect(res.body.socialScenarios).toBe(3);
  });

  it('results include combat and social scores for all candidates', async () => {
    const res = await request(app).post('/api/bard/benchmark');
    res.body.results.forEach((r: BenchmarkResult) => {
      expect(r.candidateId).toBeTruthy();
      expect(r.combatScore).toBeGreaterThanOrEqual(0);
      expect(r.socialScore).toBeGreaterThanOrEqual(0);
      expect(r.compositeScore).toBeGreaterThanOrEqual(0);
      expect(r.rank).toBeGreaterThanOrEqual(1);
      expect(r.rank).toBeLessThanOrEqual(3);
    });
  });

  it('results are ordered with rank 1 first', async () => {
    const res = await request(app).post('/api/bard/benchmark');
    expect(res.body.results[0].rank).toBe(1);
    expect(res.body.results[2].rank).toBe(3);
  });

  it('results include strengths, weaknesses, and Savras assessment', async () => {
    const res = await request(app).post('/api/bard/benchmark');
    res.body.results.forEach((r: BenchmarkResult) => {
      expect(Array.isArray(r.strengths)).toBe(true);
      expect(Array.isArray(r.weaknesses)).toBe(true);
      expect(typeof r.savrasAssessment).toBe('string');
    });
  });
});

describe('GET /api/bard/recommendation', () => {
  it('returns 200 with a single recommendation', async () => {
    const res = await request(app).get('/api/bard/recommendation');
    expect(res.status).toBe(200);
    expect(res.body.recommendation).toBeDefined();
    expect(res.body.fullStatBlock).toBeDefined();
  });

  it('recommendation has rank 1', async () => {
    const res = await request(app).get('/api/bard/recommendation');
    expect(res.body.recommendation.rank).toBe(1);
  });

  it('fullStatBlock matches the recommendation candidateId', async () => {
    const res = await request(app).get('/api/bard/recommendation');
    expect(res.body.fullStatBlock.id).toBe(res.body.recommendation.candidateId);
  });

  it('fullStatBlock includes species, spells, feats, and equipment', async () => {
    const res = await request(app).get('/api/bard/recommendation');
    const stat = res.body.fullStatBlock;
    expect(stat.species).toBeTruthy();
    expect(Array.isArray(stat.spells)).toBe(true);
    expect(Array.isArray(stat.feats)).toBe(true);
    expect(Array.isArray(stat.equipment)).toBe(true);
  });
});
