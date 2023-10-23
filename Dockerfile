FROM node:alpine AS build

RUN npm i -g pnpm
RUN npm i -g turbo
WORKDIR /jadwal-sholat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json pnpm-lock.yaml ./
COPY apps/jadwal-sholat/package.json ./apps/jadwal-sholat/package.json
COPY packages/eslint-config-custom/package.json ./packages/eslint-config-custom/package.json

RUN pnpm install

COPY . ./
RUN turbo run build

COPY apps/jadwal-sholat/.next ./apps/jadwal-sholat/.next
CMD ["turbo", "run", "dev"]