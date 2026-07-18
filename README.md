# Shaik Fareed - Neon Cybersecurity Portfolio

A responsive, recruiter-focused cybersecurity portfolio built from Shaik Fareed's resume.

## Planned public URL

When this folder is uploaded to a GitHub repository named `shaik-fareed-portfolio` under the GitHub account `Fareed-sunny`, the intended URL is:

**https://fareed-sunny.github.io/shaik-fareed-portfolio/**

The URL becomes public only after GitHub Pages is enabled and the deployment succeeds.

## Fastest GitHub Pages deployment

1. Sign in to GitHub and create a **public** repository named `shaik-fareed-portfolio`.
2. Upload every file and folder from this package, including the hidden `.github` folder.
3. Commit the files to the `main` branch.
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. Open the repository's **Actions** tab and wait for `Deploy portfolio to GitHub Pages` to complete.
7. Open `https://fareed-sunny.github.io/shaik-fareed-portfolio/`.

## Netlify alternative

Drag the extracted folder into Netlify's site deployment interface. Netlify will create a public URL immediately; rename the site to a professional name afterward.

## Add the portfolio to LinkedIn

Use the live public URL in:

- **Contact info → Website**
- **Featured → Add a link**
- Your headline/about section, when appropriate

Recommended Featured title:

`Cybersecurity Portfolio | VAPT, Web Security & AppSec`

Recommended description:

`Explore my practical cybersecurity projects, VAPT and AppSec work, CTF achievements, internships, and certifications.`

## Local preview

Open `index.html`, or run:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Important domain setting

The SEO and social-preview metadata currently expects this exact public address:

`https://fareed-sunny.github.io/shaik-fareed-portfolio/`

If you deploy to another URL, update the canonical, Open Graph, Twitter, JSON-LD, robots.txt, and sitemap URLs in the source files.

## Files

- `index.html` - content, SEO metadata, and structured data
- `styles.css` - neon cyber design and responsive layouts
- `script.js` - animated network, terminal typing, navigation, and reveal effects
- `assets/Shaik_Fareed_Resume.pdf` - downloadable resume
- `assets/social-preview.png` - LinkedIn/Open Graph preview image
- `.github/workflows/deploy-pages.yml` - automatic GitHub Pages deployment
- `netlify.toml` - Netlify deployment and security headers


## Dynamic visual system

- 3-second rotating neon palette
- Animated simulated global threat map (visualization only; no external threat-intelligence feed)
