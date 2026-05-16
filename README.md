# Abdul Subhan — Portfolio Website
> **Graphics Designer & Programmer | Creative Designs + Smart Web Solutions**

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed → https://nodejs.org
- npm (comes with Node.js)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```
Open → http://localhost:5173

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Folder Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── logo.png            ← Your AS logo
│   │   ├── profile.png         ← Your professional photo
│   │   ├── banner.png          ← OG social share banner
│   │   ├── projects/
│   │   │   ├── project1.png    ← AI Research Paper Summarizer screenshot
│   │   │   ├── project2.png    ← AI Fake News Detector screenshot
│   │   │   ├── project3.png    ← Lost & Found System screenshot
│   │   │   ├── project4.png    ← Puzzle Brain Game screenshot
│   │   │   ├── project5.png    ← University Admission Post
│   │   │   └── project6.png    ← Event Competition Poster
│   │   └── gallery/
│   │       ├── design1.png     ← Poster design
│   │       ├── design2.png     ← Banner design
│   │       ├── design3.png     ← Logo design
│   │       ├── design4.png     ← Social media post
│   │       ├── design5.png     ← UI/UX layout
│   │       └── design6.png     ← Portfolio design
│   └── cv/
│       └── Abdul_Subhan_CV.pdf ← Your CV (for download button)
├── src/
│   ├── App.jsx                 ← All components (single-file architecture)
│   ├── main.jsx                ← React entry point
│   └── index.css               ← Global styles + Tailwind imports
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

---

## 🖼️ Replacing Assets

### Profile Image
In `src/App.jsx`, inside the **Hero** section, find:
```jsx
{/* Replace with: <img src="/images/profile.png" alt="Abdul Subhan" className="w-full h-full object-cover" /> */}
<div className="w-full h-full bg-gradient-...">
  <span className="text-6xl ...">AS</span>
  {/* ↑ REPLACE with your profile image */}
</div>
```
Replace the `<div>` placeholder with:
```jsx
<img src="/images/profile.png" alt="Abdul Subhan" className="w-full h-full object-cover" />
```

### Logo
In the **Navbar**, find the `{/* Replace with: ... */}` comment and replace the `<div>` with:
```jsx
<img src="/images/logo.png" alt="AS Logo" className="w-9 h-9 rounded-lg object-contain" />
```

### Project Images
In `src/App.jsx`, inside **ProjectCard**, find:
```jsx
{/* Replace with: <img src={p.img} ... /> */}
```
Replace the inner `<div>` with:
```jsx
<img src={p.img} alt={p.title} className="w-full h-full object-cover" />
```

### Gallery Images
In the **Gallery** section, replace each placeholder `<div>` with:
```jsx
<img src={item.img} alt={item.title} className="w-full h-full object-cover" />
```

### Project GitHub / Demo Links
In `PROJECTS` array (top of App.jsx), add real URLs:
```js
{
  title: "AI Research Paper Summarizer",
  githubUrl: "https://github.com/abdulsubhan-dev/...",
  demoUrl: "https://your-demo-link.vercel.app",
  ...
}
```
Then update ProjectCard to use `p.githubUrl` and `p.demoUrl`.

---

## 🌐 Deploying on Vercel

### Method 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

### Method 2: GitHub + Vercel Dashboard
1. Push your code to GitHub
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

The `vercel.json` in the root handles SPA routing automatically.

---

## 🎨 Customization

### Change Colors
All purple/blue tones come from Tailwind and inline styles. Search for `#a855f7` (purple) and `#6366f1` (indigo) in App.jsx to change accent colors globally.

### Add More Projects
In `PROJECTS` array in App.jsx:
```js
{
  title: "New Project",
  desc: "Description here.",
  category: "Category",
  tags: ["Tag1", "Tag2"],
  img: "/images/projects/projectN.png",
  hasGithub: true,
  hasDemo: true,
  color: "#a855f7",
}
```

### Add More Gallery Items
In `GALLERY_ITEMS` array:
```js
{ img: "/images/gallery/designN.png", title: "My Design", cat: "Poster" }
```

### Connect Contact Form
To make the form functional, use **EmailJS** (free):
1. Sign up at https://emailjs.com
2. `npm install @emailjs/browser`
3. Replace `handleSubmit` function in Contact section with EmailJS send call.

---

## 📦 Tech Stack
- **React 18** — UI framework
- **Vite** — Lightning-fast dev/build tool
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Professional animations
- **React Icons** — Icon library (Fi + Si sets used)

---

## 🔗 Your Links (pre-configured)
- Email: abdulsubhan.design@gmail.com
- GitHub: https://github.com/abdulsubhan-dev
- LinkedIn: https://www.linkedin.com/in/abdul-subhan-71014840b

---

*Built for Abdul Subhan — Graphics Designer & Programmer*
