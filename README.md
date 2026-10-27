# TECNO Sales Academy

A bilingual product-knowledge and sales-training academy for retail staff. Direct access; no sign-in.

## Modules
- CAMON 50 Ultra, POVA 8 Pro / POVA 8 Series, POVA Curve 2, and SPARK 50 5G device references
- Official TECNO logo and supplied phone photography on catalog, device and scenario pages
- Categorized specifications, FABE examples, hands-on demonstrations and customer objections
- 30 interactive customer cases — 10 for each of CAMON 50 Ultra, POVA 8 Series, POVA Curve 2
- Scenario outcomes score three skills: 40% technical knowledge, 35% customer experience, 25% selling skills
- A complete 9-stage customer journey for three buyer personas, with branching customer reactions, simulated trust and 4-skill final score
- Six communication-first skill pathways with 24 bilingual lessons, interactive question-and-feedback exercises and local progress tracking
- Arabic-first, English toggle, responsive for desktop and mobile

## Release
Push to `main` triggers Node unit tests, Chromium browser/device tests, and GitHub Pages deployment.

```bash
python3 -m http.server 8080
npm run check
```

## Content upkeep
Specifications and sales demonstrations are maintained in `assets/catalog.js`. Scenarios are managed in `assets/scenario-bank.js`. Communication-focused lessons are in `assets/communication.js`. Customer journey data and scoring are maintained in `assets/sales-journey.js`. Phone imagery is located in `assets/products/`; the wordmark is `assets/tecno-logo.svg`. Product details should match the supported market variant.

## Access
GitHub Pages is accessible to anyone with the URL. Do not store employee personal information, confidential business details, or unpublished company data in the repository.
