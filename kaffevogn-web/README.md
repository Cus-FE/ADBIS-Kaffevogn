# KaffeVogn

En React-webapp hvor brugere kan finde kaffevogne på et interaktivt kort i København.

## Teknologi

- **React 19** med Vite
- **React-Leaflet** — interaktivt kort 
- **Mock data** — ingen backend, al data er defineret i `src/data/mockData.js`

## Krav

- [Node.js](https://nodejs.org/) version 18 eller nyere

## Installation og opstart

1. Klon eller download repositoriet

2. Gå ind i projektmappen:
   ```
   cd kaffevogn-web
   ```

3. Installér afhængigheder:
   ```
   npm install
   ```

4. Start udviklingsserveren:
   ```
   npm run dev
   ```

5. Åbn [http://localhost:5173](http://localhost:5173) i din browser

> Der kræves ingen API-nøgler eller miljøvariabler. Appen kører direkte efter `npm install`.

## Login

Brug følgende testbruger til at logge ind:

| Felt | Værdi |
|---|---|
| Email | frederik@example.dk |
| Adgangskode | 1234 |

## Funktioner

- **Kortside** — se 7 kaffevogne placeret på et kort over København med filtre (Alle / Åbne nu / Planlagte)
- **Vognpanel** — klik på en pin for at se vognnavn, menu, priser og åbningstider
- **Favoritter** — gem og fjern favoritvogne, Frederik har 2 forudindstillede favoritter
- **Login** — simpel prototype-login uden backend

## Projektstruktur

```
src/
├── assets/         Billeder (hero-foto på login-siden)
├── components/     Genanvendelige komponenter (Sidebar, VognPanel, Badge)
├── data/           Mock-data med 7 kaffevogne og én testbruger
├── models/         OOP-klasser (Kaffevogn, Kunde, Menu, Koordinat m.fl.)
└── pages/          Sider (LoginPage, KortPage, FavoritterPage)
```
