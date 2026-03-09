import { Router, Request, Response } from 'express';
import {
  getBardCandidates,
  runBardBenchmarks,
  getTopBardRecommendation,
  BardCandidate,
  getLoreBardSpeciesPool,
  getLoreBardFeatPool,
  getLoreBardMagicItemPool,
  generateLoreBardBuilds,
  runLoreBardExploration,
} from '../services/BardBenchmarkService';
import { Character } from '../models/Character';

const router = Router();

/**
 * Convert a BardCandidate stat block into a Character document payload.
 * Fills in fields required by the Character schema (weight, value, castingTime, etc.)
 * with sensible D&D 5e bard defaults where the benchmark data doesn't track them.
 */
function bardCandidateToCharacter(candidate: BardCandidate): Record<string, unknown> {
  return {
    name: candidate.name,
    level: 8,
    species: candidate.species,
    subspecies: candidate.subspecies,
    characterClass: 'Bard',
    subclass: candidate.subclass,
    background: candidate.background,
    abilityScores: { ...candidate.abilityScores },
    hitPoints: {
      max: candidate.maxHitPoints,
      current: candidate.maxHitPoints,
    },
    armorClass: candidate.armorClass,
    speed: candidate.speed,
    passivePerception: 10 + Math.floor((candidate.abilityScores.wisdom - 10) / 2) +
      (candidate.skillProficiencies.includes('Perception') ? candidate.proficiencyBonus : 0),
    savingThrows: candidate.savingThrows,
    skills: candidate.skillProficiencies,
    proficiencies: [...candidate.skillProficiencies, ...candidate.savingThrows],
    feats: candidate.feats.map((f) => ({
      name: f.name,
      description: f.description,
      source: candidate.subclass,
    })),
    spells: candidate.spells.map((s) => ({
      name: s.name,
      level: s.level,
      school: s.school,
      castingTime: '1 action',
      range: spellRange(s.type),
      components: s.level === 0 ? 'V' : 'V, S',
      duration: spellDuration(s.type),
      description: `${s.school} ${s.type} spell (level ${s.level}).`,
    })),
    equipment: candidate.equipment.map((e) => ({
      name: e.name,
      type: e.type,
      quantity: 1,
      weight: 0,
      value: 0,
      properties: e.properties,
    })),
    inventory: [],
  };
}

function spellRange(type: string): string {
  const rangeMap: Record<string, string> = {
    support: '60 feet',
    social: '30 feet',
  };
  return rangeMap[type] ?? '60 feet';
}

function spellDuration(type: string): string {
  const durationMap: Record<string, string> = {
    control: 'Concentration, up to 1 minute',
    defense: '1 minute',
  };
  return durationMap[type] ?? 'Instantaneous';
}

/**
 * GET /api/bard/candidates
 *
 * Returns all three Level 8 bard candidates with their full stat blocks:
 * species, subclass, ability scores, feats, spells, equipment, and lore.
 * No simulation is run — this is purely the candidate roster.
 */
router.get('/candidates', (_req: Request, res: Response) => {
  try {
    const candidates = getBardCandidates();
    res.json({
      count: candidates.length,
      candidates,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to retrieve bard candidates',
      details: (err as Error).message,
    });
  }
});

/**
 * POST /api/bard/benchmark
 *
 * Runs all three candidates through standardised combat and social encounter
 * simulations (200 iterations per scenario) and returns ranked results with
 * per-scenario breakdowns, strengths, weaknesses, and Savras's assessment.
 *
 * This endpoint is computationally heavier than the others — it runs ~1,200
 * individual simulations.
 */
router.post('/benchmark', (_req: Request, res: Response) => {
  try {
    const results = runBardBenchmarks();
    res.json({
      benchmarkIterationsPerScenario: 200,
      combatScenarios: 3,
      socialScenarios: 3,
      results,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to run bard benchmarks',
      details: (err as Error).message,
    });
  }
});

/**
 * GET /api/bard/recommendation
 *
 * Runs the full benchmark suite and returns only the top-ranked candidate —
 * the bard Savras has determined is most likely to carry his truth into the world.
 *
 * The recommendation includes the complete stat block for character creation.
 */
router.get('/recommendation', (_req: Request, res: Response) => {
  try {
    const recommendation = getTopBardRecommendation();
    const candidates = getBardCandidates();
    const fullCandidate = candidates.find((c) => c.id === recommendation.candidateId);

    res.json({
      recommendation,
      fullStatBlock: fullCandidate ?? null,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to generate bard recommendation',
      details: (err as Error).message,
    });
  }
});

/**
 * POST /api/bard/instantiate
 *
 * Creates the chosen bard as a persistent Character document in MongoDB.
 *
 * Optional body: { candidateId: string }
 *   - If provided, that specific candidate is instantiated without running the benchmark.
 *   - If omitted, the full benchmark is run and the top-ranked candidate is instantiated.
 *
 * Returns 201 with { characterId, benchmarkRank, character }.
 */
router.post('/instantiate', async (req: Request, res: Response) => {
  try {
    const { candidateId } = req.body as { candidateId?: string };
    const candidates = getBardCandidates();

    let chosenCandidate: BardCandidate | undefined;
    let benchmarkRank = 1;

    if (candidateId) {
      chosenCandidate = candidates.find((c) => c.id === candidateId);
      if (!chosenCandidate) {
        res.status(400).json({
          error: 'Invalid candidateId',
          details: `No bard candidate with id "${candidateId}". Valid ids: ${candidates.map((c) => c.id).join(', ')}`,
        });
        return;
      }
      // Determine rank from the benchmark (informational only — does not affect choice)
      const results = runBardBenchmarks();
      const result = results.find((r) => r.candidateId === candidateId);
      benchmarkRank = result?.rank ?? 0;
    } else {
      const results = runBardBenchmarks();
      const top = results[0];
      benchmarkRank = top.rank;
      chosenCandidate = candidates.find((c) => c.id === top.candidateId)!;
    }

    const characterData = bardCandidateToCharacter(chosenCandidate);
    const character = new Character(characterData);
    await character.save();

    res.status(201).json({
      characterId: character._id,
      benchmarkRank,
      character,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to instantiate bard candidate',
      details: (err as Error).message,
    });
  }
});

/**
 * GET /api/bard/explore/pools
 *
 * Returns the full species, feat, and magic item pools available for the
 * College of Lore bard exploration system, along with counts of the
 * build combinations that will be generated.
 *
 * Use this endpoint to understand the option space before running /explore.
 */
router.get('/explore/pools', (_req: Request, res: Response) => {
  try {
    const speciesPool = getLoreBardSpeciesPool();
    const featPool = getLoreBardFeatPool();
    const itemPool = getLoreBardMagicItemPool();
    const totalBuilds = generateLoreBardBuilds().length;

    res.json({
      subclassFixed: 'College of Lore',
      level: 8,
      totalBuildsInMatrix: totalBuilds,
      pools: {
        species: {
          count: speciesPool.length,
          options: speciesPool.map((s) => ({
            id: s.id,
            species: s.species,
            subspecies: s.subspecies,
            abilityBonuses: s.abilityBonuses,
            speed: s.speed,
            extraFeatSlot: s.extraFeatSlot,
            specialTraits: s.specialTraits,
          })),
        },
        feats: {
          count: featPool.length,
          options: featPool.map((f) => ({
            name: f.name,
            description: f.description,
            abilityBonus: f.abilityBonus ?? null,
          })),
        },
        magicItems: {
          count: itemPool.length,
          options: itemPool.map((i) => ({
            name: i.name,
            type: i.type,
            rarity: i.rarity,
            properties: i.properties,
          })),
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to retrieve exploration pools',
      details: (err as Error).message,
    });
  }
});

/**
 * GET /api/bard/explore
 *
 * Runs the College of Lore bard exploration engine across all generated builds
 * (species × feat combinations × magic item pairs) and returns ranked results.
 *
 * Query parameters:
 *   - top      (number, default 50): How many top builds to include in the ranked list.
 *              Set to 0 to return all builds.
 *   - iterations (number, default 25, max 50): Simulation iterations per scenario.
 *              Higher = more accurate but slower. 25 gives directional results in ~5s;
 *              50 gives good accuracy across the expanded 12-species matrix (~15s).
 *
 * Response includes:
 *   - summary: build count, iterations, fixed subclass
 *   - topBuilds: ranked array of the best N builds
 *   - bySpecies: best build + average score per species
 *   - byFeatCombination: best build + average score per feat combo
 *   - byMagicItems: best build + average score per item pair
 *
 * NOTE: This is a computationally heavy endpoint. Default configuration evaluates
 * hundreds of bards in ~5-10 seconds.
 */
router.get('/explore', (req: Request, res: Response) => {
  try {
    const rawTop = parseInt(String(req.query['top'] ?? '50'), 10);
    const rawIter = parseInt(String(req.query['iterations'] ?? '25'), 10);
    const topN = isNaN(rawTop) || rawTop < 0 ? 50 : rawTop;
    const iterations = isNaN(rawIter) || rawIter < 1 ? 25 : Math.min(rawIter, 50);

    const result = runLoreBardExploration(iterations, topN);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to run bard exploration',
      details: (err as Error).message,
    });
  }
});

export default router;
