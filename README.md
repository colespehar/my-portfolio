# cole.dev

Personal portfolio — React 19 + Vite, styled with Bootstrap 5.

## Getting started

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # production build to dist/
npm run preview  # serve the built output
npm run lint
```

## Contact form (Formspree)

The contact form posts to [Formspree](https://formspree.io). It needs a form
ID to work:

1. Create a form at <https://formspree.io> and point it at your inbox.
2. Copy the ID out of the endpoint it gives you —
   `https://formspree.io/f/xyzabcd` → `xyzabcd`.
3. `cp .env.example .env` and set `VITE_FORMSPREE_ID=xyzabcd`.
4. Set the same variable in your host's environment (Vercel → Project
   Settings → Environment Variables). Vite inlines `VITE_*` at **build**
   time, so the value must be present when the site is built, and changing
   it requires a redeploy.

If the variable is unset the form is replaced by a plain `mailto:` link, so
messages are never silently dropped.

Note that `VITE_*` variables are compiled into the client bundle and are
public. A Formspree ID is fine there — it ships in the page HTML by design —
but never expose a real secret this way.

## Layout

```
src/
  components/   Navbar, Hero, project card + modal, error boundary
  sections/     About, Projects, Contact (lazy-loaded)
  data/         projects.js — the project list
  styles/       global.css
  assets/       images (WebP) and Lottie animations
public/media/   project demo videos
```

## Notes

- The three page sections are `React.lazy`-loaded behind an error boundary,
  so a failed chunk fetch degrades to a retry prompt rather than a blank page.
- The Lottie player (~306KB) is deliberately kept out of the eager bundle via
  a dynamic import in `Hero`. Do not add `lottie-react` to `manualChunks` in
  `vite.config.js` — that would pull it back onto the critical path.
- Project images are WebP. `projects.js` entries with `media.type: "video"`
  must point `preview`/`modal` at an actual video file; the card falls back
  to the poster image otherwise.
