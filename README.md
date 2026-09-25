# RZHK Visual Engineering

The website is maintained in `website/`. Deploy that directory as the site root; no production dependencies or build step are required. The root Vercel configuration already points to it.

The home page retains the black stage and particle logo. Responsive WebP previews load only when opening services. These are labelled AI-generated concepts, not client projects. Inter is self-hosted with Latin and Cyrillic support; its license is in `website/fonts/`. Original files in `assets/` are retained as design references and are not loaded by the page.

## Interactions

- The cinematic text intro is retained (4.6 seconds), with Skip, Enter/Escape and an INTRO replay button. It uses CSS instead of full-screen canvas redraws. Navigation appears immediately after it ends, without the old extra stagger delay.
- Services and Explore Services open a shared catalogue on all screen sizes.
- Each service includes an example, approach, deliverables, process and next/back navigation.
- Dialogs close with Escape, the close button or the backdrop, and restore keyboard focus.
- Pause motion persists for the session. Reduced motion defaults to a static logo.
- Background animation stops while a dialog or another browser tab is active. No orientation permissions are requested.
- Falling rain dots randomly disturb nearby logo particles, which spring back into place. Spatial indexing and a per-impact cooldown limit collision work. Background animation also stops during the intro.
- After the intro, the original slow logo reveal is retained: particles drift into place with 0–2.4s stagger and 3–5s formation durations. Rain impacts begin after the 7.4s formation window; navigation is available throughout.

No contact or social destinations have been invented. Edit `website/services.js` to replace content and project metadata. See [the content guide](documentation/CONTENT_GUIDE.md) and [the audit](documentation/SITE_AUDIT.md).

## Verification

Run `node verify-site.cjs` for script, particle geometry and asset checks. For browser tests:

```sh
python -m http.server 4173
# In another terminal:
npm ci
npx playwright install chromium
npm run test:browser
node verify-effects.cjs
```

Open `http://localhost:4173/website/`. The tests cover six viewports, five services, images, focus, motion, no-JavaScript fallback and overflow. Set `SITE_URL` for another server or `BROWSER_PATH` to use installed Chrome. Screenshots and results are saved to ignored `audit/`.

`website/details.js` contains dialog navigation; `website/polish.css` contains responsive refinements over the original stage styles. No JavaScript framework is required.

The documents in `documentation/` include original design references; descriptions of photographic backgrounds and older timing targets are historical.

