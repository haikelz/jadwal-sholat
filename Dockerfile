FROM node:alpine AS build

RUN npm install -g pnpm
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json pnpm-lock.yaml ./

# apps
COPY apps/jadwal-sholat/package.json ./apps/jadwal-sholat/package.json

# packages
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

RUN pnpm install
RUN pnpm install --filter jadwal-sholat

COPY . ./
RUN pnpm run build
COPY apps/jadwal-sholat/.next ./apps/jadwal-sholat/.next

# run dev
CMD ["pnpm", "run", "dev"]
