import { Router, Request, Response } from 'express';
import { Encounter } from '../models/Encounter';
import { encounterLibrary } from '../data/encounterLibrary';

const router = Router();

// GET / - list all encounters with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = {};
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.minLevel) filter.minLevel = { $lte: Number(req.query.minLevel) };
    if (req.query.maxLevel) filter.maxLevel = { $gte: Number(req.query.maxLevel) };

    const encounters = await Encounter.find(filter).sort({ createdAt: -1 });
    res.json(encounters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve encounters', details: (err as Error).message });
  }
});

// GET /library - get all library encounters (static data + DB library encounters)
router.get('/library', async (req: Request, res: Response) => {
  try {
    const dbLibraryEncounters = await Encounter.find({ isLibraryEncounter: true });
    res.json({ static: encounterLibrary, database: dbLibraryEncounters });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve library encounters', details: (err as Error).message });
  }
});

// POST / - create a new encounter
router.post('/', async (req: Request, res: Response) => {
  try {
    const encounter = new Encounter(req.body);
    await encounter.save();
    res.status(201).json(encounter);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create encounter', details: (err as Error).message });
  }
});

// GET /:id - get single encounter
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const encounter = await Encounter.findById(req.params.id);
    if (!encounter) {
      res.status(404).json({ error: 'Encounter not found' });
      return;
    }
    res.json(encounter);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve encounter', details: (err as Error).message });
  }
});

// PUT /:id - update encounter
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const encounter = await Encounter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!encounter) {
      res.status(404).json({ error: 'Encounter not found' });
      return;
    }
    res.json(encounter);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update encounter', details: (err as Error).message });
  }
});

// DELETE /:id - delete encounter
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const encounter = await Encounter.findByIdAndDelete(req.params.id);
    if (!encounter) {
      res.status(404).json({ error: 'Encounter not found' });
      return;
    }
    res.json({ message: 'Encounter deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete encounter', details: (err as Error).message });
  }
});

export default router;
