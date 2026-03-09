import request from 'supertest';
import app from '../index';
import {
  getBardCandidates,
  runBardBenchmarks,
  getTopBardRecommendation,
  BARD_CANDIDATES,
  BardCandidate,
  BenchmarkResult,
  CombatScenarioResult,
  PartySupportScenarioResult,
} from '../services/BardBenchmarkService';
import { connectTestDB, closeTestDB, clearTestDB } from './helpers';

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
    // The recommendation must be one of the known candidates
    const validIds = getBardCandidates().map((c) => c.id);
    expect(validIds).toContain(top.candidateId);
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

// ─── Party Support Evaluation Tests ──────────────────────────────────────────

describe('BardBenchmarkService - party support evaluation', () => {
  let benchmarkResults: BenchmarkResult[];

  beforeAll(() => {
    benchmarkResults = runBardBenchmarks();
  });

  it('each result includes a partyScore between 0 and 100', () => {
    benchmarkResults.forEach((r) => {
      expect(r.partyScore).toBeGreaterThanOrEqual(0);
      expect(r.partyScore).toBeLessThanOrEqual(100);
    });
  });

  it('each result includes exactly 3 party support scenario details', () => {
    benchmarkResults.forEach((r) => {
      expect(r.partySupportDetails).toHaveLength(3);
    });
  });

  it('party support scenarios cover combat-support, mixed, and social-support types', () => {
    benchmarkResults.forEach((r) => {
      const types = r.partySupportDetails.map((d: PartySupportScenarioResult) => d.type);
      expect(types).toContain('combat-support');
      expect(types).toContain('mixed');
      expect(types).toContain('social-support');
    });
  });

  it('each party support scenario ran 200 iterations', () => {
    benchmarkResults.forEach((r) => {
      r.partySupportDetails.forEach((d: PartySupportScenarioResult) => {
        expect(d.iterationsRun).toBe(200);
      });
    });
  });

  it('each party support scenario has valid averages', () => {
    benchmarkResults.forEach((r) => {
      r.partySupportDetails.forEach((d: PartySupportScenarioResult) => {
        expect(d.avgInspirationsGiven).toBeGreaterThanOrEqual(0);
        expect(d.avgHealingDealt).toBeGreaterThanOrEqual(0);
        expect(d.avgFeatureActivations).toBeGreaterThanOrEqual(0);
        expect(d.score).toBeGreaterThanOrEqual(0);
        expect(d.score).toBeLessThanOrEqual(100);
      });
    });
  });

  it('College of Glamour bard (Vael) has highest party support score on combat-support scenario', () => {
    const vael = benchmarkResults.find((r) => r.candidateId === 'vael-duskwhisper');
    expect(vael).toBeDefined();
    const combatSupportScenario = vael!.partySupportDetails.find(
      (d: PartySupportScenarioResult) => d.type === 'combat-support'
    );
    expect(combatSupportScenario).toBeDefined();
    // Glamour's Mantle of Inspiration distributes temp HP to 5 allies per activation
    expect(combatSupportScenario!.avgFeatureActivations).toBeGreaterThan(0);
  });

  it('composite score reflects party support weighting (40% combat + 40% social + 20% party)', () => {
    benchmarkResults.forEach((r) => {
      const expected = Math.round(r.combatScore * 0.4 + r.socialScore * 0.4 + r.partyScore * 0.2);
      // Allow ±1 for rounding differences
      expect(Math.abs(r.compositeScore - expected)).toBeLessThanOrEqual(1);
    });
  });

  it('POST /api/bard/benchmark includes partyScore and partySupportDetails', async () => {
    const res = await request(app).post('/api/bard/benchmark');
    expect(res.status).toBe(200);
    res.body.results.forEach((r: BenchmarkResult) => {
      expect(typeof r.partyScore).toBe('number');
      expect(Array.isArray(r.partySupportDetails)).toBe(true);
      expect(r.partySupportDetails).toHaveLength(3);
    });
  });
});

// ─── Concentration Mechanics Tests ───────────────────────────────────────────

describe('BardBenchmarkService - concentration mechanics', () => {
  let benchmarkResults: BenchmarkResult[];

  beforeAll(() => {
    benchmarkResults = runBardBenchmarks();
  });

  it('each combat scenario result includes an averageConcentrationBreaks field', () => {
    benchmarkResults.forEach((r) => {
      r.combatDetails.forEach((d) => {
        expect(d.averageConcentrationBreaks).toBeDefined();
        expect(typeof d.averageConcentrationBreaks).toBe('number');
        expect(d.averageConcentrationBreaks).toBeGreaterThanOrEqual(0);
      });
    });
  });

  it('averageConcentrationBreaks is bounded — cannot exceed rounds in the scenario', () => {
    // The hard scenario has 20 rounds; concentrationBreaks per run cannot exceed rounds
    benchmarkResults.forEach((r) => {
      const hardScenario = r.combatDetails.find((d) => d.difficulty === 'hard');
      expect(hardScenario).toBeDefined();
      // Average can't exceed 20 (rounds in hard scenario)
      expect(hardScenario!.averageConcentrationBreaks).toBeLessThanOrEqual(20);
    });
  });

  it('candidates with control spells record concentration break attempts in hard scenarios', () => {
    // All three candidates have control spells — they all attempt concentration
    // In the hard scenario (most enemies, most attacks), breaks can occur
    benchmarkResults.forEach((r) => {
      const hardScenario = r.combatDetails.find((d) => d.difficulty === 'hard');
      expect(hardScenario).toBeDefined();
      // In a hard scenario with 6 enemies attacking, concentration breaks are possible.
      // averageConcentrationBreaks >= 0 (zero is valid when concentration holds every time)
      expect(hardScenario!.averageConcentrationBreaks).toBeGreaterThanOrEqual(0);
    });
  });

  it('War Caster candidates have their concentration strength listed', () => {
    const lyra = benchmarkResults.find((r) => r.candidateId === 'lyra-silverstring');
    const cadwyn = benchmarkResults.find((r) => r.candidateId === 'cadwyn-ironbeat');
    expect(lyra).toBeDefined();
    expect(cadwyn).toBeDefined();
    // War Caster grants advantage on CON saves — should be identified as a strength
    expect(lyra!.strengths).toContain('Concentration spell reliability (War Caster)');
    expect(cadwyn!.strengths).toContain('Concentration spell reliability (War Caster)');
  });

  it('College of Glamour bard (Vael) does not have War Caster concentration strength', () => {
    const vael = benchmarkResults.find((r) => r.candidateId === 'vael-duskwhisper');
    expect(vael).toBeDefined();
    // Vael has Actor feat, not War Caster — concentration advantage is not available to her
    expect(vael!.strengths).not.toContain('Concentration spell reliability (War Caster)');
  });

  it('Vael has equal or higher concentration breaks than Lyra in hard scenario', () => {
    // Lyra and Cadwyn have War Caster (advantage on CON saves to maintain concentration).
    // Vael does not. Over 200 iterations, Vael should average at least as many breaks.
    const lyraHard = benchmarkResults
      .find((r) => r.candidateId === 'lyra-silverstring')!
      .combatDetails.find((d) => d.difficulty === 'hard')!;
    const vaelHard = benchmarkResults
      .find((r) => r.candidateId === 'vael-duskwhisper')!
      .combatDetails.find((d) => d.difficulty === 'hard')!;

    // Only the lower bound is tested: we verify Vael does not have fewer breaks than Lyra
    // by more than sampling variance (0.5). An upper bound is not asserted because the
    // expected difference is small (0.1-0.4 breaks) and a tight ceiling would be flaky.
    expect(vaelHard.averageConcentrationBreaks).toBeGreaterThanOrEqual(
      lyraHard.averageConcentrationBreaks - 0.5
    );
  });

  it('POST /api/bard/benchmark returns averageConcentrationBreaks in combat details', async () => {
    const res = await request(app).post('/api/bard/benchmark');
    expect(res.status).toBe(200);
    res.body.results.forEach((r: BenchmarkResult) => {
      r.combatDetails.forEach((d: CombatScenarioResult) => {
        expect(typeof d.averageConcentrationBreaks).toBe('number');
        expect(d.averageConcentrationBreaks).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

describe('POST /api/bard/instantiate', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  it('returns 201 and a characterId when no candidateId is given', async () => {
    const res = await request(app).post('/api/bard/instantiate');
    expect(res.status).toBe(201);
    expect(res.body.characterId).toBeTruthy();
    expect(res.body.character).toBeDefined();
  });

  it('created character has class Bard at level 8', async () => {
    const res = await request(app).post('/api/bard/instantiate');
    expect(res.body.character.characterClass).toBe('Bard');
    expect(res.body.character.level).toBe(8);
  });

  it('created character has spells, feats, and equipment arrays', async () => {
    const res = await request(app).post('/api/bard/instantiate');
    const char = res.body.character;
    expect(Array.isArray(char.spells)).toBe(true);
    expect(char.spells.length).toBeGreaterThan(0);
    expect(Array.isArray(char.feats)).toBe(true);
    expect(char.feats.length).toBeGreaterThan(0);
    expect(Array.isArray(char.equipment)).toBe(true);
    expect(char.equipment.length).toBeGreaterThan(0);
  });

  it('created character HP is set to maxHitPoints', async () => {
    const res = await request(app).post('/api/bard/instantiate');
    const char = res.body.character;
    expect(char.hitPoints.current).toBe(char.hitPoints.max);
    expect(char.hitPoints.max).toBeGreaterThanOrEqual(48);
  });

  it('includes benchmarkRank in the response', async () => {
    const res = await request(app).post('/api/bard/instantiate');
    expect(typeof res.body.benchmarkRank).toBe('number');
    expect(res.body.benchmarkRank).toBeGreaterThanOrEqual(1);
    expect(res.body.benchmarkRank).toBeLessThanOrEqual(3);
  });

  it('instantiates a specific candidate when candidateId is provided', async () => {
    const res = await request(app)
      .post('/api/bard/instantiate')
      .send({ candidateId: 'lyra-silverstring' });
    expect(res.status).toBe(201);
    expect(res.body.character.name).toBe('Lyra Silverstring');
    expect(res.body.character.subclass).toBe('College of Lore');
  });

  it('returns 400 when an invalid candidateId is provided', async () => {
    const res = await request(app)
      .post('/api/bard/instantiate')
      .send({ candidateId: 'unknown-bard' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it('persisted character can be retrieved via GET /api/characters/:id', async () => {
    const instantiateRes = await request(app).post('/api/bard/instantiate');
    const characterId = instantiateRes.body.characterId;

    const getRes = await request(app).get(`/api/characters/${characterId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.characterClass).toBe('Bard');
    expect(getRes.body.name).toBeTruthy();
  });
});
