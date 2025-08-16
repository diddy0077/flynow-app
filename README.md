# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<----COLOR PALETTE---->
✅ Main Colors for Your Flight Search Project
Role	Color Name	Tailwind Class
Primary Brand Color	Indigo (strong, professional)	indigo-600
Accent Color	Sky Blue (modern, friendly)	sky-500
Background	Light Gray (clean layout)	gray-50
Surface / Cards	White (classic card background)	white
Main Text	Slate Dark (readable, clean)	slate-800
Secondary Text	Slate Medium (subtext, labels)	slate-600
Success Highlights	Emerald (for payment success, booking confirmed)	emerald-500
Error / Alerts	Rose (for errors or warnings)	rose-500

🎯 Where to Use Each
indigo-600 — Header, buttons, icons, price highlights, CTA sections

sky-500 — Secondary buttons, badge highlights, hover accents

gray-50 — Body background across all pages

white — Search form, result cards, modals

slate-800 — Main text (flight names, labels, prices)

slate-600 — Descriptions, subtitles, date/time

emerald-500 — Payment success message, status badges

rose-500 — Validation errors, unavailable flight alerts

<---Main color Selection-->

| Section              | Background         | Text               | Buttons/Highlights    |
| -------------------- | ------------------ | ------------------ | --------------------- |
| Navbar               | `bg-indigo-600`    | `text-white`       | `hover:bg-indigo-700` |
| Hero / Header        | `bg-gray-100`      | `text-slate-800`   | `bg-indigo-600`       |
| Search Results       | `bg-white` (cards) | `text-slate-800`   | `bg-amber-400`        |
| Booking Form         | `bg-gray-100`      | `text-slate-800`   | `bg-indigo-600`       |
| Payment Success Page | `bg-white`         | `text-emerald-500` | -                     |
| Footer               | `bg-indigo-600`    | `text-white`       | -                     |
