# Oslo bysykkel-kart

Applikasjon som viser de ulike bysykkel-stasjonene i Oslo i et kart med sanntids-informasjon om ledige låser og sykler.

## Forutsetninger

Node.js (v22) og NPM

## Backend

Backend er en Node.js-applikasjon som henter data fra Oslo bysykkel sitt API og eksponerer det via et REST-API.

Teknologier:
- Node.js, Express, Javascript

### Kjøre backend lokalt

I backend-mappen:

1. Installer avhengigheter:
   ```sh
   npm install
   ```
2. Kjør applikasjonen:
   ```sh
   node server.js
   ```

APIet vil være tilgjengelig på `http://localhost:5000/api/stations`.

### Kjøre tester

I frontend-mappen kjør testene med:
```sh
  npm run test
```

## Frontend

Frontend er en Vite-basert React-applikasjon som henter bysykkel-data fra backend og visualiserer dette i et kart.

Teknologier:
- Vite, React, Typescript, React Leaflet, React Query, Tailwind

### Kjøre frontend lokalt

Forutsetning: Backend må kjøre på `http://localhost:5000`.

I frontend-mappen:

1. Installer avhengigheter:
   ```sh
   npm install
   ```
2. Kjør applikasjonen:
   ```sh
   npm run dev
   ```

Applikasjonen vil være tilgjengelig på `http://localhost:5173`.

### Kjøre tester

TODO

## Kjøre applikasjonen Docker

Forutsetning: Docker installert

I rotmappen:

1. Bygg Docker-image:
   ```sh
   docker build -t oslobikes .
   ```
2. Kjør Docker-container:
   ```sh
    docker run -d -p 3000:5000 oslobikes
    ```

Frontend vil være tilgjengelig på http://localhost:3000. APIet på http://localhost:3000/api/stations.

## Videre arbeid

- Tester
- UX-forbedringer - f.eks. vise liste med stasjoner ved siden av kart.
- Eslint for statisk kodeanalyse