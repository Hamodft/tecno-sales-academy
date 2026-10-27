# TECNO Sales Academy — direct product reference and training

A simple employee-focused Arabic/English knowledge base that opens **directly** to products and product details. No login, no registration, no account setup, no paid backend.

### What works
- Four TECNO product references with categorized specifications, FABE, in-store demos, and common objections.
- Search by model, code, or series; filter by CAMON, POVA and SPARK.
- Four learning tracks, twelve lessons and on-device lesson completion.
- Three branching customer-experience simulations with instant scores and coaching.
- Responsive Arabic/English UI, designed for phone and desktop.
- Ready for approved TECNO logo and official phone imagery (currently CSS placeholders).

### Run and test
```bash
python3 -m http.server 8080
npm run check
```
Open http://localhost:8080. GitHub Pages deploy runs browser tests first.

### Important access note
GitHub Pages is a public site even when noindex is enabled. **Direct access without login does not restrict access to employees.** Publish only cleared general product facts and training content; do not commit sensitive staff information, internal unreleased product plans, confidential materials, or exam answer keys. These product facts are working training drafts to validate against current KSA SKUs. Local completion is not centrally reported.

### Official images
Provide approved TECNO logo (SVG/PNG) and official product renders as high-resolution PNG/WebP. When received, add to `assets/products/` and update the catalog display; do not assume generic placeholder renders are official.
