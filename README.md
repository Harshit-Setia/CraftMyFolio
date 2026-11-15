# CraftMyFolio

🚀 **CraftMyFolio** is a full-stack web application that lets developers and creators build, customize and host their own responsive portfolio. Sign up, fill in your details once, pick a template, and share a single link.

Portfolios are public at `/folio/:slug`, backed by secure authentication, a Redis cache for fast public reads, and privacy-friendly built-in analytics.

---

## 🌟 Key Features

- **15 portfolio templates**: switch designs any time; your content stays the same. Three of them are **multi-page** (real Home, About, Projects, Experience and Contact pages).
- **Custom public links**: choose your own slug (`/folio/your-name`) with live availability checking.
- **Dashboard**: add, edit or remove education, experience, projects, skills, social links and testimonials.
- **Analytics**: page views, unique visitors, referrers, devices and link clicks for each portfolio. No cookies, no stored IP addresses (see [Analytics](#-analytics)).
- **Secure authentication**: JWT sessions and Bcrypt password hashing.
- **Media uploads**: avatar images stored on Cloudinary.
- **Fast public pages**: portfolios are cached in Redis, and the app keeps working if Redis is unavailable.
- **Responsive UI**: Tailwind CSS v4, every template adapts from phones to wide screens.

---

## 🎨 Templates

| Template | Style | Pages |
|---|---|---|
| **Magazine** | Editorial: cover story, contents page, drop caps | Multi-page |
| **Showreel** | Bold dark layout, marquee, stacking project cards | Multi-page |
| **Desktop** | OS-style: menu bar, dock, Notes / Finder / Calendar / Mail windows | Multi-page |
| **Hero** | Dark "aurora" landing page | Single page |
| **Classic** | Refined two-column CV | Single page |
| **Timeline** | Work and education on one chronological spine | Single page |
| Industry Hazard, Bento, CyberPunk, Dev, Glass, NeoBrutual, NeoPop, Resume, Terminal | Assorted | Single page |

Multi-page templates are served from the same slug: `/folio/:slug`, `/folio/:slug/about`, `/folio/:slug/projects`, `/folio/:slug/experience` and `/folio/:slug/contact`. Pages with no data are hidden automatically.

### Adding a template

1. Create `frontend/src/folioTemplate/TemplateYourName.jsx`. It receives `{ user }` (and `basePath` for multi-page templates). Render descriptions with `BulletList` and links with `External` from `folioTemplate/multipage/shared.jsx`; dates with `formatRange` from `multipage/helpers.js`.
   - For a multi-page template, wrap `MultiPageTemplate` and supply a `Layout` and a `views` map (see `TemplateMagazine.jsx`).
   - Optional sections shared by several templates live in `folioTemplate/shared/DataSections.jsx`.
2. Add a thumbnail screenshot (about 1280×660, JPEG) to `frontend/src/assets/templates/`.
3. Register it in `frontend/src/folioTemplate/index.js`. The order of that list decides which templates appear first, and the home page shows the first 15 (`HOME_TEMPLATE_LIMIT` in `components/home/TemplateGallery.jsx`). The create page always lists them all.

Every template should handle missing data (a profile with only a name must not break) and render only the sections that have content.

---

## 📈 Analytics

Each owner sees an **Analytics** tab in the dashboard (7, 30 or 90 days): views, unique visitors, link clicks, a views chart, top pages, referrers, devices and most-clicked links.

**How it works**
- The public page sends a small request on every page view and on clicks of outbound links (matched against the owner's own links, so all templates are covered without per-template code).
- The server stores **one document per portfolio per day** with counters (`FolioStats`).

**Privacy**
- No cookies and no consent banner needed.
- IP addresses are never stored. Unique visitors are counted with a one-way hash of IP + browser + the day's date and a server secret; the hashes are deleted once the day has passed.
- Visitors who send **Do Not Track** (`DNT: 1` or `Sec-GPC: 1`) are not counted. Bots are filtered. The portfolio owner's own visits are ignored while signed in. Deleting a portfolio deletes its stats.

**Limitations**
- Unique visitors are counted per day, so a returning visitor counts again on another day.
- Days are UTC. Visitors without JavaScript, and crawlers, are not counted.
- The collection endpoint has an in-memory rate limit, which is per server instance.

---

## 🔒 Security Notes

- Signup only accepts an allowlist of profile fields (privileged fields such as `isAdmin` are ignored).
- The public portfolio API returns only the fields a portfolio displays (no date of birth, admin flag or internal ids).
- Links (`resume`, social URLs, project `github` and `deployed`) must be `http(s)` URLs when saved, and the public page strips any other scheme before rendering. This prevents `javascript:` links.
- Redis is optional: if it is down, public reads fall back to MongoDB.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Data fetching**: TanStack React Query v5
- **Icons**: Lucide React
- **Linting**: ESLint

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 5
- **Database**: MongoDB (Mongoose)
- **Cache**: Redis
- **Authentication**: JSON Web Tokens and Bcrypt
- **Uploads**: Multer and Cloudinary

### Tooling
- **Tests**: Node's built-in test runner with an in-memory MongoDB
- **CI**: GitHub Actions (frontend lint and build, backend tests)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v22 recommended (the CI uses 22)
- **MongoDB** (local or Atlas)
- **Redis** (optional; the app works without it, just without caching)
- **Cloudinary account** (for avatar uploads)

### Installation

```bash
git clone <repository_url>
cd CraftMyFolio

cd backend && npm install
cd ../frontend && npm install
```

### Environment variables

**Backend** (`backend/.env`, see `backend/.env.example`):
```env
PORT=4040
MongoDB_URI=<your MongoDB connection string>
JWT_SECRET=<a long random string>
CORS_ORIGIN=http://localhost:5173
CLOUD_NAME=<Cloudinary cloud name>
CLOUD_API_KEY=<Cloudinary API key>
CLOUD_API_SECRET=<Cloudinary API secret>
REDIS_URL=<Redis connection string, optional>
ANALYTICS_SALT=<random string, optional; falls back to JWT_SECRET>
```

**Frontend** (`frontend/.env`):
```env
VITE_BE_URL=http://localhost:4040
```

### Running locally

```bash
cd backend && npm run dev     # API on http://localhost:4040
cd frontend && npm run dev    # app on http://localhost:5173
```

In production the backend runs with `npm start`.

### Tests and checks

```bash
cd backend && npm test        # API tests (in-memory MongoDB, downloaded on first run)
cd frontend && npm run lint
cd frontend && npm run build
```

The Redis cache test is skipped automatically when no Redis is running. Set `REDIS_URL` to run it. The same checks run on every push and pull request in `.github/workflows/ci.yml`.

---

## 📁 Project Architecture

### `frontend/src/`
- `pages/` - Home, Dashboard, auth pages, CreateFolio (template picker), PublicFolioPage.
- `components/` - shared UI. `components/home/` holds the home page sections.
- `features/dashboard/` - dashboard sections, including `Analytics.jsx`.
- `folioTemplate/` - the portfolio templates.
  - `multipage/` - the multi-page framework (routing by path, preview mode, shared helpers).
  - `shared/` - section components shared by several templates.
  - `sanitize.js` - strips unsafe URLs before a template renders.
  - `index.js` - the template registry.
- `analytics/` - client-side tracking (`track.js`).
- `hooks/`, `context/` - custom hooks and the auth context.
- `assets/templates/`, `assets/home/` - template thumbnails and home page previews.

### `backend/src/`
- `controllers/` - request handling (auth, folio, analytics).
- `models/` - Mongoose schemas (User, Folio, FolioStats).
- `routes/` - Express routes.
- `middlewares/` - JWT verification and upload configuration.
- `utils/` - helpers (cache, analytics, uploads).
- `config/` - database and Redis clients.
- `test/` (in `backend/`) - API tests.

---

## 🌐 API Reference

### Account routes (mounted at the root)
- `POST /signup` - register (accepts multipart/form-data for the avatar)
- `POST /signin` - sign in, returns a JWT
- `GET /me` - current user (Protected)
- `PATCH /me` - update profile and portfolio content (Protected)
- `PATCH /me/avatar` - update avatar (Protected)

### Portfolio routes (`/folio`)
- `POST /` - create a portfolio (Protected)
- `GET /me` - own portfolio (Protected)
- `PATCH /me` - change template (Protected)
- `DELETE /me` - delete portfolio and its analytics (Protected)
- `GET /me/analytics?days=30` - stats for the last 1 to 90 days (Protected)
- `GET /check-slug/:slug` - is a slug available (Public)
- `GET /:slug` - public portfolio data (Public)
- `POST /:slug/event` - record a view or link click (Public, rate-limited, always answers `204`)

Validation errors return `400` with a message.

---

> **Note:** the backend uses ES Modules (`"type": "module"`). The frontend is a single-page app, so the host must serve `index.html` for unknown paths (`frontend/vercel.json` does this on Vercel).
