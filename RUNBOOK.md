# RUNBOOK

## Startup
- `pnpm run dev` for local
- Docker: `make docker-up`

## Health
- `GET /health` returns 200

## Migrations
- Add migration notes here when integrating Prisma

## Backup/Restore
- Managed DB backups (CockroachDB) – follow provider docs

## Rollbacks
- Use Docker image tags; redeploy previous tag

## Incidents
- Triage with logs (pino) + traces (Datadog + OpenTelemetry)
