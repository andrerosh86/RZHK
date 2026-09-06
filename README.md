# RZHK Visual Engineering

The website is maintained in `website/index.html`, the only HTML entry point. Open it locally or serve the `website` directory with any static web server. Deploy that directory as the site root; no build step is required.

The page uses a black background without photographs. The original files in `assets/` are retained as design references and are not loaded by the page. Google Fonts supplies Inter, with system-font fallbacks.

## Interactions

- Enter skips the cinematic loader.
- The particle logo responds to the mouse and supported mobile orientation input after the first touch grants permission.
- About opens the introduction. Services and Explore Services open the mobile drawer or the first service detail on desktop.
- Service details close with Escape, the close button, or the backdrop.
- Resizing restarts the logo with a single animation loop.

Portfolio, contact and social links are omitted until real destinations are supplied.

## Verification

Run `node verify-site.cjs` to check script syntax, loader completion, animation restarts and the single-file entry point. These checks do not replace browser or real-device testing.

The documents in `documentation/` include original design references; descriptions of photographic backgrounds and older timing targets are historical.

