import { Router, Request, Response } from 'express';
import {
  getBardCandidates,
  runBardBenchmarks,
  getTopBardRecommendation,
} from '../services/BardBenchmarkService';

const router = Router();

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

export default router;
