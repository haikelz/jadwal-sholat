<div align="center">
  <h1>Jadwal Sholat</h1>
  <p>Jadwal Sholat is a website for prayer times, Asma'ul Husna, Al-Qur'an (with reciter, translation, and Latin), daily prayers, hadith, and Puasa Sunnah schedules.</p>
</div>

## 📝Features

- Prayer schedule based on user location
- Read Al-Qur'an (with audio selection for Quran reciter, translation, and Latin)
- Asma'ul Husna
- Daily prayers
- Hadith (browse by book and number)
- Puasa Sunnah schedule based on month, type of Puasa Sunnah, and current year

## ⚡️Technologies

- Next JS
- TypeScript
- Tailwind CSS + shadcn/ui
- React Query
- Zustand
- Sentry
- [moonrepo](https://moonrepo.dev/) monorepo
- Bun (package manager and runtime)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (lockfile: `bun.lock`)
- [moon](https://moonrepo.dev/) (also available as `@moonrepo/cli` in the workspace root)

### Repository branches

- `master` — production
- `dev` — feature development
- `pagesDir` — historical branch before App Router migration

### Install and run

```bash
git clone https://github.com/haikelz/jadwal-sholat.git
cd jadwal-sholat
bun install
```

Start the Next.js app (from the repository root):

```bash
bun run dev:web
```

Equivalent with moon:

```bash
moon run jadwal-sholat:dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other useful commands (root)

| Command | Description |
| --- | --- |
| `bun run dev:web` | Development server |
| `bun run build:web` | Production build |
| `bun run test:web` | E2E tests (Cypress via moon) |

### App package (`apps/jadwal-sholat`)

You can also run scripts from the app directory:

```bash
cd apps/jadwal-sholat
bun run dev      # next dev
bun run build    # next build
bun run start    # next start
bun run lint     # next lint
bun run test     # cypress run
bun run open     # cypress open
```

### Workspace layout

- `apps/jadwal-sholat` — Next.js application
- `packages/eslint-config`, `packages/typescript-config` — shared tooling

## Screenshots

|                                                                      |                                                                      |
| :------------------------------------------------------------------: | :------------------------------------------------------------------: |
| ![ss 1](/static/docs/Screenshot%20From%202025-03-19%2019-17-06.png)  | ![ss 2](/static/docs/Screenshot%20From%202025-03-19%2019-20-16.png)  |
| ![ss 3](/static/docs/Screenshot%20From%202025-03-19%2019-17-30.png)  | ![ss 4](/static/docs/Screenshot%20From%202025-03-19%2019-17-33.png)  |
| ![ss 5](/static/docs/Screenshot%20From%202025-03-19%2019-17-44.png)  | ![ss 8](/static/docs/Screenshot%20From%202025-03-19%2019-18-19.png)  |
| ![ss 9](/static/docs/Screenshot%20From%202025-03-19%2019-18-27.png)  | ![ss 10](/static/docs/Screenshot%20From%202025-03-19%2019-20-11.png) |
| ![ss 10](/static/docs/Screenshot%20From%202025-11-27%2023-54-20.png) | ![ss 11](/static/docs/Screenshot%20From%202025-11-27%2023-54-39.png) |
|                                                                      |                                                                      |

## Activity

![Alt](https://repobeats.axiom.co/api/embed/fdae03fe11b3e4d1ef0dec27555d7eb2b121bd5f.svg "Repobeats analytics image")

## 🗒️Credits

Thank you for inspiring me

https://islamiah.vercel.app/

## 🤝Supports

- [Github Sponsor](https://github.com/sponsors/haikelz)
- [Trakteer](https://trakteer.id/haikelz/tip)

## License

MIT
