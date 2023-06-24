# fswahl

Generator für Fachschaftswahlen an der Rheinischen Friedrich-Wilhelms-Universität Bonn.

## Unterstützte Wahlverfahren

- Personenwahl FSV/FSR als Urnenwahl
- Personenwahl FSV/FSR mit Option der Wahlvollversammlung nach § 27 FSWO

## Nicht unterstützte Wahlverfahren

- Option der Verhältniswahl nach § 28 FSWO


## Update der nicht zulässigen Daten und Zeiträume

In `/utils/forbidden-dates.ts` sind Daten und Zeiträume definiert, in denen keine Wahltage und keine gemeinsamen Fristen zur Einreichung von Kandidaturen, zur Einreichung von Briefwahlanträgen, und zur Einreichung von Einsprüchen gegen das Wählendenverzeichnis liegen dürfen.
Diese müssen regelmäßig anhand der [Semestertermine](https://www.uni-bonn.de/de/studium/organisation-des-studiums/semestertermine) und eines [Feiertagskalenders](https://www.schulferien.org/deutschland/feiertage/nordrhein-westfalen/) aktualisiert werden.

Die Datenstruktur sollte selbsterklärend sein.
Einzeltage haben dasselbe Datum in `start` und `end`.


## Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

### Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
