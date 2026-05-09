# Wajawood — Next.js Website

A Next.js (App Router) implementation of the Wajawood marketing site (Custom Wood Products Manufacturer in China).

## Tech Stack

- **Next.js 14** (App Router, JavaScript)
- **React 18**
- **Tailwind CSS 3**

## Project Structure

```
new-website/
├─ app/
│  ├─ layout.js          # Root layout (header + footer)
│  ├─ page.js            # Home page
│  ├─ globals.css        # Tailwind + global styles
│  ├─ about/page.js
│  ├─ products/page.js
│  ├─ products/[slug]/page.js
│  ├─ wood-fabrication/page.js
│  ├─ capabilities/page.js
│  └─ contact/page.js
├─ components/
│  ├─ Header.js
│  ├─ Hero.js
│  ├─ Featured.js
│  ├─ CapabilitiesSection.js
│  ├─ CTA.js
│  └─ Footer.js
├─ public/
├─ tailwind.config.js
├─ postcss.config.js
├─ next.config.js
└─ package.json
```

## Run Locally (Windows)

Open **PowerShell** or **CMD**, then:

```powershell
cd D:\new-website
npm install
npm run dev
```

Visit http://localhost:3000

### Other commands

```powershell
npm run build     # production build
npm run start     # start production server (after build)
npm run lint      # ESLint
```
