# Bilingual Early Educators Alliance — Website

A static website for **Bilingual Early Educators Alliance**, built with plain HTML, CSS, and JavaScript. No build tools, no server, no database — ready to host for free on GitHub Pages and connect to `bilingualearlyeducatorsalliance.com`.

```
/
├── index.html            Home
├── about.html             About (story, mission, vision, values, leadership)
├── our-work.html          How BEEA supports educators, + photo gallery
├── programs.html          Upcoming events, workshops, community programs, past events
├── resources.html          Categorized resource cards (ready for real files)
├── get-involved.html      Membership, partnership, volunteering, support
├── contact.html            Contact form + location + social links
├── 404.html                 Not-found page
├── CNAME                    Tells GitHub Pages your custom domain
├── css/
│   └── style.css            All styles (design tokens at the top)
├── js/
│   └── script.js            Mobile menu, scroll animation, contact form
├── images/
│   ├── logo-full.png          Full BEEA logo (icon + wordmark), used in every header
│   ├── logo-icon.png          Icon-only crop, used in the footer
│   ├── partner-urban-college.png  Urban College of Boston logo (header + footer)
│   ├── wechat-qr.png           WeChat group QR code (footer + Contact page)
│   ├── favicon.png / favicon-32.png   Browser-tab icons, cropped from the logo
│   ├── photo-workshop.jpg    Real photo: a BEEA professional development workshop
│   ├── photo-group.jpg       Real photo: educators together with the BEEA banner
│   └── photo-event-banner.jpg Real photo: a BEEA event display banner
└── README.md               This file
```

## 1. Preview the website locally

**Option A — VS Code:** install the free "Live Server" extension, open this folder, right-click `index.html` → **Open with Live Server**.

**Option B — Python:**
```bash
cd path/to/this/folder
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

**Option C — Node.js:** `npx serve .`

## 2. Upload the files to GitHub

1. Create a free GitHub account if you don't have one.
2. Create a new repository.
3. From inside this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
   (Or drag-and-drop the whole folder using GitHub's web upload if you'd rather not use the command line.)

## 3. Enable GitHub Pages

1. In the repository, go to **Settings → Pages**.
2. Under "Build and deployment," set **Source** to **Deploy from a branch**.
3. Choose the **main** branch and **/ (root)** folder, then **Save**.
4. GitHub gives you a URL like `https://<your-username>.github.io/<your-repo>/` within a minute or two.

### Connecting your GoDaddy domain

1. In **Settings → Pages**, under "Custom domain," enter `bilingualearlyeducatorsalliance.com` and save. (The included `CNAME` file already contains exactly this domain, so GitHub Pages recognizes it automatically.)
2. In your GoDaddy DNS settings, add:
   - Four **A** records for `@` pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www` pointing to `<your-username>.github.io`
3. DNS changes can take minutes to a day. Once live, check "Enforce HTTPS" in GitHub Pages settings.

## 4. Updating content later

Everything is plain HTML/CSS, editable with any text editor — no coding environment required.

| To change... | Edit this file |
|---|---|
| Homepage hero, mission, impact stats, sample events | `index.html` |
| Story, mission, vision, values, leadership | `about.html` |
| The six "our work" areas and photo gallery | `our-work.html` |
| Events, workshops, community programs | `programs.html` |
| Resource cards by category | `resources.html` |
| Membership / partner / volunteer / support options | `get-involved.html` |
| Contact details and form | `contact.html` |
| Colors, fonts, spacing, layout | `css/style.css` (see the `:root` section at the top) |
| Mobile menu, scroll animation, form handling | `js/script.js` |

### Editing event cards

Each event on `index.html` and `programs.html` is one `.event-card` block:

```html
<div class="event-card">
  <div class="event-date">Date TBD</div>
  <div class="event-body">
    <h3>Sample Workshop Title</h3>
    <p>Short description...</p>
    <div class="event-location">...Location TBD</div>
    <a class="btn btn-outline-ink btn-sm" href="contact.html">Learn More</a>
  </div>
</div>
```
Copy this block to add a new event, or edit the text in place. Point "Learn More" at a registration page, form, or `mailto:` link if you have one.

### Editing resource cards

Each resource on `resources.html` is one `.resource-card` block with a title, short description, and a "Coming Soon" tag. Once you have a real PDF or file to link:

1. Add the file to a new folder, e.g. `files/your-resource.pdf`.
2. Replace the `<span class="tag">Coming Soon</span>` with a link, e.g.:
   ```html
   <a class="btn btn-outline-ink btn-sm" href="files/your-resource.pdf">Download</a>
   ```

### Filling in the placeholder impact statistics

The "Our Impact" section on `index.html` uses clearly marked `[ # ]` placeholders with a "Placeholder" tag — intentionally, since no real numbers were provided. Search for `class="stat"` in `index.html`, replace `[ # ]` with the real figure, and remove the `<span class="placeholder-flag">Placeholder</span>` line once it's a confirmed number.

### The photo gallery

`our-work.html` ("BEEA in the Community") and `programs.html` ("Past Events") each have a `.gallery-grid` of real event photos. Click any photo to open it larger in a lightbox — you can navigate between photos with the arrow buttons, arrow keys, or close with Escape or by clicking outside the image. This is handled automatically by `js/script.js`; you don't need to write any code to add a working lightbox to a new gallery — just add more `<img>` tags inside a `.gallery-grid` container.

### Swapping in more real photography

Six real photos from BEEA events are already in use across the site (`images/photo-workshop.jpg`, `photo-group.jpg`, `photo-event-banner.jpg`, `photo-presenters-trio.jpg`, `photo-workshop-wide.jpg`, `photo-presenter-podium.jpg`). To add more:

1. Add the new image file to `images/`.
2. Find the matching `<img src="images/...">` tag and update the `src` and `alt` text, or add a new `<img>` inside a `.gallery-grid` to include it in a gallery.
3. Keep new photos under ~300KB where possible (resize to around 1400px on the long edge) so pages stay fast.

### Updating the logo

The header and footer use `images/logo-full.png` and `images/logo-icon.png`, extracted directly from the logo file you provided. If you receive an updated logo later, replace these files (keeping the same names) or update the `<img src="...">` paths if the filename changes.

### Updating the Urban College of Boston logo, WeChat QR code, phone, or address

These now appear consistently in the footer of every page (the header intentionally shows only the BEEA logo):

- **Urban College logo** — `images/partner-urban-college.png`, shown in the footer as a nod to BEEA being a department of Urban College of Boston. To update it, replace the file (same name), or update every `<img src="images/partner-urban-college.png">` reference if you rename it.
- **WeChat QR code** — `images/wechat-qr.png`, shown in the footer of every page and in a larger card on the Contact page. If your WeChat group link changes, generate a new QR code image and replace this file.
- **Phone number** — search for `617-276-2667` (it appears as `tel:16172762667` links) across the HTML files to update it everywhere at once.
- **Address** — search for `2 Boylston St #2` across the HTML files to update it everywhere at once.

### Connecting the contact form

GitHub Pages only serves static files, so the contact form needs a free third-party service to actually deliver messages. It's already wired for **[Formspree](https://formspree.io)** (free tier, no credit card):

1. Create a free Formspree account and a new form.
2. Copy the endpoint (e.g. `https://formspree.io/f/abc123xy`).
3. In `contact.html`, find `<form id="contact-form" action="#" method="POST">` and replace `#` with your endpoint.

Until this is connected, the form shows a friendly "not connected yet" message instead of failing silently.

## Design notes

- **Palette:** soft sage (`--sage`), pale yellow (`--yellow`), and warm cream (`--cream`) backgrounds, with muted orange and soft pink used sparingly as accents — plus a deeper forest green (`--forest`) and the logo's navy pulled directly from your actual logo file, so the site's "brand color" is a real sampled color, not a guess.
- **Signature device:** real photographs are framed in soft organic ("blob") shapes rather than plain rectangles — a nod to the playful, rounded Kiddie-style reference without tipping into a childcare-site look, since the photos themselves are professional educators at work.
- **Typography:** Fredoka (rounded, friendly display type) paired with Inter (a clean, highly legible body face) — playful headlines, professional body copy.
- **A thin rainbow strip** under the header on every page echoes the rainbow arc in the logo's open-book mark.
- No statistics, staff names, or leadership bios were invented. The impact numbers are explicitly marked placeholders, and the Leadership section is a clearly labeled "coming soon" note rather than fabricated names.
- No donation or payment system is included, per the brief — the "Support Our Mission" option links to the Contact page instead.
