# Foster Setor — Developer Portfolio

> **Live Site:** [fostersetor.dev](https://fostersetor.dev) &nbsp;·&nbsp; Built with React + Vite &nbsp;·&nbsp; Deployed on Vercel

---

## Overview

A professional dark-editorial portfolio website for **Foster Setor** — Software Developer & DevOps Engineer. Built from scratch as a single-page React application with smooth scroll animations, inline SVG tech logos, and a fully responsive layout.

---

## Features

- **Dark Editorial Design** — Deep charcoal canvas, warm off-white typography, amber gold accents
- **Animated Hero Section** — Gradient name reveal, floating profile photo, live availability badge
- **Filterable Projects** — Filter by Frontend, Backend, DevOps, Security categories
- **Animated Skill Bars** — Scroll-triggered progress bars for SE & DevOps skills
- **Tools & Technologies** — 36 inline SVG logos across 6 categories (zero CDN dependencies)
- **Cloud Engineer Portfolio** — Dedicated section for AWS, DevOps & infrastructure work
- **Contact Form** — Fully functional message form with success state
- **Scroll Animations** — IntersectionObserver-powered fade-up reveals throughout
- **Fully Responsive** — Mobile, tablet, and desktop optimized
- **Noise Texture Overlay** — Subtle grain effect for depth and atmosphere
- **Zero External Dependencies** — No UI libraries, pure React + inline styles

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Inline styles + CSS variables |
| Fonts | Cormorant Garamond · DM Sans · DM Mono (Google Fonts) |
| Animations | CSS keyframes + IntersectionObserver |
| Deployment | Vercel |
| Domain | fostersetor.dev |

---

## Project Structure

```
foster-portfolio/
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx          # Main portfolio component (all sections)
│   └── main.jsx         # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Name, title, bio, social links, availability badge, stats |
| 2 | **About** | Skill bars for Software Engineering & DevOps |
| 3 | **Projects** | 6 featured projects with filter tabs |
| 4 | **Tools & Stack** | 36 tech logos across 6 categories |
| 5 | **Cloud Portfolio** | AWS, Terraform, CI/CD, Docker, Security, Monitoring |
| 6 | **Contact** | Social links + message form |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node -v   # v18 or higher
npm -v    # v9 or higher
git -v    # any version
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/FosterSetor9060/foster-portfolio.git
cd foster-portfolio
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open in browser**
```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

This generates a `dist/` folder ready for deployment.

**Preview the production build locally:**
```bash
npm run preview
```

---

## Deployment on Vercel

### Option 1 — Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your site will be live in under 60 seconds.

### Option 2 — GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your `foster-portfolio` repository
4. Click **Deploy** — done!

### Custom Domain

After deploying to Vercel:

1. Go to your project **Settings → Domains**
2. Add `fostersetor.dev`
3. Update your DNS records at your registrar (Namecheap / Porkbun)
4. Vercel handles SSL automatically ✅

---

## Customization

### Update Personal Info

All content is stored as constants at the top of `src/App.jsx`:

```js
// Edit your projects
const PROJECTS = [ ... ]

// Edit your skill percentages
const SKILLS_SE = [ ... ]
const SKILLS_DEVOPS = [ ... ]

// Edit cloud portfolio cards
const CLOUD = [ ... ]

// Edit tools & logos
const TOOLS = [ ... ]
```

### Update Profile Photo

Replace the image URL in the Hero section:

```jsx
<img
  src="YOUR_IMAGE_URL_HERE"
  alt="Foster Setor"
/>
```

Recommended hosts: [postimg.cc](https://postimg.cc) · [Cloudinary](https://cloudinary.com)

### Update Color Scheme

All colors are CSS variables in the `<style>` block:

```css
:root {
  --bg: #0d0f14;          /* Page background */
  --surface: #13161d;     /* Card background */
  --ink: #f0ece3;         /* Primary text */
  --amber: #c9a84c;       /* Accent color */
  --amber-light: #e8c97a; /* Hover accent */
  --muted: #7a7f8e;       /* Secondary text */
}
```

---

## Connect

| Platform | Link |
|----------|------|
| 🌐 Portfolio | [fostersetor.dev](https://fostersetor.dev) |
| ⌨️ GitHub | [github.com/FosterSetor9060](https://github.com/FosterSetor9060) |
| 💼 LinkedIn | [linkedin.com/in/FosterSetor](https://www.linkedin.com/in/FosterSetor) |
| ▶️ YouTube | [bit.ly/3uZLyxB](https://bit.ly/3uZLyxB) |
| ✉️ Email | [fostersetor6@gmail.com](mailto:fostersetor6@gmail.com) |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Designed & Built by <strong>Foster Setor</strong> · ALX Alumni 🎓 · © 2026</sub>
</div>
