# TECNO Sales Academy — Employee-only training platform

> **Security status:** The public GitHub Pages deployment is an authentication shell only. All product specifications, courses, FABE scripts, scenarios, and media must be loaded from an authenticated database with RLS. **Until Supabase is configured, employee sign-in is intentionally disabled.**

## Scope
- Staff only: invite + admin approval, no public signup
- Arabic/English, mobile responsive
- Product catalog with specifications, FABE, private phone images
- Courses, lessons, completion tracking
- Branching customer simulations and formative assessments
- Admin product editor (more content-management tools planned)

## Architecture
- Public hosting: GitHub Pages **login interface only**
- Employee information: Supabase Auth + Postgres with Row Level Security
- Product photos: Supabase Storage private \`staff-assets\` bucket with signed URLs
- Configuration: \`assets/config.js\` with only public Supabase URL and publishable key
- Secret service-role keys and employee information **never** in GitHub or browser
- Content authoring: admin account and Supabase database, never embed private data in JS assets

## Important: public repository history
This repository has historically been public and previously contained demonstration product information in tracked JavaScript. Removing those files from the deployment does not erase them from Git history. If all training source materials must be confidential, change the repository to **Private** through GitHub > Settings > General > Danger Zone. Depending on GitHub plan, Pages hosting from a private repository may require a different publishing arrangement; GitHub Pages itself remains publicly reachable, so confidentiality MUST be enforced by server-side data access rules.

## Provisioning (mandatory for working staff access)
1. Create a dedicated Supabase project with approved organization policies.
2. Apply \`supabase/schema.sql\` in the trusted SQL editor.
3. Disable public signup in Supabase Auth. Invite approved employees.
4. Set the allowed redirect URL to \`https://hamodft.github.io/tecno-sales-academy/\` and site URL accordingly.
5. Set public Supabase URL and publishable/anon key in \`assets/config.js\` (not service-role keys).
6. Activate first admin via trusted SQL Editor after first sign-in:
   \`update public.profiles set role='admin',is_employee=true,is_active=true where id='<verified-user-uuid>';\`
7. Invite and approve staff accounts with \`is_employee=true,is_active=true\`.
8. Upload approved company logo and official product renders to a **private** storage bucket; record paths in product records.
9. Enter and verify TECNO KSA-specific specs through admin panel (model/market/SKU/version), then publish them.
10. Test an anonymous user, a pending user, an employee, and an admin. Only staff should ever receive content.

**Notice:** Client-side simulation scores are training feedback, not tamper-proof employee performance evidence. Secure scoring server-side before using for HR decisions.

## Development
Run \`python3 -m http.server 8080\`, then navigate to localhost:8080.
Run \`npm run check\` for security/syntax tests.
Playwright browser tests run in GitHub Actions before deployment.

Not an official TECNO deployment until branding/content approvals are complete.
