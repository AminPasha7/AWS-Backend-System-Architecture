SHELL := /bin/bash

setup:
	corepack enable && pnpm install || npm ci

dev:
	pnpm run dev || npm run dev

build:
	pnpm run build || npm run build

test:
	pnpm test

lint:
	pnpm run lint

docker-up:
	docker compose up -d --build

docker-down:
	docker compose down -v

sbom:
	syft packages dir:. -o spdx-json > sbom.spdx.json || echo "Install syft to generate SBOM"

iac-validate:
	cd infra/terraform && terraform fmt -check && terraform init -backend=false && terraform validate
