# russblackburn.com — Portfolio Site

Static portfolio site built to replace the UXfolio-hosted version. Designed for hosting on **GitHub Pages** with a custom domain.

## Files
- `index.html` — Main portfolio page
- `assets/css/style.css` — All styles (Raleway font, responsive)
- `assets/images/` — Drop your images here (see below)
- `assets/resume.pdf` — Drop your résumé PDF here

## Image files expected
| Filename | Used for |
|---|---|
| `assets/images/profile.jpg` | Your headshot in the header |
| `assets/images/project-entitlement.jpg` | Red Hat case study thumbnail |
| `assets/images/article-covid.jpg` | UXPA Magazine article image |
| `assets/images/article-microcopy.jpg` | Red Hat Blog article image |

All images degrade gracefully — placeholders show if a file is missing.

## Deploy to GitHub Pages

1. Create a GitHub repo named `russblackburn.github.io` (or any name for a project page)
2. Push all files to the `main` branch
3. Go to **Settings → Pages** and set Source to `main` / root
4. Your site will be live at `https://russblackburn.github.io`

## Point russblackburn.com via DNS

In your domain registrar, add these DNS records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | russblackburn.github.io |

Then in GitHub Pages settings, add `russblackburn.com` as your custom domain and enable **Enforce HTTPS**.

## Add more case studies

Copy the commented-out project card block in `index.html` and fill in the title and image path.
