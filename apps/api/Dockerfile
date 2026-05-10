# Build desde la raíz del monorepo:
#   docker build -f apps/api/Dockerfile -t monoambiente-api .
#
# Variables de entorno en runtime (ej. Railway / Fly / ECS):
#   DATABASE_URL       — Postgres (misma que Prisma en Vercel)
#   WEB_ORIGIN         — CORS; ej. https://monoambientes.com,https://xxx.vercel.app
#   PORT               — lo suelen inyectar las plataformas (default 4000)
#   TOKKO_*            — opcional, según integración

FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY apps/worker/package.json apps/worker/
COPY packages/database/package.json packages/database/
COPY packages/shared/package.json packages/shared/

COPY packages/database/prisma packages/database/prisma
COPY packages/database/src packages/database/src
COPY packages/shared/src packages/shared/src
COPY apps/api apps/api

RUN npm ci --ignore-scripts \
  && npm run db:generate \
  && npm prune --omit=dev \
  && chown -R node:node /app

USER node

EXPOSE 4000
ENV PORT=4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "apps/api/src/main.js"]
