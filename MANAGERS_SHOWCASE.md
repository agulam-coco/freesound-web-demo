# Managers Showcase — Feature Documentation

> Added: June 2026

## Overview

The **Managers Showcase** is a section on the **About page** that plays a looping sequence of short video clips featuring rotating action figures representing the FreeSound managers. The videos play one after the other automatically, with smooth fade transitions and interactive dot indicators that allow the user to jump to any manager.

---

## Video Assets

The source videos were AI-generated (Adobe Firefly) 6-second studio clips of rotating action figures on a white background. They have been copied from `/Projects/media/` into the project:

| Public path | Description |
|---|---|
| `/assets/manager-1.mp4` | Manager figure 1 |
| `/assets/manager-2.mp4` | Manager figure 2 |
| `/assets/manager-3.mp4` | Manager figure 3 |
| `/assets/manager-4.mp4` | Manager figure 4 |

**To update a video:** Replace the corresponding file in `public/assets/` with the same filename, keeping the `.mp4` format.

**To change a manager's display name:** Edit the `managers` array in `src/siteData.js`:

```js
export const managers = [
  { name: "Manager I",  video: "/assets/manager-1.mp4" },
  { name: "Manager II", video: "/assets/manager-2.mp4" },
  // ...
];
```

---

## Where It Lives in the Codebase

| File | What changed |
|---|---|
| `src/siteData.js` | Added `managers` export array |
| `src/App.jsx` | Added `ManagersShowcase` component; inserted into `AboutPage` |
| `src/styles.css` | Added `.managers-*` styles at the bottom of the file |
| `public/assets/` | Four `.mp4` video files added |

---

## Placement Decision

The section is placed **on the About page only**, between `ServicesSection` and `ContactCta`:

```
About Page:
  PageHero
  AboutBand
  ServicesSection
  ManagersShowcase   ← inserted here
  ContactCta
  Footer
```

**Why here:**
- The About page is the natural "people behind FreeSound" context
- Positioned *after* the functional/services content and *before* the call-to-action — creates a warm human moment in the narrative arc
- The surrounding sections are dark-background (`var(--dark)`), but this section uses the white site background, which is essential for the blending technique below

---

## How the White Background Blending Works

The videos have a plain white background. Rather than masking it with a greenscreen approach, we use CSS:

```css
.managers-video-frame {
  mix-blend-mode: multiply;
}
```

`mix-blend-mode: multiply` makes white pixels (`#ffffff`) render as fully transparent — white × any color = that color. Because the section itself has a white background (`var(--bg)`), the video's white areas become completely invisible, and only the coloured action figure remains visible.

**Important:** This only works when the section background is white or very light. If you ever change the background color, the blending will shift accordingly.

---

## How Sequential Playback Works

The `ManagersShowcase` React component manages this with simple state:

```
activeIndex (0–3)
  → sets the <video> src
  → onEnded fires → advances to next index (loops after last)
  → user can click a dot → switchTo(i) triggers a 320ms fade-out before swapping
```

Key behaviours:
- `autoPlay muted playsInline` — ensures autoplay on mobile without sound
- A `useEffect` on `activeIndex` calls `video.load()` then `.play()` after each switch
- The `is-fading` CSS class triggers a 320ms opacity transition before the video source changes, preventing a hard cut
- Autoplay errors are silently caught (some browsers block autoplay; videos can still be advanced manually via the dots)

---

## Styling Reference

All styles are in `src/styles.css` under the `/* ── Managers Showcase ── */` comment block near the bottom of the file.

Key classes:

| Class | Purpose |
|---|---|
| `.managers-showcase` | Outer section wrapper, white background, centered |
| `.managers-showcase::before` | Subtle warm radial glow (`#fff2f2`) for depth |
| `.managers-intro` | Heading + description block |
| `.managers-stage` | Centres the video vertically with meta below |
| `.managers-video-frame` | The video wrapper — applies `mix-blend-mode: multiply` + fade |
| `.managers-video-frame.is-fading` | Opacity 0, used during video switch |
| `.managers-name` | Large Apfel font name label below the video |
| `.managers-dots` | Row of pill/dot indicators |
| `.managers-dot` | Individual dot — animates width when active |
| `.managers-dot.active` | Expands to a red pill (accent colour) |

---

## Updating Manager Names

If the FreeSound managers change, update **only** `src/siteData.js`:

```js
export const managers = [
  { name: "Actual Name Here", video: "/assets/manager-1.mp4" },
  ...
];
```

No other files need to change.
