# Wall Planner Calendar

This project is a React + Vite calendar app styled like a modern wall planner.  
It includes:

- month navigation
- date range selection
- monthly notes with headline list + detail popup
- image upload per month
- animated background color control
- dark mode
- local storage persistence

## Why This Structure

The code is split into small reusable parts instead of putting everything in one file.

- `src/components/`
  Reusable UI pieces like the calendar header, notes panel, toolbar, and buttons.
- `src/hooks/`
  Shared state logic such as local storage and calendar behavior.
- `src/utils/`
  Helper functions for date formatting, month generation, and class name merging.
- `src/data/`
  Static content like the default hero images.

This makes the project easier to read, update, and debug.

## Packages Used And Why

### Core

- `react`
  Used to build the UI with reusable components.
- `react-dom`
  Renders the React app in the browser.
- `vite`
  Fast dev server and build tool for local development and production builds.

### Styling

- `tailwindcss`
  Used for utility-first styling and quick responsive layout work.
- `@tailwindcss/vite`
  Tailwind integration for the Vite setup.
- `hover.css`
  Adds small hover effects without writing every interaction from scratch.
- `animate.css`
  Adds ready-made entry animations for a polished feel.

### Motion / Visual Effects

- `granim`
  Used for the animated gradient background.

The month and year heading animation is handled with lightweight local React markup and CSS, so there is no extra animation package tied to old React versions.

### Linting / Dev Tools

- `eslint`
  Checks code quality.
- `@eslint/js`
  Base ESLint config.
- `eslint-plugin-react-hooks`
  Validates React Hooks usage.
- `eslint-plugin-react-refresh`
  Helps with Vite + React refresh rules.
- `globals`
  Provides browser global variable definitions for linting.

## How To Run Locally

### 1. Go to the project folder

```bash
cd calender
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the local development server

You can use either of these:

```bash
npm start
```

or

```bash
npm run dev
```

### 4. Open in browser

Vite will show a local URL, usually:

```bash
http://localhost:5173
```

## Other Useful Commands

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run lint checks

```bash
npm run lint
```

## Deploy On Vercel

### 1. Push the project to GitHub

Make sure your latest code is committed and pushed to your repo.

### 2. Import the repo into Vercel

- Open Vercel
- Click `Add New Project`
- Import your GitHub repository

### 3. Use these project settings

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

### 4. Deploy

Vercel should detect the app correctly and build it as a static frontend.

## Vercel Notes

- No environment variables are required for this project.
- Local storage is used in the browser for notes, theme state, and uploaded images.
- The React-incompatible `moving-letters` dependency was removed so Vercel installs can complete normally.

## Main Design Choices

- The layout uses a two-part wall calendar feel:
  hero image on one side and calendar sheet on the other.
- The notes section only shows short headlines in the normal view so the UI stays clean.
- Full note details open in a popup to avoid clutter.
- Local storage is used so month notes, selected ranges, theme choices, and uploaded images stay available after refresh.
- Dark mode is separate from the light theme slider so the darker version stays visually stable.

## Notes

- Uploaded images are stored in local storage, so extremely large images may hit browser storage limits.
- The project is written in JavaScript.
