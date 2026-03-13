# Cypress-check (React + TypeScript + Vite)

A small React + TypeScript app bootstrapped with Vite and configured to run Cypress end-to-end tests. It includes a basic data-entry form with validation and submission tracking.

---

## ✅ Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app (development)

```bash
npm run dev
```

Open your browser at: http://localhost:5173


## 🧱 Project Scripts

| Script | Description |
|-------|-------------|
| `npm run dev` | Start Vite dev server (hot reload) |
| `npm run build` | Build production assets (`dist/`) |
| `npm run preview` | Preview built production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run cypress:open` | Open Cypress UI to run E2E tests interactively |
| `npm run cypress:run` | Run Cypress E2E tests in headless mode |


## 🧪 Cypress E2E Tests

Cypress tests are located in `cypress/e2e/`.

- `data-entry.cy.ts` exercises the data entry form, validates form errors, and confirms submission results.

Run the full suite:

```bash
npm run cypress:run
```

Or open interactive Cypress UI:

```bash
npm run cypress:open
```


## 📁 Project Structure

```
├─ src/
│  ├─ components/
│  │  ├─ Dashboard.tsx       # Main form + submissions table
│  │  └─ ...
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ assets/
├─ cypress/
│  ├─ e2e/                  # Cypress spec files
│  ├─ fixtures/             # Test fixtures (images, data)
│  ├─ screenshots/
│  └─ downloads/
├─ public/                  # Static assets
├─ vite.config.ts
├─ tsconfig.app.json
└─ eslint.config.js
```


## 🛠 Key Implementation Notes

- Form validation is handled in `src/components/Dashboard.tsx`.
- Submissions are stored in component state and shown in a table.
- Image uploads are previewed in the form and the filename is recorded.


## ✅ Recommended Next Steps

If you want to extend this project, consider:

- Persisting submissions to local storage or backend API
- Adding edit / delete functionality for submissions
- Adding full form libraries (React Hook Form, Zod) for advanced validation

---

If you want a shorter README or one targeted for a specific audience (e.g., contributor vs user), just say so and I can tailor it.
