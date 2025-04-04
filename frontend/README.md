# Oslo bysykkel-kart

Applikasjon som viser de ulike bysykkel-stasjonene i Oslo i et kart med sanntids-informasjon om ledige låser og sykler.

## Forutsetninger

Node.js (v22) og NPM

## Backend

Backend er en Node.js-applikasjon som henter data fra Oslo bysykkel sitt API og eksponerer det via et REST-API.

Teknologier:
- Node.js, Express, Javascript

### Kjøre backend lokalt

1. Installer avhengigheter:
   ```sh
   npm install
   ```
2. Kjør applikasjonen:
   ```sh
   node server.js
   ```

APIet vil være tilgjengelig på `http://localhost:5000/api/stations`.

## Frontend

Frontend er en Vite-basert React-applikasjon som henter bysykkel-data fra backend og visualiserer dette i et kart.

Teknologier:
- Vite, React, Typescript, React Leaflet, React Query, Tailwind

### Kjøre frontend lokalt

Forutsetning: Backend må kjøre på `http://localhost:5000`.

1. Installer avhengigheter:
   ```sh
   npm install
   ```
2. Kjør applikasjonen:
   ```sh
   npm run dev
   ```

Applikasjonen vil være tilgjengelig på `http://localhost:5173`.

## Videre arbeid

- komponent-tester med react-testing-library
- e2e-tester med Cypress / Playwright
- Vise liste med stasjoner ved siden av kart
- eslint