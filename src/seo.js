// Single source of truth for page URLs, titles and descriptions.
// Used by: scripts/build-seo.js (bakes tags into HTML + sitemap),
// server.js (decides 200 vs 404, legacy redirects), and App.jsx (tab title).
//
// 1. Set SITE_URL to whichever domain ends up being the real one (no trailing slash).
// 2. Only list pages here that have real content. Anything not listed returns a 404.

export const SITE_URL = "https://freesound.us.reclaim.cloud";

// Single-page site: only the home page is real. Any other URL returns a 404.
export const pages = [
  {
    path: "/",
    title: "FreeSound Grinnell | Student Music Community at Grinnell College",
    description:
      "FreeSound is Grinnell College's student-run music community: a practice room in Main Hall, shared gear, sound training, and shows like Showvember."
  }
];

// Old WordPress paths -> new paths. Fill these in from the old site's URLs
// (check the old sitemap, Google results for site:old-domain, or the Wayback Machine).
// Keys have no trailing slash.
export const legacyRedirects = {
  // "/about-us": "/about",
  // "/events": "/projects",
  // "/contact": "/contact-us",
};
