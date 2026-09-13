# Aqeela's Portfolio Website

## Overview
A personal portfolio website for Aqeela Kurniawan, an 18-year-old undergraduate Computer Science student at BINUS University. The site showcases skills, projects, educational journey, experience, and contact information with a Nintendo-style aesthetic and Minecraft-inspired typography.

## Recent Changes
- 2026-04-06: **MAJOR**: Converted entire project from React/TypeScript to plain HTML/CSS/JavaScript. Single `index.html` file contains all markup, styles, and scripts. All assets copied to `public/`. Old React/TS source files in `src/` are unused.
- 2026-02-23: HexagonDecor mobile: merges left/right panels into single full-width honeycomb background on screens < 768px
- 2026-02-23: Experience: Juliet Music and Art Center logo now has rounded-xl corners
- 2026-02-22: Added HexagonDecor component (honeycomb grid hexagons on left/right sides, disintegrate on scroll)
- 2026-02-22: LIMBO easter egg: removed "LIMBO // GEOMETRY DASH" label and X close button; correct key now refreshes page; no way to escape without completing the task
- 2026-02-13: Page now scrolls to top on reload (window.history.scrollRestoration = 'manual')
- 2026-02-13: Skills: Coding languages show percentage progress bars with "Knownable Language" heading
- 2026-02-13: Education/Experience: center-line timeline layout, alternating left/right cards (mobile: left-aligned)
- 2026-02-13: Dynamic copyright year; Ko-fi logo on support button; footer emoji centered under Ko-fi
- 2026-02-10: BINUS University text color is yellow (#f0c020)
- 2026-02-10: AK logo: dark mode = white AK on orange box, light mode = orange text
- 2026-02-10: Footer emoji: 1/15 chance to show Pepe emoji instead of fox
- 2026-02-10: Copy actions show green popup toast with fox emoji

## Project Architecture
- **Type**: Static frontend-only — plain HTML/CSS/JavaScript (NO React, NO TypeScript)
- **Entry point**: `index.html` (root) — single self-contained file with all CSS and JS inline
- **Assets**: All images/logos in `public/` folder, referenced as `/filename.ext`
- **Dev server**: Vite (serves `index.html` statically, no bundling needed)
- **Fonts**: Space Grotesk + Inter from Google Fonts CDN; Monocraft from jsDelivr CDN
- **Build**: No build step needed — `index.html` is served directly

## File Structure
```
index.html         - ENTIRE SITE: all HTML, CSS (in <style>), and JS (in <script>)
public/
  *.jpeg/jpg/png   - All images, logos, emojis (copied from old src/assets/)
  fox-emoji.png    - Default footer emoji
  pepe-emoji.png   - Rare (1/15) footer emoji
  red-key.png      - LIMBO easter egg key (light mode)
  limbo-key-dark.png - LIMBO easter egg key (dark mode)
  fox-copy-emoji.png - Toast notification emoji
  wave-emoji.png   - Hero section wave emoji
  slide-1..5.jpeg  - Hero photo carousel slides
  kofi-logo.png    - Ko-fi button logo
  binus-logo.png   - BINUS University education card logo
  jhs190-logo.png  - JHS190 education card logo
  unity-logo.png   - Unity School education card logo
  juliet-logo.png  - Juliet Music & Art Center experience logo
  clipchamp-logo.png - Video editor experience logo
  capcut-logo.png  - Video editor experience logo
  nipponclub-logo.png - Nippon Club experience logo
  skill-*.jpg/png  - Skill card background images
src/               - OLD React/TypeScript source (UNUSED — kept for reference only)
```

## Features (all in vanilla JS)
- Light/dark mode toggle (localStorage, class on `<html>`)
- Scroll-based hexagon disintegration animation (SVG, left+right panels or full-width mobile)
- Cursor-tracking gradient glow
- Photo carousel with auto-advance (3.5s) and dot navigation
- Coding skills progress bars (animate on IntersectionObserver)
- GitHub public repo count fetch (api.github.com)
- Section scroll-reveal animations (IntersectionObserver)
- Copy to clipboard with green toast + fox emoji
- LIMBO easter egg: 1/50 chance, Windows-style key shuffle minigame, no escape, BSOD on wrong pick
- Footer emoji: 1/15 chance for Pepe, otherwise fox
- Dynamic copyright year

## Easter Eggs
- LIMBO key shuffle: 1/50 chance to appear, Windows-style key windows, no close button (must complete), correct pick refreshes page, wrong pick triggers BSOD crash
- Footer emoji: 1/15 chance to show Pepe emoji instead of fox (centered under Ko-fi button)

## User Preferences
- Portfolio website style with Nintendo/Minecraft aesthetic touches
- Light/dark mode support
- Custom character emojis preferred over standard emojis
- Loves easter eggs
- Scroll-based animations on sections
- Experience ordered chronologically (Piano 2019, Video Editor 2022, Nippon Club 2025)
- BINUS University text must be yellow (#f0c020)
- AK. logo: light mode = orange text, dark mode = white text on orange background

## Deployment
- Static site deployment
- No build step needed — `index.html` is served directly by Vite dev server
- For production: any static host can serve `index.html` + `public/` folder
