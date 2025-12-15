# ⚠️ CODE TEMPLATE: Malí průzkumníci Website

**CODE IS MIT LICENSED, MEDIA IS RESERVED COPYRIGHT.**

This repository contains the **HTML and CSS source code** for the "Malí průzkumníci" website, shared as an open-source template for educational purposes.

## 🔴 CRITICAL NOTICE: Proprietary Media

The **MIT License** in this repository applies to the code (HTML, CSS, JavaScript) including textual content in the code files.

* **The entire `img/` folder, including the favicon, images, and video, is NOT licensed for reuse.** These media files are proprietary and must be replaced or removed when reusing the template.

**If you use this repository for your own project, replace or delete the entire `img/` directory and any logos/images, and update branding as needed.** Refer to the `NOTICE` and `LICENSE` files for details.

# Project Overview

Lightweight static website for a small Czech course/event. This repository contains the site source (HTML, CSS, JS) and documentation to deploy and connect a Google Sheets backend for form submissions.

## Quick start
- Open [index.html](index.html) in your browser to view the site locally.
- Edit styles in [style.css](style.css) and behavior in [script.js](script.js).
- IMPORTANT when reusing: replace or remove files in the `img/` directory (logo, images, video) before redistributing or publishing; these media files are proprietary and not covered by the MIT license.

## Files of interest
- [index.html](index.html) — main page
- [style.css](style.css) — styling and theme variables
- [script.js](script.js) — client-side behavior and form submission logic
- [img/](img) — images used on the site
- [doc/deployment_guide.md](doc/deployment_guide.md) — deployment notes
- [doc/google_sheets_setup.md](doc/google_sheets_setup.md) — instructions to connect the Google Apps Script web app

## Form integration
The site includes a form that can post to a Google Apps Script web app. See [doc/google_sheets_setup.md](doc/google_sheets_setup.md) for step-by-step instructions and where to paste your `GOOGLE_SCRIPT_URL` in [script.js](script.js).

## Development
- No build step required — this is a static site.
- Use any static file server (e.g., VS Code Live Server) for local dev if you need proper HTTP headers.

## License
This project uses a dual-license:
The **code** (HTML/CSS/JS) is licensed under the [MIT License](LICENSE).
All other media, branding, and unique text are protected under conventional reserved copyright.