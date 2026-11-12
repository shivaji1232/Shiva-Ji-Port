# Arjit Mishra — Think Beyond. Create Beyond.

A responsive personal portfolio with interactive Three.js scenes, accessible navigation, and reduced-motion/static fallbacks. Personal details that were not supplied remain editable prompts rather than invented claims.

## Run locally

No local package installation is required. Three.js is loaded from a version-pinned jsDelivr URL, so an internet connection is needed for the WebGL scenes. Serve this folder over HTTP (ES modules do not run reliably from `file://`):

```powershell
cd arjit-portfolio
python -m http.server 8000
```

Open `http://localhost:8000`. Stop the local server with `Ctrl+C`. If Python is unavailable, use any static file server or VS Code Live Server.

## Edit the portfolio

- **Name, introduction, headings, education, and journey:** update the corresponding content in `index.html`.
- **Email and social profiles:** replace the `ADD ...` prompts in the contact section with real links.
- **Projects:** replace each editable project prompt, add screenshots under `assets/images/`, and use real demo and repository URLs.
- **Services and skills:** edit the relevant text and tags in `index.html`; proficiency levels are intentionally omitted.
- **Visual direction:** the charcoal, warm-neutral, and bronze palette is defined by the custom properties at the top of `css/style.css`.
- **3D objects, lighting, particles, and motion:** edit `js/scene.js`. The hero uses a bronze torus-knot sculpture; the universe uses a small connected sculptural composition.
- **Navigation, reveals, pointer effects, and form validation:** edit `js/animations.js`. The form validates in the browser only; connect a backend or email service before enabling message delivery.
- **Animated role labels:** edit the `roles` list in `js/animations.js`.

## Libraries and fallbacks

Three.js `0.170.0` is imported from jsDelivr in `js/scene.js`. If WebGL or the CDN is unavailable, the page logs a warning and keeps a styled static scene in place. Small screens use fewer particles and a capped pixel ratio. `prefers-reduced-motion` disables continuous scene and pointer-driven animations.

## Deploy

This is a static site and can be deployed as-is. On GitHub Pages, publish this folder from a dedicated repository or a Pages workflow artifact. On Netlify, use this folder as the publish directory. For a custom domain, add it in the hosting provider's domain settings and configure the DNS records supplied by that host.
