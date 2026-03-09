import { Router, Request, Response } from 'express';
import { Character } from '../models/Character';

const router = Router();

// GET / - list all characters with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = {};
    if (req.query.level) filter.level = Number(req.query.level);
    if (req.query.class) filter.characterClass = req.query.class;
    if (req.query.species) filter.species = req.query.species;

    const characters = await Character.find(filter).sort({ createdAt: -1 });
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve characters', details: (err as Error).message });
  }
});

// POST / - create a new character
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, species, characterClass, background, abilityScores } = req.body;
    if (!name || !species || !characterClass || !background || !abilityScores) {
      res.status(400).json({ error: 'Missing required fields: name, species, characterClass, background, abilityScores' });
      return;
    }

    const character = new Character(req.body);
    await character.save();
    res.status(201).json(character);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create character', details: (err as Error).message });
  }
});

// GET /:id/stats - get character combat performance stats (must be before /:id)
router.get('/:id/stats', async (req: Request, res: Response) => {
  try {
    const character = await Character.findById(req.params.id).select('name level characterClass combatStats');
    if (!character) {
      res.status(404).json({ error: 'Character not found' });
      return;
    }

    const stats = character.combatStats;
    const winRate = stats.totalEncounters > 0
      ? Math.round((stats.wins / stats.totalEncounters) * 100)
      : 0;
    const avgDamagePerEncounter = stats.totalEncounters > 0
      ? Math.round(stats.damageDone / stats.totalEncounters)
      : 0;
    const avgKillsPerEncounter = stats.totalEncounters > 0
      ? parseFloat((stats.kills / stats.totalEncounters).toFixed(2))
      : 0;
    const avgHealingPerEncounter = stats.totalEncounters > 0
      ? Math.round(stats.healingDone / stats.totalEncounters)
      : 0;

    res.json({
      characterId: character._id,
      name: character.name,
      level: character.level,
      characterClass: character.characterClass,
      combatStats: stats,
      derived: {
        winRate,
        avgDamagePerEncounter,
        avgKillsPerEncounter,
        avgHealingPerEncounter,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve character stats', details: (err as Error).message });
  }
});

// GET /:id - get single character
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      res.status(404).json({ error: 'Character not found' });
      return;
    }
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve character', details: (err as Error).message });
  }
});

// PUT /:id - update character
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const character = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!character) {
      res.status(404).json({ error: 'Character not found' });
      return;
    }
    res.json(character);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update character', details: (err as Error).message });
  }
});

// DELETE /:id - delete character
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) {
      res.status(404).json({ error: 'Character not found' });
      return;
    }
    res.json({ message: 'Character deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete character', details: (err as Error).message });
  }
});

export default router;
