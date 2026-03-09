// server/src/services/ReferenceDataService.ts

import { species, getSpecies } from '../data/species';
import { classes, getClass } from '../data/classes';
import { backgrounds, getBackground } from '../data/backgrounds';
import { spells, getSpell, getSpellsByClass, getSpellsByLevel } from '../data/spells';
import { weapons, armors as armor, adventuringGear as gear, getEquipment } from '../data/equipment';
import { feats, getFeat } from '../data/feats';
import { monsters, getMonster, getMonstersByCR, getMonstersForLevel } from '../data/monsters';
import { encounterLibrary, getEncountersByDifficulty, getEncountersForLevel } from '../data/encounterLibrary';

class ReferenceDataService {
  getAllSpecies() { return species; }
  getSpecies(name: string) { return getSpecies(name); }
  getAllClasses() { return classes; }
  getClass(name: string) { return getClass(name); }
  getAllBackgrounds() { return backgrounds; }
  getBackground(name: string) { return getBackground(name); }

  getAllSpells(filters?: { level?: number; school?: string; className?: string }) {
    let result = spells;
    if (filters?.level !== undefined) result = result.filter(s => s.level === filters.level);
    if (filters?.school) result = result.filter(s => s.school.toLowerCase() === filters.school!.toLowerCase());
    if (filters?.className) result = result.filter(s => s.classes.includes(filters.className!));
    return result;
  }

  getSpell(name: string) { return getSpell(name); }
  getSpellsByClass(className: string) { return getSpellsByClass(className); }
  getSpellsByLevel(level: number) { return getSpellsByLevel(level); }
  getAllWeapons() { return weapons; }
  getAllArmor() { return armor; }
  getAllGear() { return gear; }
  getEquipment(name: string) { return getEquipment(name); }
  getAllFeats() { return feats; }
  getFeat(name: string) { return getFeat(name); }

  getAllMonsters(filters?: { cr?: string; type?: string }) {
    let result = monsters;
    if (filters?.cr) result = result.filter(m => m.cr === filters.cr);
    if (filters?.type) result = result.filter(m => m.type.toLowerCase() === filters.type!.toLowerCase());
    return result;
  }

  getMonster(name: string) { return getMonster(name); }
  getMonstersByCR(cr: string) { return getMonstersByCR(cr); }
  getMonstersForLevel(level: number) { return getMonstersForLevel(level); }
  getEncounterLibrary() { return encounterLibrary; }
  getEncountersByDifficulty(difficulty: 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly' | 'boss') { return getEncountersByDifficulty(difficulty); }
  getEncountersForLevel(level: number) { return getEncountersForLevel(level); }
}

export const referenceDataService = new ReferenceDataService();
export default referenceDataService;
