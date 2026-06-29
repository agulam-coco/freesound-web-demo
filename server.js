// Production server for Reclaim Cloud (or any Node.js host).
//
// What this does:
//   1. Serves the static files Vite builds into ./dist
//   2. Falls back to dist/index.html for any route that isn't a real file,
//      so client-side routes like /about, /projects/:slug, /journal/:slug,
//      and /contact-us keep working on a hard refresh or direct link.
//   3. Listens on 0.0.0.0 (not 127.0.0.1/localhost) so the platform's
//      reverse proxy can actually reach it, on a single fixed port.
//
// On Reclaim Cloud: pick one internal port here (PORT below), then in the
// dashboard add an Endpoint for your Node.js node pointing at that same
// port number. Reclaim maps that to a public port/URL for you.

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const DIST_DIR = path.join(__dirname, "dist");

// Serve every built static file (JS/CSS bundles, the public/assets copies
// like images, the manager .mp4 clips, the logo svg) as-is.
app.use(
    express.static(DIST_DIR, {
        index: false, // don't auto-serve index.html here; the fallback below handles it
    })
);

// SPA fallback: anything else that didn't match a real static file gets
// index.html, and React's client-side router takes over from there.
app.get("*", (req, res) => {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT, HOST, () => {
    console.log(`FreeSound server listening on http://${HOST}:${PORT}`);
});