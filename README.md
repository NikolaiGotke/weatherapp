# Better Developers — Weather Dashboard

## Beskrivelse
Dette projekt er en webapp i Next.js + TypeScript, der viser aktuelt vejr og en 7-dages prognose. Formålet er at hjælpe Better Developers med at forberede sig på vejret, så man aldrig bliver overrasket af regn eller vind på vej til kontoret.

Data hentes fra [Open-Meteo](https://open-meteo.com/) API, som ikke kræver API-nøgle.

---

## Funktioner

### Lokation
- Standardkoordinater: `56.1518, 10.2064` (Rosenkrantzgade 19B, 8000 Aarhus C)
- Mulighed for at søge på vilkårlig by via søgefelt.

### Aktuelt vejr
- Temperatur
- Vindhastighed og -retning
- Nedbør
- Vejrikon
- Viser også valgt bynavn

### 7-dages prognose
- Hver dag viser min/max temperatur, vind, nedbør og vejrkode
- Accordion for hver dag med time-for-time visning (hver 3. time)

### Søg efter by
- Søgefelt med placeholder “Søg efter by”
- Keyboard navigation: pil op/ned + Enter
- Viser landekode i forslag
- Når en by vælges, nulstilles søgefeltet tilbage til placeholder

### Genvej
- Hus-ikon som hurtigt sætter by til “Bunkeren, Better Developers” og navigerer til forsiden

---

## Installation

```bash
git clone <din-repo-url>
cd weatherapp
npm install
npm run dev
# Åbn http://localhost:3000
