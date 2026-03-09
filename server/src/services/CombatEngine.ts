// server/src/services/CombatEngine.ts

export type DamageType = 
  | 'acid' | 'bludgeoning' | 'cold' | 'fire' | 'force' | 'lightning' 
  | 'necrotic' | 'piercing' | 'poison' | 'psychic' | 'radiant' | 'slashing' | 'thunder';

export type Condition = 
  | 'blinded' | 'charmed' | 'deafened' | 'exhaustion' | 'frightened' 
  | 'grappled' | 'incapacitated' | 'invisible' | 'paralyzed' | 'petrified' 
  | 'poisoned' | 'prone' | 'restrained' | 'stunned' | 'unconscious';

export type ActionType = 'attack' | 'spell' | 'dash' | 'disengage' | 'dodge' | 'help' | 'hide' | 'ready' | 'use_item' | 'heal';

export interface CombatantStats {
  id: string;
  name: string;
  type: 'character' | 'enemy';
  hp: number;
  maxHp: number;
  ac: number;
  speed: number;
  initiative: number;
  initiativeModifier: number;
  
  // Ability scores
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  
  // Combat tracking
  isAlive: boolean;
  isUnconscious: boolean;
  deathSaveSuccesses: number;
  deathSaveFailures: number;
  conditions: Condition[];
  
  // Action economy
  hasAction: boolean;
  hasBonusAction: boolean;
  hasReaction: boolean;
  movementRemaining: number;
  
  // Spell tracking
  spellSlots?: Record<number, number>; // level -> remaining slots
  spellcastingAbility?: string;
  spellcastingModifier?: number;
  spellSaveDC?: number;
  knownSpells?: string[];
  
  // Resistances
  damageResistances: DamageType[];
  damageImmunities: DamageType[];
  damageVulnerabilities: DamageType[];
  
  // Attacks
  attacks: AttackOption[];
  
  // Proficiency bonus
  proficiencyBonus: number;
  
  // AI hint
  role?: 'striker' | 'tank' | 'healer' | 'caster' | 'support' | 'skirmisher';
}

export interface AttackOption {
  name: string;
  attackBonus: number;
  damage: string; // e.g. "1d6+3"
  damageType: DamageType;
  range: number;
  isRanged: boolean;
  isMagical?: boolean;
}

export interface SpellOption {
  name: string;
  level: number;
  school: string;
  damage?: string;
  healAmount?: string;
  saveType?: string;
  saveDC?: number;
  aoeType?: string;
  aoeSize?: number;
  targets: number; // number of targets
  description: string;
}

export interface CombatAction {
  type: ActionType;
  actorId: string;
  targetId?: string;
  attackName?: string;
  spellName?: string;
  roll?: number;
  attackBonus?: number;
  damage?: number;
  damageType?: DamageType;
  description: string;
  result: 'hit' | 'miss' | 'critical' | 'save_success' | 'save_fail' | 'success' | 'fail';
  isBonus?: boolean;
  healing?: number;
}

export interface CombatState {
  sessionId: string;
  encounterId: string;
  round: number;
  turn: number; // index into initiativeOrder
  initiativeOrder: string[]; // combatant IDs in order
  combatants: Map<string, CombatantStats>;
  log: CombatLogEntry[];
  status: 'active' | 'completed';
  result?: 'victory' | 'defeat' | 'retreat';
}

export interface CombatLogEntry {
  round: number;
  turn: number;
  actorId: string;
  actorName: string;
  message: string;
  type: 'action' | 'damage' | 'heal' | 'death' | 'condition' | 'info' | 'deathSave';
  details?: Record<string, unknown>;
}

export interface ValidAction {
  type: ActionType;
  targetId?: string;
  attackName?: string;
  spellName?: string;
  spellLevel?: number;
  isBonus: boolean;
  description: string;
  priority?: number; // AI priority score
}

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

class CombatEngine {
  /**
   * Roll a dice expression like "2d6+3" or "1d20" or "d8"
   */
  rollDice(expression: string): number {
    const match = expression.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
    if (!match) {
      const num = parseInt(expression, 10);
      return isNaN(num) ? 0 : num;
    }
    
    const numDice = parseInt(match[1] || '1', 10);
    const dieSize = parseInt(match[2], 10);
    const modifier = parseInt(match[3] || '0', 10);
    
    let total = 0;
    for (let i = 0; i < numDice; i++) {
      total += Math.floor(Math.random() * dieSize) + 1;
    }
    return total + modifier;
  }

  /**
   * Roll dice and return the individual dice results plus total
   */
  rollDiceDetailed(expression: string): { dice: number[]; modifier: number; total: number } {
    const match = expression.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
    if (!match) {
      const num = parseInt(expression, 10);
      return { dice: [], modifier: num || 0, total: num || 0 };
    }
    
    const numDice = parseInt(match[1] || '1', 10);
    const dieSize = parseInt(match[2], 10);
    const modifier = parseInt(match[3] || '0', 10);
    
    const dice: number[] = [];
    for (let i = 0; i < numDice; i++) {
      dice.push(Math.floor(Math.random() * dieSize) + 1);
    }
    const total = dice.reduce((a, b) => a + b, 0) + modifier;
    return { dice, modifier, total };
  }

  /**
   * Calculate ability modifier from ability score
   */
  calculateModifier(score: number): number {
    return calculateModifier(score);
  }

  /**
   * Roll initiative for all combatants
   */
  rollInitiative(combatants: CombatantStats[]): CombatantStats[] {
    return combatants.map(c => ({
      ...c,
      initiative: this.rollDice('1d20') + (c.initiativeModifier ?? this.calculateModifier(c.dexterity))
    })).sort((a, b) => {
      if (b.initiative !== a.initiative) return b.initiative - a.initiative;
      // Tiebreaker: higher dex modifier goes first
      return this.calculateModifier(b.dexterity) - this.calculateModifier(a.dexterity);
    });
  }

  /**
   * Initialize combat state from encounter and characters
   */
  startCombat(
    sessionId: string,
    encounterId: string,
    combatants: CombatantStats[]
  ): CombatState {
    const ordered = this.rollInitiative([...combatants]);
    const combatantMap = new Map<string, CombatantStats>();
    ordered.forEach(c => combatantMap.set(c.id, c));
    
    const state: CombatState = {
      sessionId,
      encounterId,
      round: 1,
      turn: 0,
      initiativeOrder: ordered.map(c => c.id),
      combatants: combatantMap,
      log: [],
      status: 'active',
    };
    
    this.addLog(state, 'info', 'combat', 'Combat begins!', { round: 1 });
    ordered.forEach(c => {
      this.addLog(state, 'info', c.id, `${c.name} rolls initiative: ${c.initiative}`);
    });
    
    return state;
  }

  /**
   * Add a log entry to the combat state
   */
  private addLog(
    state: CombatState,
    type: CombatLogEntry['type'],
    actorId: string,
    message: string,
    details?: Record<string, unknown>
  ): void {
    const actor = state.combatants.get(actorId);
    state.log.push({
      round: state.round,
      turn: state.turn,
      actorId,
      actorName: actor?.name || actorId,
      message,
      type,
      details,
    });
  }

  /**
   * Get all valid actions for a combatant in the current state
   */
  getValidActions(combatant: CombatantStats, state: CombatState): ValidAction[] {
    const actions: ValidAction[] = [];
    
    if (!combatant.isAlive || combatant.isUnconscious) {
      // Unconscious: only death saving throws
      if (!combatant.isAlive && combatant.hp <= 0) {
        actions.push({
          type: 'ready', // represents death save
          isBonus: false,
          description: 'Make a death saving throw',
          priority: 100,
        });
      }
      return actions;
    }
    
    // Check incapacitated conditions
    const incapacitated = combatant.conditions.some(c => 
      ['incapacitated', 'paralyzed', 'petrified', 'stunned', 'unconscious'].includes(c)
    );
    
    if (incapacitated) return actions;
    
    const enemies = Array.from(state.combatants.values()).filter(
      c => c.type !== combatant.type && c.isAlive
    );
    const allies = Array.from(state.combatants.values()).filter(
      c => c.type === combatant.type && c.isAlive && c.id !== combatant.id
    );
    
    // Attack actions
    if (combatant.hasAction) {
      combatant.attacks.forEach(attack => {
        enemies.forEach(enemy => {
          actions.push({
            type: 'attack',
            targetId: enemy.id,
            attackName: attack.name,
            isBonus: false,
            description: `Attack ${enemy.name} with ${attack.name}`,
            priority: this.calculateAttackPriority(combatant, enemy, attack),
          });
        });
      });
      
      // Dodge action
      actions.push({
        type: 'dodge',
        isBonus: false,
        description: 'Take the Dodge action (attackers have disadvantage)',
        priority: 20,
      });
      
      // Dash action
      actions.push({
        type: 'dash',
        isBonus: false,
        description: 'Take the Dash action (double movement)',
        priority: 5,
      });
      
      // Help action (if allies present)
      if (allies.length > 0) {
        allies.forEach(ally => {
          actions.push({
            type: 'help',
            targetId: ally.id,
            isBonus: false,
            description: `Help ${ally.name} (give advantage on next attack)`,
            priority: 10,
          });
        });
      }
      
      // Heal action (use_item)
      if (combatant.type === 'character') {
        actions.push({
          type: 'use_item',
          targetId: combatant.id,
          isBonus: false,
          description: 'Use a healing potion (2d4+2 healing)',
          priority: combatant.hp < combatant.maxHp * 0.3 ? 60 : 10,
        });
      }
      
      // Spell actions
      if (combatant.spellSlots && combatant.knownSpells) {
        this.getSpellActions(combatant, state, false).forEach(a => actions.push(a));
      }
    }
    
    // Bonus action spells (for healers etc.)
    if (combatant.hasBonusAction && combatant.spellSlots && combatant.knownSpells) {
      this.getSpellActions(combatant, state, true).forEach(a => actions.push(a));
    }
    
    return actions;
  }

  private getSpellActions(combatant: CombatantStats, state: CombatState, bonusOnly: boolean): ValidAction[] {
    const actions: ValidAction[] = [];
    const enemies = Array.from(state.combatants.values()).filter(
      c => c.type !== combatant.type && c.isAlive
    );
    const allies = Array.from(state.combatants.values()).filter(
      c => c.type === combatant.type && c.isAlive
    );
    
    const BONUS_ACTION_SPELLS = ["Healing Word", "Spiritual Weapon", "Misty Step", "Hex", "Hunter's Mark", "Shillelagh", "Thunder Step", "Shadow Blade", "Steady Aim"];
    const BONUS_ACTION_ONLY = new Set(BONUS_ACTION_SPELLS);
    
    if (!combatant.knownSpells) return actions;
    
    combatant.knownSpells.forEach(spellName => {
      const isBonus = BONUS_ACTION_ONLY.has(spellName);
      if (bonusOnly !== isBonus) return;
      
      // Check if we have spell slots
      const spellLevel = this.getSpellLevel(spellName);
      if (spellLevel > 0) {
        const hasSlot = Object.entries(combatant.spellSlots || {}).some(
          ([lvl, slots]) => parseInt(lvl) >= spellLevel && slots > 0
        );
        if (!hasSlot) return;
      }
      
      // Targeting
      if (this.isHealSpell(spellName)) {
        allies.filter(a => a.hp < a.maxHp).forEach(target => {
          actions.push({
            type: 'spell',
            targetId: target.id,
            spellName,
            spellLevel,
            isBonus,
            description: `Cast ${spellName} on ${target.name}`,
            priority: target.hp < target.maxHp * 0.5 ? 70 : 30,
          });
        });
        // Self-heal
        if (combatant.hp < combatant.maxHp) {
          actions.push({
            type: 'spell',
            targetId: combatant.id,
            spellName,
            spellLevel,
            isBonus,
            description: `Cast ${spellName} on self`,
            priority: combatant.hp < combatant.maxHp * 0.3 ? 80 : 20,
          });
        }
      } else if (this.isAoeSpell(spellName)) {
        // AoE spells target the enemy group
        if (enemies.length > 0) {
          actions.push({
            type: 'spell',
            targetId: enemies[0].id, // center on first enemy
            spellName,
            spellLevel,
            isBonus,
            description: `Cast ${spellName} (AoE)`,
            priority: enemies.length > 1 ? 85 : 50,
          });
        }
      } else {
        // Single target offensive spell
        enemies.forEach(enemy => {
          actions.push({
            type: 'spell',
            targetId: enemy.id,
            spellName,
            spellLevel,
            isBonus,
            description: `Cast ${spellName} on ${enemy.name}`,
            priority: this.calculateSpellPriority(spellName, enemy),
          });
        });
      }
    });
    
    return actions;
  }

  private getSpellLevel(spellName: string): number {
    const spellLevels: Record<string, number> = {
      // Cantrips
      'Sacred Flame': 0, 'Fire Bolt': 0, 'Eldritch Blast': 0, 'Toll the Dead': 0,
      'Poison Spray': 0, 'Ray of Frost': 0, 'Shocking Grasp': 0, 'Chill Touch': 0,
      'Vicious Mockery': 0, 'Minor Illusion': 0,
      // Level 1
      'Magic Missile': 1, 'Cure Wounds': 1, 'Healing Word': 1, 'Bless': 1,
      'Inflict Wounds': 1, 'Guiding Bolt': 1, 'Hex': 1, 'Thunderwave': 1,
      'Shield': 1, 'Mage Armor': 1, 'Burning Hands': 1,
      // Level 2
      'Spiritual Weapon': 2, 'Hold Person': 2, 'Scorching Ray': 2, 'Misty Step': 2,
      'Shatter': 2, 'Suggestion': 2, 'Healing Spirit': 2,
      // Level 3
      'Fireball': 3, 'Lightning Bolt': 3, 'Counterspell': 3, 'Animate Dead': 3,
      'Dispel Magic': 3, 'Fear': 3, 'Hypnotic Pattern': 3, 'Fly': 3, 'Haste': 3,
      // Level 4
      'Banishment': 4, 'Dimension Door': 4,
      // Level 5
      'Cone of Cold': 5, 'Divine Word': 5,
      // Level 6
      'Globe of Invulnerability': 6, 'Wall of Force': 6,
      // Level 7
      'Forcecage': 7, 'Power Word Stun': 7, 'Prismatic Spray': 7,
      // Level 9
      'Power Word Kill': 9, 'Wish': 9, 'Meteor Swarm': 9,
      // Level 4/5 duplicates resolved
      'Hold Monster': 5,
    };
    return spellLevels[spellName] ?? 1;
  }

  private isHealSpell(spellName: string): boolean {
    return ['Cure Wounds', 'Healing Word', 'Mass Cure Wounds', 'Healing Spirit', 'Prayer of Healing'].includes(spellName);
  }

  private isAoeSpell(spellName: string): boolean {
    return ['Fireball', 'Lightning Bolt', 'Cone of Cold', 'Thunderwave', 'Shatter', 
            'Hypnotic Pattern', 'Fear', 'Wall of Fire', 'Meteor Swarm', 'Burning Hands'].includes(spellName);
  }

  private calculateAttackPriority(attacker: CombatantStats, target: CombatantStats, attack: AttackOption): number {
    let priority = 50;
    // Prefer targets with low HP
    const hpPercent = target.hp / target.maxHp;
    if (hpPercent < 0.25) priority += 30;
    else if (hpPercent < 0.5) priority += 15;
    // Prefer targets we can hit more easily
    const expectedHit = (21 + attack.attackBonus - target.ac) / 20;
    priority += Math.floor(expectedHit * 20);
    // suppress unused warning
    void attacker;
    return priority;
  }

  private calculateSpellPriority(spellName: string, target: CombatantStats): number {
    let priority = 60;
    const hpPercent = target.hp / target.maxHp;
    if (hpPercent < 0.25) priority += 20;
    // High level spells get priority
    const level = this.getSpellLevel(spellName);
    priority += level * 5;
    return priority;
  }

  /**
   * AI selects the best action for an enemy combatant
   */
  selectAIAction(combatant: CombatantStats, validActions: ValidAction[], state: CombatState): ValidAction | null {
    if (validActions.length === 0) return null;
    
    // Determine role-based priorities
    let roleActions = [...validActions];
    
    // If hp is very low and is a healer, prioritize healing
    if (combatant.role === 'healer' && combatant.hp < combatant.maxHp * 0.4) {
      roleActions = this.prioritizeHealing(roleActions, combatant);
    }
    
    // Casters prefer spell actions
    if (combatant.role === 'caster') {
      roleActions = this.prioritizeCasterActions(roleActions, state);
    }
    
    // Sort by priority (highest first)
    roleActions.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    
    // Return highest priority action (with some randomness for non-critical decisions)
    const topPriority = roleActions[0].priority || 0;
    const topActions = roleActions.filter(a => (a.priority || 0) >= topPriority - 10);
    return topActions[Math.floor(Math.random() * Math.min(topActions.length, 3))];
  }

  private prioritizeHealing(actions: ValidAction[], combatant: CombatantStats): ValidAction[] {
    return actions.map(a => {
      if (a.type === 'spell' && a.targetId === combatant.id && this.isHealSpell(a.spellName || '')) {
        return { ...a, priority: 100 };
      }
      if (a.type === 'use_item' && a.targetId === combatant.id) {
        return { ...a, priority: 90 };
      }
      return a;
    });
  }

  private prioritizeCasterActions(actions: ValidAction[], state: CombatState): ValidAction[] {
    return actions.map(a => {
      if (a.type === 'spell') {
        const level = a.spellLevel || 0;
        const enemies = Array.from(state.combatants.values()).filter(c => c.type !== 'character' && c.isAlive);
        // High priority AoE when multiple enemies
        if (this.isAoeSpell(a.spellName || '') && enemies.length > 2) {
          return { ...a, priority: (a.priority || 50) + 30 };
        }
        // Preserve high level slots
        if (level >= 5) {
          return { ...a, priority: (a.priority || 50) + 20 };
        }
        return { ...a, priority: (a.priority || 50) + 15 };
      }
      return a;
    });
  }

  /**
   * Execute a combat action and return the results
   */
  executeAction(
    action: ValidAction,
    combatant: CombatantStats,
    state: CombatState
  ): CombatAction {
    const target = action.targetId ? state.combatants.get(action.targetId) : undefined;
    
    switch (action.type) {
      case 'attack':
        return this.executeAttack(action, combatant, target, state);
      case 'spell':
        return this.executeSpell(action, combatant, target, state);
      case 'use_item':
        return this.executeUseItem(action, combatant, target, state);
      case 'dodge':
        return this.executeDodge(combatant, state);
      case 'dash':
        return this.executeDash(combatant, state);
      case 'help':
        return this.executeHelp(combatant, target, state);
      case 'ready': // death save
        return this.executeDeathSave(combatant, state);
      default:
        return {
          type: action.type,
          actorId: combatant.id,
          description: action.description,
          result: 'success',
        };
    }
  }

  private executeAttack(
    action: ValidAction,
    combatant: CombatantStats,
    target: CombatantStats | undefined,
    state: CombatState
  ): CombatAction {
    if (!target || !target.isAlive) {
      return {
        type: 'attack',
        actorId: combatant.id,
        targetId: action.targetId,
        description: `${combatant.name} attacks but the target is gone`,
        result: 'miss',
      };
    }
    
    const attack = combatant.attacks.find(a => a.name === action.attackName) || combatant.attacks[0];
    if (!attack) {
      return {
        type: 'attack',
        actorId: combatant.id,
        targetId: target.id,
        description: `${combatant.name} has no valid attack`,
        result: 'miss',
      };
    }
    
    // Check for advantage/disadvantage
    const hasProne = target.conditions.includes('prone');
    const hasAdvantage = hasProne && !attack.isRanged;
    const hasDisadvantage = hasProne && attack.isRanged;
    
    // Roll attack
    const d20Roll1 = Math.floor(Math.random() * 20) + 1;
    const d20Roll2 = hasAdvantage || hasDisadvantage ? Math.floor(Math.random() * 20) + 1 : d20Roll1;
    const d20Roll = hasAdvantage ? Math.max(d20Roll1, d20Roll2) : hasDisadvantage ? Math.min(d20Roll1, d20Roll2) : d20Roll1;
    
    const isCrit = d20Roll === 20;
    const isCritFail = d20Roll === 1;
    const totalAttack = d20Roll + attack.attackBonus;
    
    combatant.hasAction = false; // consume action
    
    if (isCritFail || (!isCrit && totalAttack < target.ac)) {
      this.addLog(state, 'action', combatant.id, 
        `${combatant.name} attacks ${target.name} with ${attack.name} — MISS (rolled ${d20Roll}+${attack.attackBonus}=${totalAttack} vs AC ${target.ac})`
      );
      return {
        type: 'attack',
        actorId: combatant.id,
        targetId: target.id,
        attackName: attack.name,
        roll: totalAttack,
        attackBonus: attack.attackBonus,
        description: `${combatant.name} attacks ${target.name} with ${attack.name}`,
        result: 'miss',
      };
    }
    
    // Hit! Roll damage
    const damageRoll = this.rollDice(attack.damage);
    let damage = isCrit ? damageRoll + this.rollDice(attack.damage) : damageRoll; // crit doubles damage dice
    damage = Math.max(1, this.applyResistanceAndImmunity(damage, attack.damageType, target));
    
    this.applyDamage(target, damage, attack.damageType, state);
    
    const hitType = isCrit ? 'CRITICAL HIT' : 'HIT';
    this.addLog(state, 'damage', combatant.id,
      `${combatant.name} ${hitType}s ${target.name} with ${attack.name} for ${damage} ${attack.damageType} damage! (rolled ${d20Roll}+${attack.attackBonus}=${totalAttack} vs AC ${target.ac})`,
      { damage, damageType: attack.damageType, isCrit }
    );
    
    return {
      type: 'attack',
      actorId: combatant.id,
      targetId: target.id,
      attackName: attack.name,
      roll: totalAttack,
      attackBonus: attack.attackBonus,
      damage,
      damageType: attack.damageType,
      description: `${combatant.name} attacks ${target.name} with ${attack.name}`,
      result: isCrit ? 'critical' : 'hit',
    };
  }

  private executeSpell(
    action: ValidAction,
    combatant: CombatantStats,
    target: CombatantStats | undefined,
    state: CombatState
  ): CombatAction {
    const spellName = action.spellName || '';
    const spellLevel = action.spellLevel || this.getSpellLevel(spellName);
    
    // Consume spell slot
    if (spellLevel > 0 && combatant.spellSlots) {
      const slots = combatant.spellSlots;
      for (let lvl = spellLevel; lvl <= 9; lvl++) {
        if (slots[lvl] && slots[lvl] > 0) {
          slots[lvl]--;
          break;
        }
      }
    }
    
    if (!action.isBonus) combatant.hasAction = false;
    else combatant.hasBonusAction = false;
    
    // Handle heal spells
    if (this.isHealSpell(spellName)) {
      return this.executeHealSpell(spellName, spellLevel, combatant, target, state);
    }
    
    // Handle AoE spells
    if (this.isAoeSpell(spellName)) {
      return this.executeAoeSpell(spellName, spellLevel, combatant, state);
    }
    
    // Single target spells
    return this.executeSingleTargetSpell(spellName, spellLevel, combatant, target, state);
  }

  private executeHealSpell(
    spellName: string,
    spellLevel: number,
    combatant: CombatantStats,
    target: CombatantStats | undefined,
    state: CombatState
  ): CombatAction {
    const healTarget = target || combatant;
    const healMod = combatant.spellcastingModifier || this.calculateModifier(combatant.wisdom);
    
    let healAmount = 0;
    let healFormula = '';
    
    switch (spellName) {
      case 'Cure Wounds':
        healFormula = `${spellLevel}d8+${healMod}`;
        healAmount = this.rollDice(healFormula);
        break;
      case 'Healing Word':
        healFormula = `${spellLevel}d4+${healMod}`;
        healAmount = this.rollDice(healFormula);
        break;
      default:
        healFormula = `1d8+${healMod}`;
        healAmount = this.rollDice(healFormula);
    }
    
    const actualHeal = Math.min(healAmount, healTarget.maxHp - healTarget.hp);
    healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healAmount);
    
    // If unconscious and healed, wake up
    if (healTarget.isUnconscious && healTarget.hp > 0) {
      healTarget.isUnconscious = false;
      healTarget.isAlive = true;
      healTarget.deathSaveSuccesses = 0;
      healTarget.deathSaveFailures = 0;
      const condIdx = healTarget.conditions.indexOf('unconscious');
      if (condIdx !== -1) healTarget.conditions.splice(condIdx, 1);
      this.addLog(state, 'info', combatant.id, `${healTarget.name} regains consciousness!`);
    }
    
    this.addLog(state, 'heal', combatant.id,
      `${combatant.name} casts ${spellName} on ${healTarget.name}, healing ${actualHeal} HP`,
      { healing: actualHeal, formula: healFormula }
    );
    
    return {
      type: 'spell',
      actorId: combatant.id,
      targetId: healTarget.id,
      spellName,
      description: `${combatant.name} casts ${spellName} on ${healTarget.name}`,
      result: 'success',
      healing: actualHeal,
    };
  }

  private executeAoeSpell(
    spellName: string,
    spellLevel: number,
    combatant: CombatantStats,
    state: CombatState
  ): CombatAction {
    const enemies = Array.from(state.combatants.values()).filter(
      c => c.type !== combatant.type && c.isAlive
    );
    
    const saveMod = combatant.spellcastingModifier || this.calculateModifier(combatant.intelligence);
    const saveDC = combatant.spellSaveDC || (8 + combatant.proficiencyBonus + saveMod);
    
    let damageFormula = '3d6';
    let damageType: DamageType = 'fire';
    let saveType = 'dexterity';
    
    switch (spellName) {
      case 'Fireball': damageFormula = `${2 + spellLevel}d6`; damageType = 'fire'; saveType = 'dexterity'; break;
      case 'Lightning Bolt': damageFormula = `${2 + spellLevel}d6`; damageType = 'lightning'; saveType = 'dexterity'; break;
      case 'Cone of Cold': damageFormula = `${5 + (spellLevel - 5)}d8`; damageType = 'cold'; saveType = 'constitution'; break;
      case 'Thunderwave': damageFormula = `${spellLevel}d8`; damageType = 'thunder'; saveType = 'constitution'; break;
      case 'Shatter': damageFormula = `${spellLevel}d8`; damageType = 'thunder'; saveType = 'constitution'; break;
      case 'Burning Hands': damageFormula = `${spellLevel}d6`; damageType = 'fire'; saveType = 'dexterity'; break;
      case 'Meteor Swarm': damageFormula = '20d6'; damageType = 'fire'; saveType = 'dexterity'; break;
    }
    
    let totalDamage = 0;
    const results: string[] = [];
    
    enemies.forEach(enemy => {
      const saveRoll = this.rollDice('1d20') + this.calculateModifier(
        saveType === 'dexterity' ? enemy.dexterity : 
        saveType === 'constitution' ? enemy.constitution : enemy.wisdom
      );
      const baseDamage = this.rollDice(damageFormula);
      const savedDamage = saveRoll >= saveDC ? Math.floor(baseDamage / 2) : baseDamage;
      const finalDamage = this.applyResistanceAndImmunity(savedDamage, damageType, enemy);
      
      this.applyDamage(enemy, finalDamage, damageType, state);
      totalDamage += finalDamage;
      results.push(`${enemy.name}: ${finalDamage} (save ${saveRoll >= saveDC ? 'SUCCESS' : 'FAIL'})`);
    });
    
    this.addLog(state, 'damage', combatant.id,
      `${combatant.name} casts ${spellName}! ${results.join(', ')}`,
      { totalDamage, targets: enemies.length, damageType }
    );
    
    return {
      type: 'spell',
      actorId: combatant.id,
      spellName,
      damage: totalDamage,
      damageType,
      description: `${combatant.name} casts ${spellName} (AoE, ${enemies.length} targets)`,
      result: 'hit',
    };
  }

  private executeSingleTargetSpell(
    spellName: string,
    spellLevel: number,
    combatant: CombatantStats,
    target: CombatantStats | undefined,
    state: CombatState
  ): CombatAction {
    if (!target || !target.isAlive) {
      return {
        type: 'spell',
        actorId: combatant.id,
        spellName,
        description: `${combatant.name} casts ${spellName} but has no valid target`,
        result: 'miss',
      };
    }
    
    const attackMod = combatant.spellcastingModifier || this.calculateModifier(combatant.intelligence);
    const spellAttack = attackMod + combatant.proficiencyBonus;
    const saveDC = combatant.spellSaveDC || (8 + combatant.proficiencyBonus + attackMod);
    
    // Spell attack roll spells
    const spellAttackSpells = ['Guiding Bolt', 'Eldritch Blast', 'Fire Bolt', 'Sacred Flame', 
      'Ray of Frost', 'Inflict Wounds', 'Shocking Grasp', 'Toll the Dead', 'Magic Missile'];
    
    // Save-based spells
    const saveSpells = ['Sacred Flame', 'Hold Person', 'Hold Monster', 'Suggestion', 
      'Banishment', 'Power Word Kill', 'Power Word Stun'];
    
    let damage = 0;
    let damageType: DamageType = 'force';
    let result: CombatAction['result'] = 'hit';
    
    if (spellName === 'Magic Missile') {
      // Auto-hit, 3 darts
      const darts = 3 + (spellLevel > 1 ? spellLevel - 1 : 0);
      damage = 0;
      for (let i = 0; i < darts; i++) damage += this.rollDice('1d4+1');
      damageType = 'force';
      const finalDamage = this.applyResistanceAndImmunity(damage, damageType, target);
      this.applyDamage(target, finalDamage, damageType, state);
      this.addLog(state, 'damage', combatant.id,
        `${combatant.name} casts Magic Missile, striking ${target.name} with ${darts} darts for ${finalDamage} force damage!`
      );
      return { type: 'spell', actorId: combatant.id, targetId: target.id, spellName, damage: finalDamage, damageType, description: `${combatant.name} casts Magic Missile`, result: 'hit' };
    }
    
    // Spell damage formulas
    const spellDamage: Record<string, [string, DamageType]> = {
      'Guiding Bolt': [`${1 + (spellLevel - 1)}d6`, 'radiant'],
      'Eldritch Blast': ['1d10', 'force'],
      'Fire Bolt': [spellLevel <= 4 ? '2d10' : '3d10', 'fire'],
      'Ray of Frost': ['1d8', 'cold'],
      'Shocking Grasp': ['1d8', 'lightning'],
      'Toll the Dead': ['1d8', 'necrotic'],
      'Inflict Wounds': [`${spellLevel}d10`, 'necrotic'],
      'Scorching Ray': ['2d6', 'fire'],
      'Hex': ['1d6', 'necrotic'],
    };
    
    if (spellAttackSpells.includes(spellName)) {
      const d20 = this.rollDice('1d20');
      const isCrit = d20 === 20;
      const total = d20 + spellAttack;
      
      if (d20 === 1 || (!isCrit && total < target.ac)) {
        this.addLog(state, 'action', combatant.id, `${combatant.name} casts ${spellName} on ${target.name} — MISS`);
        return { type: 'spell', actorId: combatant.id, targetId: target.id, spellName, roll: total, description: `${combatant.name} casts ${spellName}`, result: 'miss' };
      }
      
      const [dmgFormula, dmgType] = spellDamage[spellName] || ['1d8', 'force' as DamageType];
      const rawDamage = this.rollDice(dmgFormula);
      damage = isCrit ? rawDamage + this.rollDice(dmgFormula) : rawDamage;
      damageType = dmgType;
      result = isCrit ? 'critical' : 'hit';
    } else if (saveSpells.includes(spellName)) {
      const saveRoll = this.rollDice('1d20') + this.calculateModifier(
        ['Hold Person', 'Hold Monster', 'Suggestion', 'Banishment'].includes(spellName) ? target.wisdom : target.constitution
      );
      
      if (spellName === 'Power Word Kill') {
        if (target.hp <= 100) {
          this.applyDamage(target, target.hp, 'psychic', state);
          this.addLog(state, 'death', combatant.id, `${combatant.name} casts Power Word Kill on ${target.name}!`);
          return { type: 'spell', actorId: combatant.id, targetId: target.id, spellName, description: `${combatant.name} casts Power Word Kill`, result: 'hit' };
        }
      }
      
      if (saveRoll < saveDC) {
        // Failed save - apply condition
        if (['Hold Person', 'Hold Monster'].includes(spellName)) {
          if (!target.conditions.includes('paralyzed')) target.conditions.push('paralyzed');
          this.addLog(state, 'condition', combatant.id, `${target.name} fails their save and is PARALYZED by ${spellName}!`);
        }
        result = 'save_fail';
        damage = 0; // Control spells don't deal damage
      } else {
        result = 'save_success';
      }
    } else {
      // Default: treat as attack spell
      const [dmgFormula, dmgType] = spellDamage[spellName] || ['1d8', 'force' as DamageType];
      damage = this.rollDice(dmgFormula);
      damageType = dmgType;
    }
    
    if (damage > 0) {
      const finalDamage = this.applyResistanceAndImmunity(damage, damageType, target);
      this.applyDamage(target, finalDamage, damageType, state);
      this.addLog(state, 'damage', combatant.id,
        `${combatant.name} casts ${spellName} on ${target.name} for ${finalDamage} ${damageType} damage!`,
        { damage: finalDamage, damageType, result }
      );
      return { type: 'spell', actorId: combatant.id, targetId: target.id, spellName, damage: finalDamage, damageType, description: `${combatant.name} casts ${spellName}`, result };
    }
    
    return { type: 'spell', actorId: combatant.id, targetId: target.id, spellName, description: `${combatant.name} casts ${spellName}`, result };
  }

  private executeUseItem(
    action: ValidAction,
    combatant: CombatantStats,
    target: CombatantStats | undefined,
    state: CombatState
  ): CombatAction {
    const healTarget = target || combatant;
    const healing = this.rollDice('2d4+2');
    const actualHeal = Math.min(healing, healTarget.maxHp - healTarget.hp);
    healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healing);
    combatant.hasAction = false;
    
    this.addLog(state, 'heal', combatant.id,
      `${combatant.name} uses a healing potion, restoring ${actualHeal} HP`,
      { healing: actualHeal }
    );
    
    return {
      type: 'use_item',
      actorId: combatant.id,
      targetId: healTarget.id,
      healing: actualHeal,
      description: `${combatant.name} uses a healing potion`,
      result: 'success',
    };
  }

  private executeDodge(combatant: CombatantStats, state: CombatState): CombatAction {
    combatant.hasAction = false;
    if (!combatant.conditions.includes('restrained')) combatant.conditions.push('restrained'); // use as "dodging" marker
    this.addLog(state, 'action', combatant.id, `${combatant.name} takes the Dodge action`);
    return { type: 'dodge', actorId: combatant.id, description: `${combatant.name} dodges`, result: 'success' };
  }

  private executeDash(combatant: CombatantStats, state: CombatState): CombatAction {
    combatant.hasAction = false;
    combatant.movementRemaining += combatant.speed;
    this.addLog(state, 'action', combatant.id, `${combatant.name} dashes (doubled movement)`);
    return { type: 'dash', actorId: combatant.id, description: `${combatant.name} dashes`, result: 'success' };
  }

  private executeHelp(combatant: CombatantStats, target: CombatantStats | undefined, state: CombatState): CombatAction {
    combatant.hasAction = false;
    this.addLog(state, 'action', combatant.id, `${combatant.name} helps ${target?.name || 'an ally'} (advantage on next attack)`);
    return { type: 'help', actorId: combatant.id, targetId: target?.id, description: `${combatant.name} helps`, result: 'success' };
  }

  private executeDeathSave(combatant: CombatantStats, state: CombatState): CombatAction {
    const roll = this.rollDice('1d20');
    
    if (roll === 20) {
      // Natural 20: regain 1 HP
      combatant.hp = 1;
      combatant.isUnconscious = false;
      combatant.isAlive = true;
      combatant.deathSaveSuccesses = 0;
      combatant.deathSaveFailures = 0;
      combatant.conditions = combatant.conditions.filter(c => c !== 'unconscious');
      this.addLog(state, 'info', combatant.id, `${combatant.name} rolls a natural 20 on death save and regains 1 HP!`);
      return { type: 'ready', actorId: combatant.id, roll, description: `${combatant.name} makes a death saving throw`, result: 'critical' };
    }
    
    if (roll === 1) {
      // Natural 1: two failures
      combatant.deathSaveFailures = Math.min(3, combatant.deathSaveFailures + 2);
    } else if (roll >= 10) {
      combatant.deathSaveSuccesses++;
    } else {
      combatant.deathSaveFailures++;
    }
    
    this.addLog(state, 'deathSave', combatant.id,
      `${combatant.name} makes a death saving throw: ${roll} (${roll >= 10 ? 'SUCCESS' : 'FAILURE'}) — ${combatant.deathSaveSuccesses}/3 successes, ${combatant.deathSaveFailures}/3 failures`,
      { roll, successes: combatant.deathSaveSuccesses, failures: combatant.deathSaveFailures }
    );
    
    if (combatant.deathSaveSuccesses >= 3) {
      combatant.isUnconscious = false; // Stabilized
      combatant.deathSaveSuccesses = 0;
      combatant.deathSaveFailures = 0;
      this.addLog(state, 'info', combatant.id, `${combatant.name} is now stable!`);
    } else if (combatant.deathSaveFailures >= 3) {
      combatant.isAlive = false;
      combatant.isUnconscious = true;
      this.addLog(state, 'death', combatant.id, `${combatant.name} has died!`);
    }
    
    return {
      type: 'ready',
      actorId: combatant.id,
      roll,
      description: `${combatant.name} makes a death saving throw`,
      result: roll >= 10 ? 'success' : 'fail',
    };
  }

  /**
   * Apply resistance/immunity to damage calculation
   */
  applyResistanceAndImmunity(damage: number, type: DamageType, target: CombatantStats): number {
    if (target.damageImmunities.includes(type)) return 0;
    if (target.damageResistances.includes(type)) return Math.floor(damage / 2);
    if (target.damageVulnerabilities.includes(type)) return damage * 2;
    return damage;
  }

  /**
   * Apply damage to a combatant, handling unconscious/death
   */
  applyDamage(target: CombatantStats, damage: number, type: DamageType, state: CombatState): void {
    if (damage <= 0) return;
    
    target.hp = Math.max(0, target.hp - damage);
    
    if (target.hp <= 0) {
      if (target.type === 'enemy') {
        target.isAlive = false;
        target.isUnconscious = true;
        this.addLog(state, 'death', target.id, `${target.name} has been defeated!`);
      } else {
        // Player character: make death saves
        if (!target.isUnconscious) {
          target.isUnconscious = true;
          if (!target.conditions.includes('unconscious')) target.conditions.push('unconscious');
          this.addLog(state, 'death', target.id, `${target.name} falls unconscious and must make death saving throws!`);
          
          // Massive damage: instant death
          if (damage >= target.maxHp) {
            target.isAlive = false;
            this.addLog(state, 'death', target.id, `${target.name} suffers massive damage and dies instantly!`);
          }
        }
      }
    }
  }

  /**
   * Process a full turn for a combatant (used for AI)
   */
  processTurn(combatantId: string, state: CombatState): CombatAction[] {
    const combatant = state.combatants.get(combatantId);
    if (!combatant) return [];
    
    // Reset action economy at start of turn
    combatant.hasAction = true;
    combatant.hasBonusAction = true;
    combatant.hasReaction = true;
    combatant.movementRemaining = combatant.speed;
    // Remove "dodging" condition
    combatant.conditions = combatant.conditions.filter(c => c !== 'restrained');
    
    const actions: CombatAction[] = [];
    
    if (!combatant.isAlive || combatant.isUnconscious) {
      // Death save
      const validActions = this.getValidActions(combatant, state);
      if (validActions.length > 0) {
        const result = this.executeAction(validActions[0], combatant, state);
        actions.push(result);
      }
      return actions;
    }
    
    // Main action
    if (combatant.hasAction) {
      const validActions = this.getValidActions(combatant, state).filter(a => !a.isBonus);
      const chosen = combatant.type === 'enemy' 
        ? this.selectAIAction(combatant, validActions, state)
        : null; // characters are player-controlled
      
      if (chosen) {
        const result = this.executeAction(chosen, combatant, state);
        actions.push(result);
      }
    }
    
    // Bonus action
    if (combatant.hasBonusAction) {
      const bonusActions = this.getValidActions(combatant, state).filter(a => a.isBonus);
      const chosen = combatant.type === 'enemy'
        ? this.selectAIAction(combatant, bonusActions, state)
        : null;
      
      if (chosen) {
        const result = this.executeAction(chosen, combatant, state);
        actions.push(result);
      }
    }
    
    return actions;
  }

  /**
   * Advance to the next turn in initiative order
   */
  nextTurn(state: CombatState): string | null {
    // Skip dead combatants
    let nextTurn = state.turn + 1;
    
    while (nextTurn < state.initiativeOrder.length) {
      const nextId = state.initiativeOrder[nextTurn];
      const next = state.combatants.get(nextId);
      if (next && (next.isAlive || (!next.isAlive && next.isUnconscious && next.hp <= 0 && next.type === 'character'))) {
        state.turn = nextTurn;
        return nextId;
      }
      nextTurn++;
    }
    
    // End of round
    state.round++;
    state.turn = 0;
    this.addLog(state, 'info', 'combat', `--- Round ${state.round} begins ---`);
    
    // Find first alive combatant
    for (let i = 0; i < state.initiativeOrder.length; i++) {
      const id = state.initiativeOrder[i];
      const c = state.combatants.get(id);
      if (c && (c.isAlive || (c.isUnconscious && c.hp <= 0 && c.type === 'character'))) {
        state.turn = i;
        return id;
      }
    }
    
    return null;
  }

  /**
   * Check if combat should end
   */
  checkCombatEnd(state: CombatState): { ended: boolean; result?: 'victory' | 'defeat' } {
    const characters = Array.from(state.combatants.values()).filter(c => c.type === 'character');
    const enemies = Array.from(state.combatants.values()).filter(c => c.type === 'enemy');
    
    const aliveCharacters = characters.filter(c => c.isAlive && !c.isUnconscious);
    const aliveEnemies = enemies.filter(c => c.isAlive);
    
    if (enemies.length > 0 && aliveEnemies.length === 0) {
      state.status = 'completed';
      state.result = 'victory';
      this.addLog(state, 'info', 'combat', '🎉 VICTORY! All enemies have been defeated!');
      return { ended: true, result: 'victory' };
    }
    
    if (characters.length > 0 && aliveCharacters.length === 0) {
      state.status = 'completed';
      state.result = 'defeat';
      this.addLog(state, 'info', 'combat', '💀 DEFEAT! The party has been defeated!');
      return { ended: true, result: 'defeat' };
    }
    
    return { ended: false };
  }

  /**
   * Get the current active combatant
   */
  getCurrentCombatant(state: CombatState): CombatantStats | null {
    const id = state.initiativeOrder[state.turn];
    return state.combatants.get(id) || null;
  }

  /**
   * Get proficiency bonus for a given level
   */
  getProficiencyBonus(level: number): number {
    return Math.floor((level - 1) / 4) + 2;
  }
}

export const combatEngine = new CombatEngine();
export default combatEngine;
