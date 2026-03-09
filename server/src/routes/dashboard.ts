import { Router, Request, Response } from 'express';
import { Character } from '../models/Character';
import { Encounter } from '../models/Encounter';
import { CombatSession } from '../models/CombatSession';

const router = Router();

// GET /characters - all characters with KPI stats
router.get('/characters', async (_req: Request, res: Response) => {
  try {
    const characters = await Character.find().sort({ createdAt: -1 });

    const characterStats = characters.map((char) => {
      const stats = char.combatStats;
      const winRate = stats.totalEncounters > 0
        ? Math.round((stats.wins / stats.totalEncounters) * 100)
        : 0;
      const avgDamagePerEncounter = stats.totalEncounters > 0
        ? Math.round(stats.damageDone / stats.totalEncounters)
        : 0;
      const avgKillsPerEncounter = stats.totalEncounters > 0
        ? parseFloat((stats.kills / stats.totalEncounters).toFixed(2))
        : 0;
      const survivalRate = stats.totalEncounters > 0
        ? Math.round(((stats.totalEncounters - stats.losses) / stats.totalEncounters) * 100)
        : 100;

      return {
        id: char._id,
        name: char.name,
        level: char.level,
        species: char.species,
        characterClass: char.characterClass,
        background: char.background,
        hitPoints: char.hitPoints,
        armorClass: char.armorClass,
        combatStats: stats,
        kpis: {
          winRate,
          survivalRate,
          avgDamagePerEncounter,
          avgKillsPerEncounter,
          killDeathRatio: stats.losses > 0
            ? parseFloat((stats.kills / stats.losses).toFixed(2))
            : stats.kills,
          damageEfficiency: stats.damageDone > 0 && stats.damageReceived > 0
            ? parseFloat((stats.damageDone / stats.damageReceived).toFixed(2))
            : null,
        },
      };
    });

    res.json(characterStats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve character stats', details: (err as Error).message });
  }
});

// GET /overview - overall application stats
router.get('/overview', async (_req: Request, res: Response) => {
  try {
    const [
      totalCharacters,
      totalEncounters,
      activeSessions,
      completedSessions,
      abandonedSessions,
    ] = await Promise.all([
      Character.countDocuments(),
      Encounter.countDocuments(),
      CombatSession.countDocuments({ status: 'active' }),
      CombatSession.countDocuments({ status: 'completed' }),
      CombatSession.countDocuments({ status: 'abandoned' }),
    ]);

    // Aggregate combat stats across all characters
    const allCharacters = await Character.find().select('combatStats level characterClass');
    const aggregated = allCharacters.reduce(
      (acc, char) => {
        const s = char.combatStats;
        acc.totalWins += s.wins;
        acc.totalLosses += s.losses;
        acc.totalKills += s.kills;
        acc.totalDamageDone += s.damageDone;
        acc.totalDamageReceived += s.damageReceived;
        acc.totalHealingDone += s.healingDone;
        acc.totalKnockedOut += s.knockedOut;
        acc.totalEncountersFought += s.totalEncounters;
        return acc;
      },
      {
        totalWins: 0,
        totalLosses: 0,
        totalKills: 0,
        totalDamageDone: 0,
        totalDamageReceived: 0,
        totalHealingDone: 0,
        totalKnockedOut: 0,
        totalEncountersFought: 0,
      }
    );

    // Class distribution
    const classDistribution: Record<string, number> = {};
    allCharacters.forEach((char) => {
      classDistribution[char.characterClass] = (classDistribution[char.characterClass] ?? 0) + 1;
    });

    // Level distribution
    const levelBuckets: Record<string, number> = { '1-4': 0, '5-10': 0, '11-16': 0, '17-20': 0 };
    allCharacters.forEach((char) => {
      if (char.level <= 4) levelBuckets['1-4']++;
      else if (char.level <= 10) levelBuckets['5-10']++;
      else if (char.level <= 16) levelBuckets['11-16']++;
      else levelBuckets['17-20']++;
    });

    res.json({
      totals: {
        characters: totalCharacters,
        encounters: totalEncounters,
        activeCombatSessions: activeSessions,
        completedCombatSessions: completedSessions,
        abandonedCombatSessions: abandonedSessions,
        totalCombatSessions: activeSessions + completedSessions + abandonedSessions,
      },
      combatSummary: aggregated,
      distributions: {
        byClass: classDistribution,
        byLevel: levelBuckets,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve overview stats', details: (err as Error).message });
  }
});

export default router;
