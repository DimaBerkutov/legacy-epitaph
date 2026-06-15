# Legacy Epitaph

Memorial to programming languages: those that live, those that passed, and those whose legacy we write every day.

## About

Legacy Epitaph is an interactive timeline and repository for programming language history. Track the birth, evolution, and "death" of languages—from Fortran to Rust—with rich metadata, epitaphs, and lineage trees.

- **Living** — Actively maintained and in widespread use
- **Legacy** — Historically significant but no longer actively developed
- **Dormant** — No active development but not officially deprecated

## GitHub Repo

https://github.com/DimaBerkutov/corporate-resource-suite

## Features

- **Overview** — Statistical summary of all languages
- **Living Languages** — Browse and filter by paradigm (functional, OOP, procedural, etc.)
- **Evolution Timeline** — Chronological view of language births and epitaphs

## Tech Stack

- Vanilla JavaScript (ES Modules)
- Hash-based routing with lazy-loaded views
- Mock data layer for fast iteration
- Clean separation of concerns (views, components, services)

## Run Locally

1. Clone this repository.
2. Open `index.html` in a modern browser.
3. Navigate via hash URLs (`#/`, `#/living`, `#/evolution`).

## Project Structure

```
js/
├── app.js                 # Entry point, App class
├── router.js              # Hash router & view loader
├── data/
│   └── languageService.js # Data layer with mock data
└── ui/
    ├── dom.js             # DOM helpers (el, mount)
    ├── views/
    │   ├── homeView.js
    │   ├── livingLanguagesView.js
    │   └── evolutionView.js
    └── components/
        ├── languageCard.js
        ├── timelineItem.js
        └── navbar.js
```

## License

MIT License.