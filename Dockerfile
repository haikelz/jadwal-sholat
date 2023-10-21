# Test build with docker
# NVM, i still confused to figure out how to configure docker with Next JS monorepo project
FROM node:alpine as build

RUN npm i -g pnpm
WORKDIR /usr/src/app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json pnpm-lock.yaml ./
COPY apps/jadwal-sholat/package.json ./apps/jadwal-sholat/package.json

RUN pnpm install
COPY . ./