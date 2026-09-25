# Site audit — 25 September 2026

## Findings and changes

The original cinematic intro and subsequent stagger delayed the useful interface by roughly 8–10 seconds. The intro is retained at the owner's request: the original blur-in, hold and blur-out character is recreated with a small CSS text layer over 4.6 seconds. Skip, Enter/Escape and an INTRO replay control are available. Navigation appears directly afterwards, without the extra post-intro stagger. The line is an intro timeline, not a network-loading indicator. Reduced motion or session pause bypasses the intro.

The desktop service strip overlapped the statement and primary action on short screens. The stage now reserves separate vertical space for the hero and service strip, with a shared service catalogue on mobile and short landscape screens. Browser checks cover 1440×900, 1280×720, 1024×600, 390×844, 320×568 and 844×390.

Typography remains Inter, with a consistent 400-weight reading style, restrained uppercase labels and less tracking in titles. Small descriptions are more readable. One local variable WOFF2 replaces the Google Fonts dependency. The official Inter font was subsetted from 352,240 to 147,156 bytes, retaining Latin, Cyrillic, punctuation and arrows. The SIL Open Font License is included. System fallback remains available.

The former Technical Direction and Visual Engineering descriptions overlapped. Five defined services now explain approach, deliverables and process. All five have an original AI-generated concept image, explicitly labelled as an illustrative example rather than client work. These are still images, not simulated video deliverables.

Each image has 640 and 1280 px WebP variants. Small variants are 21–39 KB; large variants are 72–127 KB. No portfolio image is requested on initial home-page load. Images have intrinsic dimensions and responsive source selection.

Motion remains part of the identity: cinematic intro, particle formation, pointer response, animated card accents, dialog entry and service transitions. Falling dots randomly push nearby logo particles, which spring back into place. A 24px spatial index avoids all-pairs collision checks; only one candidate per stream is checked at the rain's 30Hz cadence, with bounds rejection and global/per-stream cooldowns. Projection and pulse position are calculated once per stream. A session-persistent pause control and reduced-motion preference are respected. Canvas and parallax callbacks stop during the intro, when a dialog opens or the tab becomes hidden. The previous automatic mobile orientation permission request and its extra animation loops have been removed.

Dialogs now trap keyboard focus correctly across multiple controls, support Escape/backdrop closing, make the background inert, restore the original trigger and hide closed controls from keyboard access. The page includes an accessible primary heading, description metadata and a no-JavaScript explanation.

## Laboratory performance comparison

Local Chrome, 1440×900, cold browser cache, 150 ms simulated network latency, 200,000 bytes/sec download, 4× CPU slowdown. Same browser and conditions, original HTML versus final implementation with the restored intro; one comparison run. Original source is commit `d55b90bd523bc13e732eafd34186cf6d04420bbc`. Raw local results are in ignored `audit/performance.json`.

| Measurement | Original | Updated |
| --- | ---: | ---: |
| Largest Contentful Paint | 8,632 ms | 1,368 ms |
| First Contentful Paint | 664 ms | 828 ms |
| Explore Services fully opaque, intro gone (DOM observation) | 9,525 ms | 5,500 ms |
| Layout shift score | <0.000001 | 0.000139 |
| Portfolio images on initial page | 0 | 0 |

First paint includes the intro, so FCP alone does not describe usability. The updated LCP also includes intro text; it must not be presented as the time the main site becomes usable. The DOM readiness observation explicitly waits for the intro to disappear. The intended 4.6-second cinematic sequence can be skipped. The earlier 828ms LCP result applied to an intermediate version without the intro and is superseded. LCP does not capture canvas logo completion. These are local laboratory measurements, not a Lighthouse score, production Core Web Vitals or a promise about real devices and hosting. Production transfer compression, CDN caching, real mobile GPUs and Safari were not measured.

In separate one-second observation windows, the updated page executed **zero animation-frame callbacks while motion was paused**, and **zero while the services dialog was open**.

## Verification

- `node verify-site.cjs`: passes. Script syntax, five content records and ten image assets, single logo animation on repeated starts, resize scaling, displaced particle drawing, parallax alignment and rain handoff geometry.
- `node verify-browser.cjs`: passes in installed Chrome. All five services and images, next/back, focus loop and restoration, About, pause persistence, reduced motion, no-JavaScript fallback and six viewport sizes. No runtime errors, failed page resources, horizontal overflow or hero/strip overlap in those runs.
- `node verify-effects.cjs`: automatic intro completion, no background callbacks during the intro, natural rain impacts without pointer interaction, replay, Enter/Escape skip, focus restoration and pause all pass. One observed desktop run affected 32 of 1,667 logo particles naturally.
- Desktop and mobile screenshots inspected, including the service detail layout and restored intro.
- Dependency lock generated; npm reported zero known vulnerabilities for the development dependencies at installation.

The screenshot test results include cached post-reload timings and are functional diagnostics; use the separate cold-cache performance comparison above for speed figures.

## Remaining content decisions

The site retains English. Replace the five concept projects with genuine work using `CONTENT_GUIDE.md`. Verify the proposed service scope against the work actually offered. No real email, contact endpoint or social destination was present in the repository, so none has been invented. The update does not introduce a backend or claim to submit enquiries.
