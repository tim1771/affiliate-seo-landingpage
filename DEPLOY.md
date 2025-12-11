# Deployment Guide: AI Tools Directory (pSEO Empire)

Your Programmatic SEO site is ready to launch. It contains over **500 AI tools** and **34,000+ generated comparison pages**.

## 1. Final Local Check
Ensure all your data is generated and your app builds locally.

```bash
cd ai-tools-directory
npm run build
```
*Note: This might take a few minutes due to the 34,000 pages. If it simulates successfully, you are good to go.*

## 2. Push to GitHub
We need to push the latest changes (including the new data and search features) to your repository.

```bash
git add .
git commit -m "feat: Scale to 500 tools, add search/filter, pagination, and affiliate redirection"
git push origin main
```

## 3. Deploy on Netlify (Recommended)
Netlify is perfect for this "Static Export" setup.

1.  **Log in to Netlify** (or sign up).
2.  Click **"Add new site"** -> **"Import from existing project"**.
3.  Select **GitHub**.
4.  Choose your repository: `affiliate-seo-landingpage`.
5.  **Configure Build Settings**:
    *   **Base directory:** `ai-tools-directory`
    *   **Build command:** `npm run build`
    *   **Publish directory:** `out` (Next.js exports to `out` by default with our config)
6.  Click **"Deploy"**.

## 4. Post-Deployment Checklist
*   **Verify Traffic:** Check Netlify Analytics or add Google Analytics to `app/layout.js`.
*   **Affiliate Links:**
    *   Open `lib/data.json`.
    *   Search for high-value tools (e.g., "ChatGPT", "Jasper").
    *   Replace their `link` with your **Affiliate Link**.
    *   Example: `"link": "https://jasper.ai?fpr=your_id"`
    *   Commit and push. Netlify will auto-rebuild.
*   **Indexing:** Submit your new Netlify URL to **Google Search Console** to start indexing your 34,000 pages.

## 5. Monetization Strategy
*   **Step 1:** Traffic comes to "Versus" pages (e.g., "Jasper vs CopyAI").
*   **Step 2:** User clicks "Visit Website" (Redirects via `/go/jasper`).
*   **Step 3:** You earn commission on signup.

**You are now a Programmatic SEO Founder. Good luck!**
