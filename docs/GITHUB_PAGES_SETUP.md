# GitHub Pages Setup Guide

This guide explains how to set up GitHub Pages for the mono-rooter component library dashboard.

## Overview

The GitHub Pages deployment showcases the component library through the dashboard application. The setup includes:

- Automated deployment via GitHub Actions
- Static build configuration for GitHub Pages
- Proper routing and base href configuration

## Files Created/Modified

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Automatically builds and deploys on push to main branch
- Builds both the components library and dashboard
- Deploys to GitHub Pages using the `gh-pages` branch

### 2. Build Scripts (`package.json`)
- `build:components` - Builds the component library
- `build:dashboard` - Builds the dashboard application
- `build:dashboard:gh-pages` - Builds dashboard with GitHub Pages configuration

### 3. Angular Configuration (`angular.json`)
- Added `github-pages` configuration for the dashboard
- Sets proper `baseHref` and `deployUrl` for the repository
- Configures static output mode (no SSR) for GitHub Pages

## Setup Instructions

### 1. Push Changes to GitHub
```bash
git add .
git commit -m "Add GitHub Pages configuration"
git push origin main
```

### 2. Enable GitHub Pages in Repository Settings
1. Go to your repository on GitHub (`usli-snap/mono-rooter`)
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to the main branch

### 3. Verify Deployment
- The GitHub Action will run automatically on the next push to main
- Check the **Actions** tab to monitor the deployment progress
- Once complete, your site will be available at: `https://usli-snap.github.io/mono-rooter/`

## Local Testing

To test the GitHub Pages build locally:

```bash
# Build components library
npm run build:components

# Build dashboard for GitHub Pages
npm run build:dashboard:gh-pages

# Serve the built files (you can use any static server)
npx http-server dist/dashboard -p 8080
```

## Troubleshooting

### Common Issues

1. **404 on page refresh**: This is normal for SPAs on GitHub Pages. The app should handle routing internally.

2. **Assets not loading**: Ensure the `baseHref` and `deployUrl` are correctly set to `/mono-rooter/` in the configuration.

3. **Build failures**: Check the GitHub Actions logs for specific error messages.

### Manual Deployment

If you need to deploy manually:

```bash
# Build for GitHub Pages
npm run build:dashboard:gh-pages

# Deploy using gh-pages CLI (install with: npm install -g gh-pages)
npx gh-pages -d dist/dashboard
```

## Configuration Details

### Base Href Configuration
The application is configured with `baseHref: "/mono-rooter/"` to work with the GitHub Pages URL structure.

### Static vs SSR
The GitHub Pages build uses `outputMode: "static"` to generate static files instead of server-side rendering, which is required for GitHub Pages hosting.

### Build Optimization
The GitHub Pages configuration includes:
- Output hashing for cache busting
- Bundle size budgets for performance monitoring
- Production optimizations
