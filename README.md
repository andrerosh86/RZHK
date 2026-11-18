# RZHK Visual Engineering

The website is maintained in `website/index.html`, the only HTML entry point. Open it locally or serve the `website` directory with any static web server. Deploy that directory as the site root; no build step is required.

The page uses a black background, animated dotted rain, and three centered image-based service columns. Responsive WebP previews in `website/media/` reuse existing project concept renders; see `website/credits.txt` for provenance. Replace them with approved portfolio imagery when available. The original files in `assets/` remain design references. Google Fonts supplies Inter, with system-font fallbacks.

## Interactions

- Enter skips the cinematic loader. Its introduction describes the three services; the landing page includes the logo, brand tagline, and Services section.
- The particle logo responds to pointer movement and rain impacts, with subtle letter-shaped light.
- The entire rain/logo engine is copied unchanged from the live Vercel page: actual rain-head crossings, a 15 CSS-pixel contact radius, sparse independent grain impulses, free scatter followed by spring recovery, and 3–5 detached fragments that join the rain while their logo home points fade back in. Pointer interaction matches production; device-orientation-driven logo interaction was removed because it is absent from that reference. Reduced motion disables new rain impacts.
- The three centered service columns cover interactive configurators, interactive architecture, and cinematic films and animation. Previews and text actions open the existing service dialogs. Restrained hover effects respect reduced motion; keyboard focus is visible. Columns stack on mobile with horizontal separators.
- Left/Right arrows and Home/End move between service controls; Enter opens the selected service. About opens the introduction.
- Service details close with Escape, the close button, or the backdrop.
- Resizing preserves the logo formation with a single logo animation loop.

`website/services.css` contains the responsive Services layout, page flow, focus states, and preview motion. The collision and particle animation code remains in the HTML. Its reference is the code served by `https://rzhk.vercel.app/`, recovered on 16 November 2026 from deployment `dpl_FyXKZES1aTpfyQqhwJoUGU6fDAio` (created 6 September 2026 at 09:35:55 UTC). Vercel exposes no Git SHA for that deployment. None of the five `website/index.html` revisions on the published `main` and `codex/site-polish` histories contains its `collideRainWithLogo` implementation. The full animation block is preserved verbatim, and `verify-site.cjs` pins its normalized SHA-256 to prevent accidental retuning. Updated services, intro copy, and the lower hero layout remain separate from that engine.

Portfolio, contact and social links are omitted until real destinations are supplied.

## Verification

Run `node verify-site.cjs` to check script syntax, loader completion, animation restarts, swept rain collisions, fragment handoff, spring recovery and the single HTML entry point. These checks do not replace browser or real-device testing.

The documents in `documentation/` include original design references; descriptions of photographic backgrounds and older timing targets are historical.

