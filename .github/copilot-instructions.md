# GitHub Copilot Instructions

## Project Overview

DnD-Adventure is a Dungeons & Dragons character builder and combat simulator. It provides a RESTful API for creating and managing D&D 5e characters, designing encounters, running turn-based combat sessions, and browsing game reference data.

## Tech Stack

- **Runtime**: Node.js with TypeScript 5.3 (strict mode, ES2020 target, CommonJS output)
- **Framework**: Express 4.x
- **Database**: MongoDB via Mongoose 8.x ODM
- **Testing**: Jest 29 + ts-jest + Supertest + mongodb-memory-server
- **Dev tools**: ts-node, nodemon, dotenv

## Repository Structure

```
server/
├── src/
│   ├── index.ts              # Express app bootstrap and DB connection
│   ├── models/               # Mongoose schemas and TypeScript interfaces
│   │   ├── Character.ts
│   │   ├── CombatSession.ts
│   │   └── Encounter.ts
│   ├── routes/               # Express route handlers (thin controllers)
│   │   ├── characters.ts     # /api/characters
│   │   ├── combat.ts         # /api/combat
│   │   ├── encounters.ts     # /api/encounters
│   │   ├── reference.ts      # /api/reference (read-only game data)
│   │   └── dashboard.ts      # /api/dashboard (aggregated stats)
│   ├── services/             # Business logic layer
│   │   ├── CharacterService.ts
│   │   ├── CombatEngine.ts
│   │   └── ReferenceDataService.ts
│   ├── middleware/
│   │   └── errorHandler.ts   # Global error and 404 handlers
│   └── data/                 # Static D&D 5e reference data (read-only)
│       ├── classes.ts
│       ├── species.ts
│       ├── backgrounds.ts
│       ├── spells.ts
│       ├── feats.ts
│       ├── equipment.ts
│       ├── monsters.ts
│       └── encounterLibrary.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── .env.example
```

## Coding Conventions

### TypeScript
- Strict mode is enabled — avoid `any`, prefer explicit types and interfaces.
- Define a TypeScript interface (e.g. `ICharacter`) alongside every Mongoose schema.
- Use union string literals for domain enumerations (e.g. `'hit' | 'miss' | 'critical'`).
- Nested Mongoose sub-schemas are created without `_id: false` by default; add it only when needed.

### Models
- Each model file exports both the Mongoose model and its TypeScript interface.
- Sub-schemas are composed as separate schema variables before being used inline.

### Routes
- Route files are thin controllers — delegate business logic to services.
- List special compound endpoints (e.g. `/stats`) before parametric routes (e.g. `/:id`).
- Return `{ error: string, details?: string }` on errors.
- Use HTTP status codes: `201` for creation, `400` for validation errors, `404` for not found, `500` for server errors.

### Services
- Business logic lives in service classes; export a singleton instance at the bottom of the file.
- `CharacterService` handles character creation, validation, and derived-stat calculations.
- `CombatEngine` manages all combat state, dice rolling, and AI decision-making.
- `ReferenceDataService` wraps the static data files with safe lookup helpers.

### Error Handling
- Use the `createError` factory from `middleware/errorHandler.ts` to produce structured errors.
- All unhandled routes fall through to `notFoundHandler`, then `errorHandler`.

## API Routes Summary

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/api/characters` | List (filterable by level/class/species) or create characters |
| GET/PUT/DELETE | `/api/characters/:id` | Get, update, or delete a character |
| GET | `/api/characters/:id/stats` | Get derived stats for a character |
| GET/POST | `/api/encounters` | List or create encounters |
| GET/PUT/DELETE | `/api/encounters/:id` | Get, update, or delete an encounter |
| GET | `/api/encounters/library` | Browse pre-built encounter templates |
| POST | `/api/combat/start` | Start a new combat session |
| GET | `/api/combat/:id` | Get combat session state |
| POST | `/api/combat/:id/turn` | Execute a turn action |
| POST | `/api/combat/:id/end` | End a combat session |
| GET | `/api/reference/*` | Read-only access to classes, species, spells, feats, equipment |
| GET | `/api/dashboard/*` | Aggregated statistics and analytics |
| GET | `/health` | Health check |

## Testing

- Test files live in `src/__tests__/` and follow the pattern `*.test.ts`.
- Use `mongodb-memory-server` to spin up an in-memory MongoDB instance per test suite.
- Use `supertest` to make HTTP assertions against the Express app.
- Run tests with: `cd server && npm test`
- Tests use a 30-second timeout; use `--forceExit` to clean up after async operations.

## Environment Variables

Copy `server/.env.example` to `server/.env` and adjust values:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dnd-adventure
NODE_ENV=development
```

## Development Workflow

```bash
cd server
npm install
npm run dev    # Start with hot-reload via ts-node + nodemon
npm run build  # Compile TypeScript to dist/
npm start      # Run compiled output
npm test       # Run Jest test suite
```
