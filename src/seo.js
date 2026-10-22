// Single source of truth for page URLs, titles and descriptions.
// Used by: scripts/build-seo.js (bakes tags into HTML + sitemap),
// server.js (decides 200 vs 404, legacy redirects), and App.jsx (tab title).
//
// 1. Set SITE_URL to whichever domain ends up being the real one (no trailing slash).
// 2. Only list pages here that have real content. Anything not listed returns a 404.

export const SITE_URL = "https://freesound.us.reclaim.cloud";

export const pages = [
  {
    path: "/",
    title: "FreeSound Grinnell | Student Music Community at Grinnell College",
    description:
      "FreeSound is Grinnell College's student-run music community: a practice room in Main Hall, shared gear, sound training, and shows like Showvember."
  },
  {
    path: "/about",
    title: "About FreeSound | Grinnell College Student Music Since 1998",
    description:
      "Meet the FreeSound managers, learn the history of Grinnell's student music scene, and find out how to get trained and use the practice room."
  },
  {
    path: "/projects",
    title: "Events | FreeSound Grinnell",
    description:
      "Showvember, The Grinnellian, open jams, and the other shows and resources FreeSound runs for student musicians at Grinnell College."
  },
  {
    path: "/contact-us",
    title: "Get Involved | FreeSound Grinnell",
    description:
      "Want room access, sound training, or help with a show at Grinnell? Here's how to reach the FreeSound managers."
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
