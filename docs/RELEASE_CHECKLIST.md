# Release checks

## Public alpha
- [x] Dedicated repository not shared with CV website
- [x] Arabic/English; desktop/mobile responsive layout
- [x] Product FABE, mini lessons, branching roleplay
- [x] Unit tests for graph validation and localization
- [ ] GitHub Pages source set to GitHub Actions and deployment confirmed
- [ ] Browser QA with mobile and desktop devices
- [ ] Company branding/product specifications approved for public promotion

## Employee/private launch
- [ ] Dedicated Supabase project created
- [ ] schema.sql executed and RLS reviewed
- [ ] Disable public signups, invite employees individually
- [ ] Set Auth redirect URLs and production email SMTP
- [ ] Add publishable key and project URL (never service_role key)
- [ ] Test guest / unauthorized / staff / admin data boundaries
- [ ] Validate score integrity server-side (current score is client-submitted)
- [ ] Approve privacy notice, retention/deletion policies and staff reporting

## Later AI mode
- [ ] Server-side AI proxy; secret kept outside GitHub Pages
- [ ] Per-employee authorization, rate limits and spend caps
- [ ] Clear feedback criteria and human appeals path
- [ ] Evaluation, logging/privacy controls and moderation
