# Bilingual Early Educators Alliance — Website

A static website for **Bilingual Early Educators Alliance Corp.**, built with plain HTML, CSS, and JavaScript. No build tools, no server, no database — it's ready to host for free on GitHub Pages and to connect to `bilingualearlyeducatorsalliance.com`.

```
/
├── index.html            Home
├── about.html             About (mission, vision)
├── our-work.html          What We Do, Our Approach, Partnerships
├── get-involved.html      Get Involved, Partnerships
├── contact.html           Contact + message form
├── 404.html                Not-found page (GitHub Pages shows this automatically)
├── CNAME                   Tells GitHub Pages your custom domain
├── css/
│   └── style.css           All styles (design tokens at the top)
├── js/
│   └── script.js           Mobile menu, scroll animation, contact form
├── images/
│   ├── logo-full.png        Full logo (icon + wordmark), used in header & footer
│   ├── logo-icon.png        Icon-only crop of the logo (mark without text)
│   ├── favicon.png          256×256 browser-tab icon, cropped from the logo
│   ├── favicon-32.png       32×32 browser-tab icon
│   ├── hero-illustration.svg
│   ├── about-illustration.svg
│   ├── why-matters-illustration.svg
│   └── community-illustration.svg
└── README.md               This file
```

## 1. Preview the website locally

You don't need to install anything to look at the site — but opening `index.html` directly from your file system (double-clicking it) works for a quick look, though a couple of browser behaviors differ slightly from a real server. For an accurate preview:

**Option A — VS Code**
1. Install the free "Live Server" extension.
2. Open this folder in VS Code, right-click `index.html`, choose **Open with Live Server**.

**Option B — Python (already on most Macs; free to install on Windows)**
```bash
cd path/to/this/folder
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option C — Node.js**
```bash
npx serve .
```

## 2. Upload the files to GitHub

1. Create a free GitHub account at [github.com](https://github.com) if you don't have one.
2. Create a new repository (Settings icon → **New repository**). Name it anything — for a personal/organization page you'd name it `<your-username>.github.io`, but any name works for a custom domain.
3. On your computer, inside this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
   (Or use GitHub Desktop / the "uploading an existing file" option in the GitHub web UI if you'd rather not use the command line — you can drag and drop the whole folder.)

## 3. Enable GitHub Pages

1. In your repository on GitHub, go to **Settings → Pages**.
2. Under "Build and deployment," set **Source** to **Deploy from a branch**.
3. Choose the **main** branch and the **/ (root)** folder, then **Save**.
4. GitHub will give you a URL like `https://<your-username>.github.io/<your-repo>/`. It can take a minute or two to go live.

### Connecting your GoDaddy domain

1. Still in **Settings → Pages**, under "Custom domain," enter `bilingualearlyeducatorsalliance.com` and save. (This repo already includes a `CNAME` file with that domain, so GitHub Pages recognizes it.)
2. In your GoDaddy DNS settings for the domain, add:
   - Four **A** records for `@` pointing to GitHub's IP addresses:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www` pointing to `<your-username>.github.io`
3. DNS changes can take anywhere from a few minutes to a day to take effect. Once it does, check "Enforce HTTPS" back in GitHub Pages settings for a secure `https://` connection.

## 4. Updating text and images later

Everything is plain HTML/CSS, so you can edit it with any text editor (VS Code, Notepad, TextEdit) — no coding environment required.

| To change... | Edit this file |
|---|---|
| Homepage hero, "What We Do" preview, "Why It Matters," "Our Approach" | `index.html` |
| Mission, Vision, org story | `about.html` |
| Full "What We Do" cards, "Our Approach," Partnerships | `our-work.html` |
| "Get Involved" options, Partnerships | `get-involved.html` |
| Contact details and form | `contact.html` |
| Colors, fonts, spacing, layout | `css/style.css` (see the `:root` section at the top for the color and font variables used everywhere) |
| Mobile menu behavior, scroll animation, form handling | `js/script.js` |
| Site icon (browser tab icon) | `images/favicon.png`, `images/favicon-32.png` |
| Logo in the header and footer | `images/logo-full.png` (referenced in every page's `<header>` and `<footer>`) |
| Illustrations | `images/*.svg` |

To change text, open the relevant `.html` file, find the sentence (Ctrl+F / Cmd+F works well), and edit it directly between the HTML tags.

### Updating the logo

The header and footer use `images/logo-full.png`, the organization's real logo. If you receive an updated or higher-resolution version of the logo later:

1. Export it as a PNG (ideally on a white or transparent background) and save it into `images/`, replacing `logo-full.png` (or using a new filename).
2. If the filename changes, update the `<img src="...">` path in the `<header>` and `<footer>` of every HTML file, or do a find-and-replace across all files for the old filename.
3. To regenerate the browser-tab icon from a new logo, crop it down to just the icon/mark (no text), pad it to a square, and export at 256×256 (`favicon.png`) and 32×32 (`favicon-32.png`).

### Swapping in real photography

The illustrations in `/images` are intentional placeholders — geometric, abstract art rather than stock photography — so the site never uses generic corporate images or stands in for real photos of your educators. When you have real photographs (of bilingual educators, classrooms, workshops, community events, etc.), replace them like this:

1. Add your photo file to the `images/` folder (JPG or PNG, ideally under 500KB for fast loading).
2. Find the matching `<img src="images/...">` tag in the relevant HTML file.
3. Replace the `src` with your new filename, and update the `alt` text to describe the new photo.

### Connecting the contact form

GitHub Pages only serves static files, so the contact form needs a free third-party service to actually deliver messages to your inbox. The form is already built and wired up for **[Formspree](https://formspree.io)** (free tier: 50 submissions/month, no credit card):

1. Create a free Formspree account and a new form.
2. Copy the endpoint URL it gives you (something like `https://formspree.io/f/abc123xy`).
3. Open `contact.html`, find `<form id="contact-form" action="#" method="POST">`, and replace `#` with your endpoint.
4. Formspree will ask you to confirm your email address the first time a message is sent — that's normal.

Alternatives that also work with a static site: [Getform](https://getform.io), [Basin](https://usebasin.com), or Google Forms embedded as an iframe. Any of these can be dropped in the same way by pointing the form's `action` at their endpoint.

## Design notes

- **The color palette is sampled directly from the organization's logo**: the navy and green from the wordmark, the gold from the sunburst, and a violet pulled from the rainbow arc across the book. These are defined as CSS variables at the top of `css/style.css` (`--ink` / navy, `--green`, `--gold`, `--purple`), so a palette or font change only needs to happen in one place. The illustrations in `/images` were recolored to match.
- **A thin rainbow strip** sits under the header on every page (`.rainbow-strip` in `css/style.css`) — a quiet, literal callback to the rainbow arc in the logo's open-book mark, rather than a decorative flourish invented separately from the brand.
- Section labels appear in English with a Spanish line underneath (for example, "Why it matters / Por qué importa") as a small, recurring nod to the bilingual mission — look for the `.eyebrow` class if you want to adjust or extend this.
- No statistics, staff names, testimonials, partner names, or program details were invented. Sections that will eventually hold that information (like the "About" story) are marked with a dashed placeholder note so they're easy to find and fill in later.
