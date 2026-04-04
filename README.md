# Ministere du Tourisme du Niger - Next.js + PostgreSQL

Site institutionnel multilingue (FR/EN/HA) avec:
- front premium (glassmorphism chaud, textures artisanales, animations)
- back-office securise (roles ADMIN/EDITOR)
- contenus dynamiques via Prisma/PostgreSQL
- formulaires de leads (DB + notification email)
- carte destinations OpenStreetMap/Leaflet

## Stack
- Next.js App Router (TypeScript)
- Tailwind CSS v4 + Framer Motion
- Prisma + PostgreSQL
- NextAuth credentials
- Vitest + Playwright
- Docker Compose (app + postgres + caddy)

## Quick start
1. Installer les dependances:
   ```bash
   npm install
   ```
2. Creer les variables d'environnement:
   ```bash
   cp .env.example .env
   ```
3. Demarrer PostgreSQL (local Docker):
   ```bash
   docker compose up -d db
   ```
4. Generer Prisma et appliquer la migration:
   ```bash
   npm run prisma:generate
   npx prisma migrate deploy
   ```
5. Seeder les donnees initiales (admin + placeholders):
   ```bash
   npm run db:seed
   ```
6. Lancer l'app:
   ```bash
   npm run dev
   ```

## Comptes initiaux
Admin seed (modifiable via `.env`):
- `ADMIN_EMAIL=admin@tourisme.gouv.ne`
- `ADMIN_PASSWORD=ChangeMe123!`

Connexion back-office: `/admin/login`

## Scripts utiles
- `npm run dev`: lancement local
- `npm run build`: build production
- `npm run lint`: lint
- `npm run typecheck`: verification TypeScript
- `npm run test`: tests unitaires + integration
- `npm run test:e2e`: test E2E Playwright

## API publique
- `GET /api/public/:resource?locale=fr|en|ha`
  - resources: `destinations`, `circuits`, `events`, `articles`, `gallery`
- `POST /api/leads/contact`
- `POST /api/leads/circuit-request`
- `GET /api/map/destinations?locale=fr|en|ha`

## Back-office API
- `GET|POST /api/admin/:resource`
- `GET|PATCH|DELETE /api/admin/:resource/:id`
- `GET /api/admin/leads`
- `PATCH /api/admin/leads/:id/status`

## Deploiement VPS
- Build image avec `Dockerfile`
- Orchestration via `docker-compose.yml`
- Reverse proxy via `Caddyfile`

Commande:
```bash
docker compose up -d --build
```
