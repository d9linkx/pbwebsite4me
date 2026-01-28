# Prawnbox - Domain Setup Guide

## Domain Architecture

This application uses a subdomain architecture with middleware-based routing:

- **Website (Marketing)**: `prawnbox.com` - Landing pages, marketing content
- **Application (Dashboard)**: `app.prawnbox.com` - User authentication and dashboard

## Configuration Files

### 1. `next.config.js`
Minimal configuration with image domains only.

### 2. `middleware.ts`
Handles subdomain detection and route rewriting:
- `app.prawnbox.com` → Routes prefixed with `/app`
- `prawnbox.com` → Routes prefixed with `/website`

### 3. `utils/domain.ts`
Utility functions to detect current subdomain in server components.

### 4. `app/layout.tsx`
Dynamic metadata based on subdomain context.

## Route Structure

```
app/
├── app/                    # Application routes (app.prawnbox.com)
│   ├── layout.tsx         # App layout
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Dashboard pages
└── website/               # Website routes (prawnbox.com)
    ├── layout.tsx         # Website layout (inherited from root)
    └── page.tsx           # Marketing homepage
```

## DNS Configuration

### Required DNS Records

1. **A Record for Website**:
   - Name: `@`
   - Type: `A`
   - Value: `YOUR_SERVER_IP`

2. **CNAME Record for App Subdomain**:
   - Name: `app`
   - Type: `CNAME`
   - Value: `YOUR_SERVER_HOSTNAME`

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_DOMAIN=app.prawnbox.com
NEXT_PUBLIC_WEBSITE_DOMAIN=prawnbox.com
```

## Deployment Steps

### 1. Set Up DNS
- Point `prawnbox.com` to your server IP
- Create `app.prawnbox.com` as a CNAME pointing to your main domain

### 2. Configure Server
- Ensure your web server handles both domains
- SSL certificates should cover both `prawnbox.com` and `*.prawnbox.com`

### 3. Deploy Application
```bash
npm run build
npm start
```

### 4. Test Routes
- `https://prawnbox.com` → Shows marketing website
- `https://app.prawnbox.com` → Shows authentication/dashboard

## Development Setup

For local development, you can use different ports:

```bash
# Terminal 1 - Website
NEXT_PUBLIC_APP_DOMAIN=localhost:3000 npm run dev

# Terminal 2 - App
NEXT_PUBLIC_WEBSITE_DOMAIN=localhost:3001 npm run dev
```

## Routing Behavior

- **Website Routes**: `/` (home), `/about`, `/pricing`, etc.
- **App Routes**: `/auth`, `/dashboard`, `/profile`, etc.
- **Shared Routes**: API routes work on both domains

## SEO Considerations

- Each subdomain has separate metadata and Open Graph tags
- Proper canonical URLs are set for each subdomain
- Social media previews will show appropriate content based on subdomain
