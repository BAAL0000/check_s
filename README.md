# Green Acre Poultry Farm

A professional sample poultry e-commerce storefront built with React, Vite, TypeScript, and Tailwind CSS. It includes a working cart, checkout that stores demo orders in the browser, and a local admin dashboard.

**This is a demo.** Every price, market rate, and review is labeled as sample data. There are no real payments, no user accounts, and no backend.

## Pages

- Home, Shop, Product details, Market rates, Wholesale, About, Services, Contact
- Cart and sample checkout
- Demo admin: products, inventory, orders, market rates, reports

## Windows and VS Code setup

1. Install [Node.js LTS](https://nodejs.org/) (includes npm).
2. Install [Visual Studio Code](https://code.visualstudio.com/).
3. Optional VS Code extensions: ESLint, Tailwind CSS IntelliSense, Pretty TypeScript Errors.
4. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).
6. In VS Code use **File > Open Folder** on this project. `npm run dev` can also be started from the integrated terminal.

Useful scripts:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Demo data lives in browser `localStorage`. Use **Restore sample catalog** on the Demo admin page to reset it.

## Free deployment

Build a static site, then host it on a free static host.

```bash
npm run build
```

The `dist` folder is the site.

### Cloudflare Pages (free)

1. Push this project to a free GitHub repository.
2. Sign in at [Cloudflare Pages](https://pages.cloudflare.com/).
3. Create a project from the GitHub repo.
4. Build command: `npm run build`
5. Output directory: `dist`

### Netlify Drop (free, no Git required)

1. Run `npm run build`.
2. Open [Netlify Drop](https://app.netlify.com/drop).
3. Drag the `dist` folder onto the page.

### GitHub Pages (free)

1. In `vite.config.ts` set `base` to `'/<repo-name>/'` if the site is not on a custom root domain.
2. Run `npm run build`.
3. Upload the `dist` contents with the [GitHub Pages](https://pages.github.com/) workflow or the `peaceiris/actions-gh-pages` action.

Do not connect a payment provider, auth service, or live poultry API to this demo.

## Branding

- Green `#174D35`
- Gold `#F2B544`
- Cream `#F8F1E3`

Images are unique Unsplash photographs for chickens, meat, eggs, wholesale flocks, farm work, and delivery.

## WhatsApp

The contact buttons open `https://wa.me/15550148200`, a sample number that is not staffed.
