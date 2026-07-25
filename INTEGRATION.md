# RBX SourceMap — Navigation Sidebar Integration Guide

This file explains how to integrate the new React+TypeScript navigation components and adapters into your existing project and how to publish the UI using the simpler `gh-pages` approach.

Files added on branch `feature/nav-sidebar`

- src/new_ui/components/Navbar.tsx
- src/new_ui/components/Sidebar.tsx
- src/new_ui/adapters/NavbarAdapter.tsx
- src/new_ui/adapters/SidebarAdapter.tsx
- src/new_ui/AppLayout.tsx
- src/new_ui/styles/layout.module.css

Overview

- The adapters are intentionally non-invasive:
  - If you pass your legacy component (LegacyNavbar / LegacySidebar) into the adapter, the adapter will render your legacy component and translate the new props into the legacy prop shape.
  - If you don't pass a legacy component, the adapter falls back to the new built-in component.

Adapter usage (example)

In a top-level layout file (or wherever you render the site chrome):

```tsx
import React from 'react';
import AppLayout from './src/new_ui/AppLayout';
import LegacyNavbar from 'path/to/legacy/Navbar';
import LegacySidebar from 'path/to/legacy/Sidebar';

export default function Root() {
  return (
    <AppLayout LegacyNavbar={LegacyNavbar} LegacySidebar={LegacySidebar} />
  );
}
```

This lets you keep your existing Navbar and Sidebar implementations while gaining access to the new layout and optional new components.

How to publish using gh-pages (simpler approach)

1) Install gh-pages as a dev dependency in the package that builds the UI (root or the frontend package):

```bash
npm install --save-dev gh-pages
```

2) Add scripts to your package.json (in the package that contains your frontend build):

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Notes:
- Replace `dist` with your actual build output directory if it's different (e.g., `build`, `public`).
- If your frontend lives in a subpackage (monorepo), run the install and add the scripts inside that package's package.json.

3) Build and publish:

```bash
npm run deploy
```

This will run the `predeploy` (build) script and then publish the contents of the `dist` directory to the `gh-pages` branch which GitHub Pages can serve.

Optional: Automated publish via GitHub Actions

If you later want automation, you can add a workflow to run `npm ci && npm run build && npx gh-pages -d dist` on push to a branch.

Integration tips

- CSS modules: the new components use a CSS module at `src/new_ui/styles/layout.module.css`. If your project build supports CSS modules, they will scope automatically. If not, you can copy the stylesheet content into your existing style system and rename selectors as needed (prefix with `.rbx-` if you want to avoid conflicts).

- Legacy prop shapes: the adapters include simple mapping logic. If your legacy components expect different prop names, update the adapter mapping in `src/new_ui/adapters/*Adapter.tsx` to match.

- Progressive rollout: mount the new AppLayout behind a feature flag or mount only on a route where it won't interfere with the rest of the site.

Support

If you want, I can now:

- Push the adapters and components (done on `feature/nav-sidebar`) — already added in this branch.
- Open a PR from `feature/nav-sidebar` into `main` with a summary and integration checklist.
- Add a CI workflow that runs the build and optionally the gh-pages publish.

Tell me which of the above you'd like next (open PR, add workflow, or manual instructions only).