# JIMOV - Media Content API

![image description](./src/images/JIMOV_logo.png)

[![discordBadge](https://img.shields.io/badge/Chat-Click%20here-7289d9?style=for-the-badge&logo=discord)](https://discord.com/invite/tyZ39GCX7R)
[![documentationBadge](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![documentationBadge](https://img.shields.io/badge/Documentation-Click%20here-blue?style=for-the-badge)](https://jimov-api-docs.vercel.app/)
[![CIBadge](https://github.com/koikiss-dev/jimov_api/actions/workflows/CI.yaml/badge.svg)](https://github.com/koikiss-dev/jimov_api/actions/workflows/CI.yaml)

## **Overview**

JIMOV is an open-source API that aggregates multimedia content from multiple
websites — anime, manga, doramas, movies and series, and news — in both
Spanish and English. Each website is implemented as an independent
**provider** that scrapes and normalizes its data behind a consistent REST
interface, so consumers can search content by keywords and retrieve detailed
information (title, synopsis, images, chapters/episodes, servers and more)
using the same response shapes across providers.

### Documentation

The full endpoint reference lives in the [official documentation](https://jimov-api-docs.vercel.app/).

## **Features**

- **Search** — filter content by keywords on every provider
- **Anime** — anime info, episodes and streaming servers
- **Manga** — manga info, chapters and page images
- **Multi-language** — Spanish and English sources
- **Modular providers** — add a new site without touching the rest of the API

## **Providers**

| Type    | Providers                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| Anime   | AnimeFlv, AnimeLatinoHD, TioAnime, GogoAnime, Zoro, MonosChinos, 9Anime, AnimeBlix, AnimeVostFr, WcoStream... |
| Manga   | MangaNelo, MangaReader, Comick, InManga, MangaBuddy, Nhentai...                                               |
| Doramas | Dramanice                                                                                                     |
| News    | Kudasai                                                                                                       |

See the [complete provider list](./list-of-providers.md) for languages and status.

## **Requirements**

| Tool    | Version |
| ------- | ------- |
| Node.js | >= 18   |
| pnpm    | >= 8    |

## **Getting Started**

```bash
# 1. Install dependencies
pnpm install

# 2. Start the development server (nodemon + ts-node, hot reload)
pnpm start:dev

# The API is now available at http://localhost:3000
```

Other available scripts:

```bash
pnpm build        # compile TypeScript to ./build (tsc + tsc-alias)
pnpm start        # run the compiled build
pnpm test         # run the jest suite with coverage
pnpm linter       # eslint over scrapers and routes
pnpm format       # prettier over the repository
```

## **Testing**

Most tests exercise real websites through the network, so they require an
internet connection:

```bash
npx jest --coverage=false          # full suite, faster (no coverage report)
npx jest src/test/Nhentai.spec.ts  # a single suite
npx jest -t "should filter"        # tests matching a name
```

## **API Usage**

A public instance is hosted at `https://jimov-api.vercel.app`. Every endpoint
follows the same pattern per provider:

```
GET /anime/{provider}/name/{name}      # details of an anime
GET /anime/{provider}/filter           # search anime
GET /anime/{provider}/episode/{id}     # episode servers
GET /manga/{provider}/name/{id}        # details of a manga
GET /manga/{provider}/chapter/{id}     # chapter pages
GET /providers                         # list of registered providers
```

Quick examples:

```bash
# Check that the API is up
curl https://jimov-api.vercel.app/

# List every provider with metadata
curl https://jimov-api.vercel.app/providers

# Search anime on AnimeFlv
curl "https://jimov-api.vercel.app/anime/flv/filter?title=naruto"
```

Check the [documentation](https://jimov-api-docs.vercel.app/) for every
parameter and response shape.

## **Project Structure**

```
src/
├── index.ts            # Express app entry point
├── routes/
│   ├── v1/             # One router folder per provider
│   └── providers.ts    # Provider registry (/providers)
├── scraper/
│   └── sites/          # One folder per scraped website
├── models/             # Base classes for scrapers
├── types/              # Shared response contracts
├── utils/              # Shared helpers
└── test/               # Jest suites (*.spec.ts)
```

## **How to Contribute**

If you are interested in contributing to the project, follow these instructions:

1. Fork the repository.
2. Create a branch for your change (`feat/my-provider`, `fix/my-bug`).
3. Make changes and test (`pnpm test`, `pnpm linter`, `pnpm build`).
4. Submit a pull request.

> [!NOTE]
> Commit messages follow the
> [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
> specification (`feat:`, `fix:`, `test:`...) and are validated with commitlint.

Want to add a new website? Create a folder under `src/scraper/sites/<type>/`
implementing the shared types from `src/types/`, expose it with a router
under `src/routes/v1/`, mount it in `src/index.ts` and add tests in
`src/test/`.

## **Authors**

- [@Koikiss](https://github.com/koikiss-dev)
- [@Maw](https://github.com/Mawfyy)
- [@Zukaritasu](https://github.com/Zukaritasu)
- [@Tokyo](https://github.com/TokyoTF)
- [@barrientosvctor](https://github.com/barrientosvctor)

## **LICENSE**

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
