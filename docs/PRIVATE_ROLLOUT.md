# Private Rollout — TECNO Sales Academy

## Required before real employee use
1. Make the repository Private if source history is confidential. Previous public commits are not erased by deleting current files.
2. Confirm GitHub Pages is publishing the login shell ONLY; static website assets are always publicly fetchable.
3. Connect a company-approved Supabase project using assets/config.js (publishable key only).
4. Apply supabase/schema.sql in the trusted SQL editor. Disable public signup and invite employees individually.
5. Verify RLS on catalog_products, academy_courses, academy_lessons, sales_scenarios, simulation_attempts and lesson_completions.
6. Grant is_employee=true and is_active=true only to approved staff; assign the first admin via the SQL editor.
7. Upload product photos to the private staff-assets bucket, or use the new admin product image upload form.
8. Never store employee identity, internal sales scripts, answer keys or unannounced product information in GitHub JavaScript files.

## Device reference requirements
Use official Saudi-market model code and variants for each device: display, resolution, brightness, refresh rate, chipset, memory, cameras, OIS, zoom, video, software, network, NFC, battery, charging, IP rating, dimensions, included accessories and approvals. Each FABE field needs a verifiable fact and a customer demonstration.

## Branding assets needed
Please upload an approved TECNO wordmark (transparent PNG or SVG) and authorized device renders as PNG or WebP, preferably front and back views at 1200px or better. Supply a brand style guide if available.

## Note on GitHub Pages
A login UI does not by itself protect content. Content must be fetched with a valid user token from Supabase and RLS. Repository visibility and Pages availability depend on GitHub account permissions/plan. If private repositories cannot host Pages on the plan, use a public shell from a separate repository with protected data in Supabase or an alternative static host.

## Validation
CI uses npm run check and a real Chromium mobile/desktop login flow. Back-end access roles require separate integration testing after Supabase is connected.