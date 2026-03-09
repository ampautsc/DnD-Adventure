/**
 * generate-encounter-logs.ts
 *
 * Savras commands: illuminate the branching paths of fate.
 *
 * This script runs the full College of Lore bard exploration matrix, identifies
 * the top 20 builds by composite score, and generates detailed turn-by-turn
 * encounter logs for each of them.  Every dice roll, AI decision, damage event,
 * saving throw, and outcome is captured so the rankings can be validated with
 * full transparency.
 *
 * Output files:
 *   encounter-logs/README.md                          — summary index
 *   encounter-logs/<rank>-<buildId>.json              — full JSON log per build
 *   encounter-logs/<rank>-<buildId>.md                — human-readable markdown log
 *
 * Usage (from the server/ directory):
 *   npx ts-node src/scripts/generate-encounter-logs.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  runLoreBardExploration,
  generateBuildEncounterLogs,
  BuildEncounterLogs,
  CombatEncounterLog,
  SocialEncounterLog,
  PartySupportEncounterLog,
  CombatRoundLog,
  PartySupportRoundLog,
} from '../services/BardBenchmarkService';

const TOP_N = 20;
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'encounter-logs');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function safeName(buildId: string): string {
  // Trim to 80 chars to avoid filename issues
  return buildId.replace(/[^a-zA-Z0-9_\-+]/g, '-').slice(0, 80);
}

// ─── Markdown Renderer ────────────────────────────────────────────────────────

function renderCombatLogMd(cl: CombatEncounterLog): string {
  const lines: string[] = [];
  lines.push(`### Combat: ${cl.scenarioName} (${cl.difficulty.toUpperCase()})`);
  lines.push('');
  lines.push(`**Enemy Roster:**`);
  for (const e of cl.enemyRoster) {
    lines.push(`- ${e.name}: HP ${e.hp}, AC ${e.ac}, Attack +${e.attackBonus}, Damage ${e.damage}`);
  }
  lines.push('');
  lines.push(`**Outcome: ${cl.outcome.toUpperCase()}**  `);
  lines.push(`Rounds: ${cl.summary.totalRounds} | Damage taken: ${cl.summary.damageTaken} | Concentration breaks: ${cl.summary.concentrationBreaks}`);
  lines.push('');

  for (const round of cl.rounds) {
    if (round.round === 0) {
      lines.push(`#### Pre-Combat / Initiative Phase`);
    } else {
      lines.push(`#### Round ${round.round}`);
    }
    lines.push('');
    for (const ev of round.events) {
      lines.push(`- **[${ev.actor}] ${ev.action}:** ${ev.outcome}`);
    }
    lines.push('');
    const s = round.endState;
    lines.push(`> *End of ${round.round === 0 ? 'pre-combat' : `Round ${round.round}`}: Bard HP ${s.bardHp}/${s.bardHpMax} | Concentrating: ${s.concentrating} | Breaks: ${s.concentrationBreaks} | Mirror Images: ${s.mirrorImageCharges}*`);
    const living = s.enemies.filter((e) => e.alive && !e.controlled);
    const controlled = s.enemies.filter((e) => e.controlled);
    const dead = s.enemies.filter((e) => !e.alive);
    if (living.length > 0) lines.push(`> *Active enemies: ${living.map((e) => `${e.name} (${e.hp}/${e.maxHp} HP)`).join(', ')}*`);
    if (controlled.length > 0) lines.push(`> *Controlled: ${controlled.map((e) => `${e.name} (${e.hp}/${e.maxHp} HP)`).join(', ')}*`);
    if (dead.length > 0) lines.push(`> *Defeated: ${dead.map((e) => e.name).join(', ')}*`);
    lines.push('');
  }
  return lines.join('\n');
}

function renderSocialLogMd(sl: SocialEncounterLog): string {
  const lines: string[] = [];
  lines.push(`### Social: ${sl.scenarioName}`);
  lines.push('');
  lines.push(`*${sl.description}*`);
  lines.push('');
  lines.push(`**Skill:** ${sl.skill} | **DC:** ${sl.dc} | **Skill Bonus:** +${sl.skillBonus}`);
  if (sl.advantages.length > 0) {
    lines.push(`**Advantages:** ${sl.advantages.join(', ')}`);
  }
  lines.push('');
  lines.push(`**Result:** ${sl.outcomeDetail}`);
  lines.push('');
  lines.push(`**Outcome: ${sl.outcome.toUpperCase().replace('_', ' ')}**`);
  lines.push('');
  return lines.join('\n');
}

function renderPartySupportLogMd(pl: PartySupportEncounterLog): string {
  const lines: string[] = [];
  lines.push(`### Party Support: ${pl.scenarioName} (${pl.scenarioType})`);
  lines.push('');

  for (const round of pl.rounds) {
    if (round.round === 0) {
      lines.push(`#### Pre-Combat Phase`);
    } else {
      lines.push(`#### Round ${round.round}`);
    }
    lines.push('');
    if (round.events.length === 0) {
      lines.push('- *(No actions this round)*');
    } else {
      for (const ev of round.events) {
        lines.push(`- **[${ev.actor}] ${ev.action}:** ${ev.outcome}`);
      }
    }
    lines.push('');
    const s = round.endState;
    lines.push(`> *Inspiration dice: ${s.inspirationDiceLeft} | Healing slots: ${s.healingSlotsLeft} | Inspirations given: ${s.inspirationsGiven} | Healing dealt: ${s.healingDealt} HP | Features activated: ${s.featureActivations}*`);
    lines.push('');
  }

  const sum = pl.summary;
  lines.push(`**Summary:** ${sum.totalInspirations} inspirations given | ${sum.totalHealing} HP healed | ${sum.totalFeatureActivations} feature activations`);
  lines.push('');
  return lines.join('\n');
}

function renderBuildLogMd(logs: BuildEncounterLogs, rank: number): string {
  const lines: string[] = [];
  const s = logs.buildSummary;
  lines.push(`# Rank #${rank}: ${logs.buildId}`);
  lines.push('');
  lines.push(`## Build Summary`);
  lines.push('');
  lines.push(`| Field | Value |`);
  lines.push(`|-------|-------|`);
  lines.push(`| Species | ${s.subspecies} (${s.species}) |`);
  lines.push(`| Feats | ${s.feats.join(', ')} |`);
  lines.push(`| Magic Items | ${s.magicItems.join(', ')} |`);
  lines.push(`| AC | ${s.armorClass} |`);
  lines.push(`| HP | ${s.maxHitPoints} |`);
  lines.push(`| CHA modifier | +${s.charismaModifier} |`);
  lines.push(`| Spell Save DC | ${s.spellSaveDC} |`);
  lines.push('');
  lines.push(`### Ability Scores`);
  lines.push('');
  const ab = s.abilityScores;
  lines.push(`STR ${ab.strength} | DEX ${ab.dexterity} | CON ${ab.constitution} | INT ${ab.intelligence} | WIS ${ab.wisdom} | CHA ${ab.charisma}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(`## Combat Encounter Logs`);
  lines.push('');
  lines.push(`> Each combat scenario is run once (single simulation). Rolls are random — compare`);
  lines.push(`> patterns across multiple runs for statistical validation.`);
  lines.push('');
  for (const cl of logs.combatLogs) {
    lines.push(renderCombatLogMd(cl));
    lines.push('---');
    lines.push('');
  }
  lines.push(`## Social Encounter Logs`);
  lines.push('');
  for (const sl of logs.socialLogs) {
    lines.push(renderSocialLogMd(sl));
  }
  lines.push('---');
  lines.push('');
  lines.push(`## Party Support Encounter Logs`);
  lines.push('');
  for (const pl of logs.partySupportLogs) {
    lines.push(renderPartySupportLogMd(pl));
    lines.push('---');
    lines.push('');
  }
  return lines.join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  console.log(`\nSavras observes. The branching paths of fate are being illuminated...\n`);
  console.log(`Running full exploration matrix to identify the top ${TOP_N} builds...`);
  console.log(`(This uses 25 iterations per scenario for statistical accuracy.)\n`);

  const exploration = runLoreBardExploration(25, TOP_N);
  const topBuilds = exploration.topBuilds;

  console.log(`Top ${topBuilds.length} builds identified. Generating turn-by-turn encounter logs...\n`);

  ensureDir(OUTPUT_DIR);

  const readmeLines: string[] = [
    `# Encounter Logs — College of Lore Bard Simulation`,
    ``,
    `Generated by Savras, The All-Seeing. Every turn illuminated. Every roll recorded.`,
    ``,
    `These logs capture **one complete simulation run** of each scenario for the top ${TOP_N}`,
    `builds in the College of Lore exploration matrix. Each file shows exactly what happened,`,
    `turn by turn: every dice roll, AI decision, damage event, and saving throw.`,
    ``,
    `**Purpose:** Sanity-checking the simulation logic and ranking results. Because each file`,
    `is a single run (not a statistical average), individual outcomes reflect Monte Carlo`,
    `variance. Compare patterns across multiple builds to identify systematic differences.`,
    ``,
    `## Exploration Summary`,
    ``,
    `| Field | Value |`,
    `|-------|-------|`,
    `| Total builds evaluated | ${exploration.summary.totalBuildsEvaluated} |`,
    `| Iterations per scenario | ${exploration.summary.iterationsPerScenario} |`,
    `| Subclass | ${exploration.summary.subclassFixed} |`,
    `| Level | ${exploration.summary.level} |`,
    ``,
    `## Top ${TOP_N} Builds`,
    ``,
    `| Rank | Build ID | Composite | Combat | Social | Party |`,
    `|------|----------|-----------|--------|--------|-------|`,
  ];

  for (const build of topBuilds) {
    readmeLines.push(
      `| ${build.rank} | \`${build.buildId}\` | ${build.compositeScore.toFixed(1)} | ${build.combatScore.toFixed(1)} | ${build.socialScore.toFixed(1)} | ${build.partySupportScore.toFixed(1)} |`
    );
  }

  readmeLines.push('');
  readmeLines.push('## Log Files');
  readmeLines.push('');
  readmeLines.push('| Rank | Build ID | JSON | Markdown |');
  readmeLines.push('|------|----------|------|----------|');

  for (let i = 0; i < topBuilds.length; i++) {
    const build = topBuilds[i];
    const rank = build.rank;
    const fileName = `${String(rank).padStart(2, '0')}-${safeName(build.buildId)}`;

    console.log(`  [${rank}/${topBuilds.length}] Generating logs for: ${build.buildId}`);

    const logs = generateBuildEncounterLogs(build.buildId);
    if (!logs) {
      console.warn(`    WARNING: Could not generate logs for build ${build.buildId}`);
      continue;
    }

    // Save JSON
    const jsonPath = path.join(OUTPUT_DIR, `${fileName}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify({ rank, compositeScore: build.compositeScore, combatScore: build.combatScore, socialScore: build.socialScore, partySupportScore: build.partySupportScore, ...logs }, null, 2), 'utf8');

    // Save Markdown
    const mdPath = path.join(OUTPUT_DIR, `${fileName}.md`);
    const mdContent = renderBuildLogMd(logs, rank);
    fs.writeFileSync(mdPath, mdContent, 'utf8');

    readmeLines.push(`| ${rank} | \`${build.buildId}\` | [JSON](${fileName}.json) | [Markdown](${fileName}.md) |`);
  }

  readmeLines.push('');
  readmeLines.push('## Simulation Notes');
  readmeLines.push('');
  readmeLines.push('### Combat AI Logic (Player Character — Lore Bard)');
  readmeLines.push('');
  readmeLines.push('1. **Initiative**: With the Alert feat, the bard always acts first. Without Alert, there is a 50% chance enemies win initiative and attack before the bard can set up.');
  readmeLines.push('2. **Round 1 (≥2 enemies)**: Cast control spell (Hypnotic Pattern or Hold Person). Up to 3 enemies make WIS saves vs. the bard\'s spell save DC. Failures are incapacitated and the bard begins concentrating.');
  readmeLines.push('3. **Fey Step (Eladrin)**: When HP drops to ≤40%, use bonus action to teleport 30 ft away. Enemies spend their movement closing the gap — no attacks this round.');
  readmeLines.push('4. **Hidden Step (Firbolg)**: After control spell lands, use bonus action to turn invisible for 1 round. Forgo weapon attack to maintain stealth — enemies attack with disadvantage.');
  readmeLines.push('5. **Weapon Attack**: When control spell is spent or Hidden Step not active, attack with rapier (DEX + proficiency + item bonus). Valor bards get 2 attacks.');
  readmeLines.push('6. **Concentration saves**: When hit while concentrating, make CON save (DC = max(10, half damage)). War Caster grants advantage. Lucky feat allows rerolls. Halfling Lucky rerolls natural 1s.');
  readmeLines.push('');
  readmeLines.push('### Combat AI Logic (NPCs / Mobs)');
  readmeLines.push('');
  readmeLines.push('1. **Decision each turn**: If the enemy has a spellcasting ability (spellSaveDC + spellUseChance), there is a chance each round they attempt to cast an incapacitating spell (e.g. Hold Person). This is an AI choice modelled as a probability.');
  readmeLines.push('2. **Spell attempt**: If spell probability fires, the bard makes a WIS saving throw against the enemy\'s spell DC. Species with Magic Resistance (Satyr, Yuan-Ti) roll with advantage. Failure = incapacitation (concentration broken + automatic hit).');
  readmeLines.push('3. **Attack (if no spell)**: Enemy makes a melee or ranged attack. Hidden Step applies disadvantage (lower of two d20 rolls). Mirror Image may deflect the hit (1/3 chance per charge). Adamantine Armor converts critical hits to normal hits.');
  readmeLines.push('4. **End-of-round**: Controlled enemies make WIS saves to break free from concentration spells. Failure = remain controlled. Success = rejoin combat at current HP.');
  readmeLines.push('');
  readmeLines.push('### Social Encounter Logic');
  readmeLines.push('');
  readmeLines.push('1. Compute skill bonus: CHA modifier + expertise (2× proficiency) or proficiency if applicable.');
  readmeLines.push('2. Check for advantage sources: Actor feat (Deception/Performance), Hat of Disguise (Deception), Staff of Charming (Persuasion).');
  readmeLines.push('3. Roll d20 (two dice if advantage, take higher). Add skill bonus. Compare to DC.');
  readmeLines.push('4. Natural 20 = critical success regardless of DC.');
  readmeLines.push('');
  readmeLines.push('### Party Support Logic');
  readmeLines.push('');
  readmeLines.push('- Lore Bard: distribute Bardic Inspiration d8 each round (CHA mod uses/rest) + Cutting Words reaction (65% chance to use each round) + Counterspell if enemy casts.');
  readmeLines.push('- Healing Word when ally HP is low (scenario-specific probability).');
  readmeLines.push('- Midpoint short rest replenishes inspiration.');

  // Write README
  const readmePath = path.join(OUTPUT_DIR, 'README.md');
  fs.writeFileSync(readmePath, readmeLines.join('\n'), 'utf8');

  console.log(`\nAll encounter logs written to: ${OUTPUT_DIR}`);
  console.log(`  README: ${readmePath}`);
  console.log(`  ${topBuilds.length * 2} log files (JSON + Markdown per build)`);
  console.log('\nSavras has spoken. The paths of fate are now visible.\n');
}

main();
