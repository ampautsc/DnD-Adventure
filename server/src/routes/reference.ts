import { Router, Request, Response } from 'express';
import { species, getSpecies } from '../data/species';
import { classes, getClass } from '../data/classes';
import { backgrounds, getBackground } from '../data/backgrounds';
import { spells, getSpell, getSpellsByClass, getSpellsByLevel } from '../data/spells';
import { equipment, getEquipment } from '../data/equipment';
import { feats, getFeat } from '../data/feats';
import { monsters, getMonster, getMonstersByCR } from '../data/monsters';

const router = Router();

// --- Species ---
router.get('/species', (_req: Request, res: Response) => {
  res.json(species);
});

router.get('/species/:name', (req: Request, res: Response) => {
  const item = getSpecies(req.params.name);
  if (!item) {
    res.status(404).json({ error: `Species '${req.params.name}' not found` });
    return;
  }
  res.json(item);
});

// --- Classes ---
router.get('/classes', (_req: Request, res: Response) => {
  res.json(classes);
});

router.get('/classes/:name', (req: Request, res: Response) => {
  const item = getClass(req.params.name);
  if (!item) {
    res.status(404).json({ error: `Class '${req.params.name}' not found` });
    return;
  }
  res.json(item);
});

// --- Backgrounds ---
router.get('/backgrounds', (_req: Request, res: Response) => {
  res.json(backgrounds);
});

router.get('/backgrounds/:name', (req: Request, res: Response) => {
  const item = getBackground(req.params.name);
  if (!item) {
    res.status(404).json({ error: `Background '${req.params.name}' not found` });
    return;
  }
  res.json(item);
});

// --- Spells ---
router.get('/spells', (req: Request, res: Response) => {
  let results = spells;
  if (req.query.level !== undefined) {
    results = getSpellsByLevel(Number(req.query.level));
  }
  if (req.query.class) {
    results = getSpellsByClass(req.query.class as string).filter((s) =>
      results.includes(s)
    );
  }
  if (req.query.school) {
    const school = (req.query.school as string).toLowerCase();
    results = results.filter((s) => s.school.toLowerCase() === school);
  }
  res.json(results);
});

router.get('/spells/:name', (req: Request, res: Response) => {
  const item = getSpell(req.params.name);
  if (!item) {
    res.status(404).json({ error: `Spell '${req.params.name}' not found` });
    return;
  }
  res.json(item);
});

// --- Equipment ---
router.get('/equipment', (req: Request, res: Response) => {
  let results = equipment;
  if (req.query.type) {
    const type = (req.query.type as string).toLowerCase();
    results = results.filter((e) => e.type.toLowerCase() === type);
  }
  if (req.query.category) {
    const category = (req.query.category as string).toLowerCase();
    results = results.filter((e) => e.category.toLowerCase() === category);
  }
  res.json(results);
});

router.get('/equipment/:name', (req: Request, res: Response) => {
  const item = getEquipment(req.params.name);
  if (!item) {
    res.status(404).json({ error: `Equipment '${req.params.name}' not found` });
    return;
  }
  res.json(item);
});

// --- Feats ---
router.get('/feats', (_req: Request, res: Response) => {
  res.json(feats);
});

router.get('/feats/:name', (req: Request, res: Response) => {
  const item = getFeat(req.params.name);
  if (!item) {
    res.status(404).json({ error: `Feat '${req.params.name}' not found` });
    return;
  }
  res.json(item);
});

// --- Monsters ---
router.get('/monsters', (req: Request, res: Response) => {
  let results = monsters;
  if (req.query.cr) {
    results = getMonstersByCR(req.query.cr as string);
  }
  if (req.query.type) {
    const type = (req.query.type as string).toLowerCase();
    results = results.filter((m) => m.type.toLowerCase() === type);
  }
  res.json(results);
});

router.get('/monsters/:name', (req: Request, res: Response) => {
  const item = getMonster(req.params.name);
  if (!item) {
    res.status(404).json({ error: `Monster '${req.params.name}' not found` });
    return;
  }
  res.json(item);
});

export default router;
