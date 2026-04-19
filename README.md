# Field Checklists — Production App

Mobile-first PWA for project managers. Works on any phone browser, installs to home screen like a native app. Loads live jobs from JobNimbus and posts completed checklists as notes.

## Trades Covered
- Roofing (steep)
- Roofing (flat)
- Siding
- Gutters
- Painting
- Windows (retrofit)
- Doors (retrofit)
- Carpentry (exterior trim, rot repair, interior finish)
- Sheet Metal (fascia/soffit, custom flashing, coping caps, standing seam, chimney caps)
- Ice & Snow Removal

## Checklist Stages (from Production Workbook)
1. Pre-Construction Checklist
2. Closed Won Checklist (PDM)
3. Work Order Pre Con Done (PDM)
4. Work Order Scheduled (PDM)
5. Work Order Start Up
6. Work Order In Progress
7. Work Order Closeout
8. Work Order Completed (PDM)
9. Trade-specific inspection checklists (per job trade)

## Deploy to Vercel via GitHub

### 1. Create GitHub repo
```bash
git init
git add .
git commit -m "Initial commit — field checklist app"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/field-checklists.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework preset: **Other** (static site)
4. Root directory: `/` (default)
5. Click Deploy

Vercel auto-deploys on every push to `main`.

### 3. Add PWA icons (optional but recommended)
Add two PNG files:
- `icon-192.png` — 192×192px app icon
- `icon-512.png` — 512×512px app icon

Use your company logo. Vercel will serve them automatically.

## How PMs Use It

### First time setup
1. Open the app URL on their phone
2. Tap Share → "Add to Home Screen" (iPhone) or "Install App" (Android)
3. Open the app → tap ⚙️ Settings
4. Enter the JobNimbus API key and their name
5. Tap "Save & Connect"

### Daily use
1. Open the app from home screen
2. Search for or tap their active job
3. Select the production stage
4. Check off items as completed (tap each row)
5. Add photos with 📷 on any item (opens camera)
6. Tap "Save & Post to JobNimbus" — posts a formatted note to the job record

## JobNimbus Integration

### Trade detection via custom fields
The app reads custom field checkboxes from each JobNimbus job to determine which trade inspection checklists to show. Your custom field names should contain keywords like:
- `roofing` or `roof`
- `flat roof` or `low slope`
- `siding`
- `gutters`
- `painting`
- `windows`
- `doors`
- `carpentry` or `trim`
- `sheet metal` or `metal`
- `ice` or `snow`

### What gets posted to JobNimbus
When a PM completes a stage and taps Save, the app POSTs a private note to the job record containing:
- Stage name, job name/ID, trade(s)
- PM name, company, timestamp
- Every checklist item with [x] or [ ] status
- Photo count (photos stored locally on device)

## Files
```
index.html      — Full app (single file, no dependencies)
manifest.json   — PWA manifest (installable to home screen)
sw.js           — Service worker (offline support)
vercel.json     — Vercel headers config
README.md       — This file
```

## Updating Checklist Items
All checklist content is in `index.html` in two JavaScript objects:
- `STAGES` — the 8 universal production stages (all trades)
- `TRADE_INSPECTIONS` — trade-specific inspection items

Edit item text directly and push to GitHub. Vercel auto-deploys in ~30 seconds.
