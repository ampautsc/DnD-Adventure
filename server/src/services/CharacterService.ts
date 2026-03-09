// server/src/services/CharacterService.ts

import { getClass } from '../data/classes';
import { getSpecies } from '../data/species';
import { getBackground } from '../data/backgrounds';
import { calculateModifier } from './CombatEngine';

export interface CharacterCreationData {
  name: string;
  level: number;
  species: string;
  subspecies?: string;
  characterClass: string;
  subclass?: string;
  background: string;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  selectedSkills?: string[];
}

export interface DerivedStats {
  maxHp: number;
  armorClass: number;
  passivePerception: number;
  speed: number;
  proficiencyBonus: number;
  savingThrows: string[];
  proficiencies: string[];
  finalAbilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
}

export interface CharacterPerformanceStats {
  totalEncounters: number;
  wins: number;
  losses: number;
  kills: number;
  damageDone: number;
  healingDone: number;
  winRate: number;
  averageKillsPerEncounter: number;
}

class CharacterService {
  getProficiencyBonus(level: number): number {
    return Math.floor((level - 1) / 4) + 2;
  }

  calculateMaxHp(hitDie: number, level: number, conModifier: number): number {
    if (level <= 0) return hitDie + conModifier;
    // First level: max hit die + con mod; subsequent levels: average (hitDie/2+1) + con mod
    const firstLevel = hitDie + conModifier;
    const subsequentLevels = (level - 1) * (Math.floor(hitDie / 2) + 1 + conModifier);
    return Math.max(1, firstLevel + subsequentLevels);
  }

  calculateAC(dexModifier: number): number {
    return 10 + dexModifier;
  }

  calculatePassivePerception(wisModifier: number, hasPerceptionProficiency: boolean, profBonus: number): number {
    return 10 + wisModifier + (hasPerceptionProficiency ? profBonus : 0);
  }

  derivedStats(data: CharacterCreationData): DerivedStats {
    const classData = getClass(data.characterClass);
    const speciesData = getSpecies(data.species);
    const backgroundData = getBackground(data.background);

    const proficiencyBonus = this.getProficiencyBonus(data.level);

    // Apply species ability score bonuses
    const bonuses = speciesData?.abilityScoreBonuses ?? {};
    const allBonus = (bonuses as Record<string, number>)['all'] ?? 0;
    const finalScores = {
      strength: data.abilityScores.strength + allBonus + (((bonuses as Record<string, number>)['strength']) ?? 0),
      dexterity: data.abilityScores.dexterity + allBonus + (((bonuses as Record<string, number>)['dexterity']) ?? 0),
      constitution: data.abilityScores.constitution + allBonus + (((bonuses as Record<string, number>)['constitution']) ?? 0),
      intelligence: data.abilityScores.intelligence + allBonus + (((bonuses as Record<string, number>)['intelligence']) ?? 0),
      wisdom: data.abilityScores.wisdom + allBonus + (((bonuses as Record<string, number>)['wisdom']) ?? 0),
      charisma: data.abilityScores.charisma + allBonus + (((bonuses as Record<string, number>)['charisma']) ?? 0),
    };

    const conMod = calculateModifier(finalScores.constitution);
    const dexMod = calculateModifier(finalScores.dexterity);
    const wisMod = calculateModifier(finalScores.wisdom);
    const hitDie = classData?.hitDie ?? 8;

    const maxHp = this.calculateMaxHp(hitDie, data.level, conMod);
    const armorClass = this.calculateAC(dexMod);

    // Collect proficiencies from class + background
    const proficiencies: string[] = [];
    if (classData?.armorProficiencies) proficiencies.push(...classData.armorProficiencies);
    if (classData?.weaponProficiencies) proficiencies.push(...classData.weaponProficiencies);
    if (classData?.skillChoices && data.selectedSkills) { /* selectedSkills handled below */ }
    if (backgroundData?.skillProficiencies) proficiencies.push(...backgroundData.skillProficiencies);
    if (data.selectedSkills) proficiencies.push(...data.selectedSkills);
    const uniqueProficiencies = [...new Set(proficiencies)];

    const hasPerception = uniqueProficiencies.some(p => p.toLowerCase().includes('perception'));
    const passivePerception = this.calculatePassivePerception(wisMod, hasPerception, proficiencyBonus);

    const savingThrows = classData?.savingThrows ?? [];
    const speed = speciesData?.speed ?? 30;

    return {
      maxHp,
      armorClass,
      passivePerception,
      speed,
      proficiencyBonus,
      savingThrows,
      proficiencies: uniqueProficiencies,
      finalAbilityScores: finalScores,
    };
  }

  validateCharacterData(data: CharacterCreationData): string[] {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) errors.push('Name is required');
    if (data.level < 1 || data.level > 20) errors.push('Level must be between 1 and 20');
    if (!getClass(data.characterClass)) errors.push(`Unknown class: ${data.characterClass}`);
    if (!getSpecies(data.species)) errors.push(`Unknown species: ${data.species}`);
    if (!getBackground(data.background)) errors.push(`Unknown background: ${data.background}`);

    const scores = data.abilityScores;
    const scoreNames = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;
    for (const score of scoreNames) {
      const val = scores[score];
      if (val < 1 || val > 30) errors.push(`${score} must be between 1 and 30`);
    }

    return errors;
  }

  getPerformanceStats(combatStats: {
    totalEncounters: number;
    wins: number;
    losses: number;
    kills: number;
    damageDone: number;
    healingDone?: number;
  }): CharacterPerformanceStats {
    const { totalEncounters, wins, losses, kills, damageDone, healingDone = 0 } = combatStats;
    return {
      totalEncounters,
      wins,
      losses,
      kills,
      damageDone,
      healingDone,
      winRate: totalEncounters > 0 ? wins / totalEncounters : 0,
      averageKillsPerEncounter: totalEncounters > 0 ? kills / totalEncounters : 0,
    };
  }
}

export const characterService = new CharacterService();
export default characterService;
