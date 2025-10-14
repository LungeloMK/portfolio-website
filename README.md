Portfolio website — quick notes

This workspace contains a simple static portfolio with:

- `index.html` — main page
- `style.css` — styling
- `assets/avatar.svg` — placeholder avatar

Quick customization steps:

1. Replace contact details
   - Edit `index.html` and update the email, GitHub, and LinkedIn links.

2. Replace avatar image
   - Put a photo at `assets/avatar.png` (or change the `src` in the HTML) and keep the same filename.

3. Enable form handling
   - To receive form submissions, either:
     - Use Formspree: set the form `action` to your Formspree endpoint (see https://formspree.io)
     - Or point the `action` to your server endpoint that accepts POST requests with `name`, `email`, `message`.

4. Optional font
   - The page references the Inter font via Google Fonts. If you prefer system fonts, remove the Google Fonts link in `index.html`.

5. Local preview
   - Open `index.html` in your browser (double-click or use `Start-Process .\index.html` in PowerShell).

If you want, I can:
- Swap the avatar to your real photo and set your contact links.
- Add real project screenshots and a simple modal for project details.
- Wire the contact form to Formspree and test a submission.

Hosted sites
------------

- Clean Slate Solutions — https://cleanslatesolutions.co.za/ (live, private repository)
- Dev Workflow Tools — https://devworkflowtools.com/ (live)

Tech stack used on the hosted sites
----------------------------------

Frontend
- HTML5, CSS3, JavaScript
- Responsive design with modern UI/UX
- Professional animations and transitions

Contact form (Formspree)
-----------------------

This site uses Formspree for contact submissions (no backend required).

1. Create a free Formspree account and add a new form.
2. Copy the form endpoint URL (it looks like https://formspree.io/f/your-id-here).
3. Add the endpoint before the contact script in your HTML pages:

```html
<script>window.FORMSPREE_ENDPOINT = 'https://formspree.io/f/xblzpeqo';</script>
```

4. Reload the page and submit the contact form — Formspree will forward submissions to your configured email.

Image optimization
------------------

To create web-optimized screenshots (1200px wide) and WebP fallbacks, you can use ImageMagick. This small PowerShell script will read the PNG files in `assets/` and create resized PNG and WebP files.

Save and run `scripts\optimize-images.ps1` from PowerShell (requires ImageMagick `magick` in PATH):

```powershell
# Example: run from repository root
.
\scripts\optimize-images.ps1
```

Files produced:
- `assets/proj-cleanslate-1200.png`
- `assets/proj-cleanslate.webp`
- `assets/proj-devworkflow-1200.png`
- `assets/proj-devworkflow.webp`

If you'd like, I can run these steps for you and replace the assets in the repo. Otherwise run the script locally and it will generate the optimized images.

Contact form (centralized handler)
---------------------------------
This project includes a unified client-side contact handler at `scripts/contact.js`. It provides:
- Honeypot spam protection (hidden field)
- Client-side validation and accessible status messages
- Optional Formspree integration with automatic retries

To enable real submissions with Formspree:

1. Create a Formspree form and copy the endpoint URL (it looks like `https://formspree.io/f/your-id`).
2. Add this script tag near the top of your HTML pages (before `scripts/contact.js` is loaded):

```html
<script>window.FORMSPREE_ENDPOINT = 'https://formspree.io/f/xblzpeqo';</script>
```

3. Reload the site and submit the contact form. The status message will report success or failure.

Testing without Formspree
-------------------------
If you don't set an endpoint, `scripts/contact.js` will simulate a successful send so you can test the UI locally.

 


