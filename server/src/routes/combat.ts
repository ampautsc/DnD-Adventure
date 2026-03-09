import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { CombatSession } from '../models/CombatSession';
import { Encounter } from '../models/Encounter';
import { Character } from '../models/Character';

const router = Router();

// POST /start - start a new combat session
router.post('/start', async (req: Request, res: Response) => {
  try {
    const { encounterId, characterIds } = req.body;
    if (!encounterId || !characterIds || !Array.isArray(characterIds) || characterIds.length === 0) {
      res.status(400).json({ error: 'Missing required fields: encounterId, characterIds (array)' });
      return;
    }

    const encounter = await Encounter.findById(encounterId);
    if (!encounter) {
      res.status(404).json({ error: 'Encounter not found' });
      return;
    }

    const characters = await Character.find({ _id: { $in: characterIds } });
    if (characters.length === 0) {
      res.status(404).json({ error: 'No valid characters found for the given characterIds' });
      return;
    }

    // Build participant list from characters and encounter enemies
    const characterParticipants = characters.map((char) => ({
      id: char._id.toString(),
      name: char.name,
      type: 'character' as const,
      initiative: Math.floor(Math.random() * 20) + 1 + Math.floor((char.abilityScores.dexterity - 10) / 2),
      hp: char.hitPoints.current,
      maxHp: char.hitPoints.max,
      ac: char.armorClass,
      isAlive: char.hitPoints.current > 0,
    }));

    const enemyParticipants = encounter.enemies.flatMap((enemy) =>
      Array.from({ length: enemy.count }, (_, i) => ({
        id: `enemy-${enemy.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        name: enemy.count > 1 ? `${enemy.name} ${i + 1}` : enemy.name,
        type: 'enemy' as const,
        initiative: Math.floor(Math.random() * 20) + 1,
        hp: 10,
        maxHp: 10,
        ac: 12,
        isAlive: true,
      }))
    );

    const allParticipants = [...characterParticipants, ...enemyParticipants]
      .sort((a, b) => b.initiative - a.initiative);

    const session = new CombatSession({
      encounterId: new mongoose.Types.ObjectId(encounterId),
      participants: allParticipants,
      status: 'active',
      rounds: [],
      log: [{
        timestamp: new Date(),
        message: `Combat started: ${encounter.name}`,
        type: 'info',
      }],
      startedAt: new Date(),
    });

    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: 'Failed to start combat session', details: (err as Error).message });
  }
});

// GET /:id - get combat session state
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const session = await CombatSession.findById(req.params.id);
    if (!session) {
      res.status(404).json({ error: 'Combat session not found' });
      return;
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve combat session', details: (err as Error).message });
  }
});

// POST /:id/action - perform an action in combat
router.post('/:id/action', async (req: Request, res: Response) => {
  try {
    const { participantId, actionType, targetId, spellName } = req.body;
    if (!participantId || !actionType) {
      res.status(400).json({ error: 'Missing required fields: participantId, actionType' });
      return;
    }

    const session = await CombatSession.findById(req.params.id);
    if (!session) {
      res.status(404).json({ error: 'Combat session not found' });
      return;
    }
    if (session.status !== 'active') {
      res.status(400).json({ error: `Combat session is not active (status: ${session.status})` });
      return;
    }

    const actor = session.participants.find((p) => p.id === participantId);
    if (!actor) {
      res.status(404).json({ error: 'Participant not found in this session' });
      return;
    }
    if (!actor.isAlive) {
      res.status(400).json({ error: 'Participant is not alive and cannot take actions' });
      return;
    }

    const attackRoll = Math.floor(Math.random() * 20) + 1;
    let damage = 0;
    let result = '';
    let logMessage = '';

    const target = targetId ? session.participants.find((p) => p.id === targetId) : null;

    switch (actionType) {
      case 'attack': {
        if (!target) {
          res.status(400).json({ error: 'targetId is required for attack actions' });
          return;
        }
        const hit = attackRoll >= target.ac;
        if (hit) {
          damage = Math.floor(Math.random() * 8) + 1;
          target.hp = Math.max(0, target.hp - damage);
          if (target.hp === 0) target.isAlive = false;
          result = `Hit! Dealt ${damage} damage to ${target.name}${target.isAlive ? '' : ' (killed)'}`;
        } else {
          result = `Missed ${target.name} (rolled ${attackRoll} vs AC ${target.ac})`;
        }
        logMessage = `${actor.name} attacks ${target.name}: ${result}`;
        break;
      }
      case 'spell': {
        const spellRoll = Math.floor(Math.random() * 20) + 1;
        damage = Math.floor(Math.random() * 12) + 1;
        const spellLabel = spellName ?? 'a spell';
        if (target) {
          const hit = spellRoll >= target.ac;
          if (hit) {
            target.hp = Math.max(0, target.hp - damage);
            if (target.hp === 0) target.isAlive = false;
            result = `Spell hit! Dealt ${damage} damage to ${target.name}`;
          } else {
            result = `Spell missed ${target.name}`;
          }
          logMessage = `${actor.name} casts ${spellLabel} at ${target.name}: ${result}`;
        } else {
          result = `Cast ${spellLabel} (area effect, rolled ${spellRoll})`;
          logMessage = `${actor.name} casts ${spellLabel}: ${result}`;
        }
        break;
      }
      case 'heal': {
        const healTarget = target ?? actor;
        const healAmount = Math.floor(Math.random() * 8) + 1;
        healTarget.hp = Math.min(healTarget.maxHp, healTarget.hp + healAmount);
        result = `Healed ${healTarget.name} for ${healAmount} HP (now ${healTarget.hp}/${healTarget.maxHp})`;
        logMessage = `${actor.name} heals ${healTarget.name}: ${result}`;
        break;
      }
      case 'dodge':
        result = `${actor.name} takes the Dodge action`;
        logMessage = result;
        break;
      case 'disengage':
        result = `${actor.name} disengages`;
        logMessage = result;
        break;
      case 'dash':
        result = `${actor.name} dashes`;
        logMessage = result;
        break;
      default:
        result = `${actor.name} performs ${actionType}`;
        logMessage = result;
    }

    // Determine current round or create a new one
    let currentRound = session.rounds[session.rounds.length - 1];
    if (!currentRound) {
      currentRound = { roundNumber: 1, turns: [] };
      session.rounds.push(currentRound);
    }

    currentRound.turns.push({
      participantId,
      participantName: actor.name,
      actions: [{
        type: actionType,
        description: spellName ? `${actionType}: ${spellName}` : actionType,
        roll: attackRoll,
        target: targetId,
        damage: damage > 0 ? damage : undefined,
        result,
      }],
    });

    session.log.push({ timestamp: new Date(), message: logMessage, type: damage > 0 ? 'damage' : 'action' });

    // Check for combat end conditions
    const aliveEnemies = session.participants.filter((p) => p.type === 'enemy' && p.isAlive);
    const aliveCharacters = session.participants.filter((p) => p.type === 'character' && p.isAlive);

    if (aliveEnemies.length === 0) {
      session.status = 'completed';
      session.completedAt = new Date();
      session.result = {
        outcome: 'victory',
        survivingCharacters: aliveCharacters.map((p) => p.id),
        killedCharacters: session.participants.filter((p) => p.type === 'character' && !p.isAlive).map((p) => p.id),
        xpAwarded: 0,
        duration: Math.floor((new Date().getTime() - (session.startedAt?.getTime() ?? new Date().getTime())) / 1000),
      };
      session.log.push({ timestamp: new Date(), message: 'All enemies defeated! Victory!', type: 'info' });
    } else if (aliveCharacters.length === 0) {
      session.status = 'completed';
      session.completedAt = new Date();
      session.result = {
        outcome: 'defeat',
        survivingCharacters: [],
        killedCharacters: session.participants.filter((p) => p.type === 'character').map((p) => p.id),
        xpAwarded: 0,
        duration: Math.floor((new Date().getTime() - (session.startedAt?.getTime() ?? new Date().getTime())) / 1000),
      };
      session.log.push({ timestamp: new Date(), message: 'All characters defeated! Defeat!', type: 'info' });
    }

    session.markModified('participants');
    session.markModified('rounds');
    session.markModified('log');
    await session.save();

    res.json(session);
  } catch (err) {
    res.status(400).json({ error: 'Failed to perform action', details: (err as Error).message });
  }
});

// POST /:id/end - end/abandon a combat session
router.post('/:id/end', async (req: Request, res: Response) => {
  try {
    const session = await CombatSession.findById(req.params.id);
    if (!session) {
      res.status(404).json({ error: 'Combat session not found' });
      return;
    }
    if (session.status === 'completed' || session.status === 'abandoned') {
      res.status(400).json({ error: `Combat session is already ${session.status}` });
      return;
    }

    const aliveCharacters = session.participants.filter((p) => p.type === 'character' && p.isAlive);

    session.status = 'abandoned';
    session.completedAt = new Date();
    session.result = {
      outcome: 'retreat',
      survivingCharacters: aliveCharacters.map((p) => p.id),
      killedCharacters: session.participants.filter((p) => p.type === 'character' && !p.isAlive).map((p) => p.id),
      xpAwarded: 0,
      duration: Math.floor((new Date().getTime() - (session.startedAt?.getTime() ?? new Date().getTime())) / 1000),
    };
    session.log.push({ timestamp: new Date(), message: 'Combat session ended/abandoned', type: 'info' });

    await session.save();
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: 'Failed to end combat session', details: (err as Error).message });
  }
});

export default router;
