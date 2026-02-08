# NIETO CARPENTRY — Website

One-page marketing site for Nieto Carpentry (Mont Belvieu / Baytown, TX).

## Project Structure

```
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/
│       ├── favicon.png         ← Replace with custom favicon
│       ├── hero.jpg            ← Hero image (1920×1080+, landscape)
│       ├── featured-01.jpg     ← Featured project 1 (1200×800)
│       ├── featured-02.jpg     ← Featured project 2 (1200×800)
│       ├── work-01…work-08.jpg ← Gallery images (800×600 each)
│       └── og-image.jpg        ← Social share image (1200×630)
└── README.md
```

## Swapping Photos

1. Replace any `.jpg` in `assets/img/` with your own photo using the **same filename**.
2. Recommended sizes are listed above. Larger is fine — they'll be `object-fit: cover`'d.
3. Optimize images before committing (use [Squoosh](https://squoosh.app/) or similar). Target < 200 KB per image.
4. Update `alt` text in `index.html` to describe each photo accurately.

## Changing Copy

All text lives in `index.html`. Search for the section you want to edit (e.g., `SERVICES`, `ABOUT`, `CTA BAND`) and update the content in place. The CSS handles all styling automatically.

Key items to update:
- **Service descriptions** — in the `.service-card` blocks
- **About text** — in `.about-text`
- **Service area towns** — in `.area-towns`
- **Featured project captions** — in `.featured-caption`
- **OG tags** — update `og:url` and `og:image` with your live domain

## Deploy to Cloudflare Pages

### Option A: GitHub + Cloudflare Pages (recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nieto-carpentry.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
   - Select the `nieto-carpentry` repository.
   - **Build settings:**
     - Framework preset: `None`
     - Build command: *(leave blank)*
     - Build output directory: `/` (root)
   - Click **Save and Deploy**.

3. **Custom domain (optional):**
   - In Pages project settings → **Custom domains** → add `nietocarpentry.com` (or your domain).
   - Update DNS records as instructed by Cloudflare.

### Option B: Direct Upload

1. In Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Upload assets**.
2. Drag the entire project folder.
3. Deploy.

## Tech Notes

- **Zero dependencies** — plain HTML5, CSS3, vanilla JS.
- **Mobile-first responsive** — breakpoints at 960px, 768px, 480px.
- **Accessible** — ARIA labels, focus states, keyboard-navigable lightbox, semantic HTML.
- **Fast** — no frameworks, minimal JS, lazy-loaded images.
- **Fonts** — Inter (sans) + DM Serif Display (serif) via Google Fonts.
