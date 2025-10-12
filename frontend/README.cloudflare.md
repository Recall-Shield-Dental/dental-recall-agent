# Deploying to Cloudflare Pages

This project is configured for deployment to Cloudflare Pages.

## Prerequisites
- [Cloudflare account](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
  ```bash
  npm install -g wrangler
  ```

## Steps

1. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

2. **Set your account ID**
   - Edit `wrangler.toml` and set your `account_id` (find it in your Cloudflare dashboard).

3. **Build your Next.js app**
   ```bash
   npm run build
   ```

4. **Preview locally**
   ```bash
   wrangler pages dev ./out
   ```

5. **Deploy**
   ```bash
   wrangler pages publish ./out --project-name=dental-recall-frontend
   ```

## Notes
- For SSR/Edge Functions, see Cloudflare Pages documentation for advanced setup.
- Environment variables can be managed in the Cloudflare Pages dashboard.
