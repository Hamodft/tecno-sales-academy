# TECNO Sales Academy

Interactive bilingual Arabic/English retail sales-learning platform built as an independent educational prototype.

> **Status: public alpha.** This is not an official TECNO website. Product descriptions are training examples and should be verified before external marketing. Do not store employee PII or internal retail materials in this public repository.

## Features
- RTL Arabic + LTR English responsive interface
- Product knowledge and FABE (Feature → Advantage → Benefit → Evidence)
- Branching customer-experience roleplay with score and coaching
- Guided mini-lessons and knowledge checks
- Structured employee identity, results, and roles planned with Supabase (not enabled without a project)

## Architecture
Static client runs directly on GitHub Pages, without a paid frontend server. Protected employee account features require **Supabase Auth + PostgreSQL with RLS**. Never ship a Supabase service-role key or customer/employee personal data in this repository.

## Local preview
```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Deploy
GitHub > Settings > Pages > Build and deployment > Source: **GitHub Actions**. Every push to main runs syntax/unit tests and publishes the web assets. Expected URL: https://hamodft.github.io/tecno-sales-academy/

## Release gates
- [x] Public learning material and simulation
- [ ] GitHub Pages deployment confirmed
- [ ] Live Supabase project configured with RLS
- [ ] Invite-only identity and role acceptance tests
- [ ] Content approved for official corporate use
- [ ] Accessibility and phone browser QA
- [ ] Advanced AI simulator with a protected server-side API
