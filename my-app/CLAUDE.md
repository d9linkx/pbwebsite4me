# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Prawnbox**, a peer-to-peer delivery platform built with Next.js 15, React 19, and TypeScript. The application uses a dual-domain architecture to serve both a marketing website and a dashboard application through the same codebase.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The development server runs on `http://localhost:3000` and proxies API requests to `http://localhost:4000` (backend server must be running separately).

## Architecture

### Dual-Domain Routing

The app serves two distinct experiences from one codebase:
- **Website**: Marketing pages (`/website/*` routes)
- **App**: Dashboard/application (`/dashboard` and authenticated routes)

**Key Implementation Details:**
- `middleware.ts` handles subdomain detection and route rewriting
- In localhost development, all routes are rewritten to `/website/*` by default
- In production, `app.prawnbox.com` serves the dashboard, `prawnbox.com` serves the website
- The middleware sets `x-subdomain` header to determine the current context
- `utils/domain.ts` provides `getCurrentSubdomain()` helper for server components

### App Structure

```
app/
├── dashboard/page.tsx          # Main dashboard entry point
├── website/                    # All marketing pages
│   ├── page.tsx               # Homepage
│   ├── about/page.tsx
│   ├── how-it-works/page.tsx
│   └── ...
├── auth/page.tsx              # Authentication
├── email-verification/page.tsx
└── layout.tsx                 # Root layout with metadata generation
```

### API Integration

**API Client (`utils/apiClient.ts`):**
- Centralized `ApiClient` class with type-safe methods (GET, POST, PUT, PATCH, DELETE)
- Automatic Bearer token injection from localStorage (`auth_token` key)
- Built-in retry logic with exponential backoff
- Request/response serialization with validation
- Extensive console logging for debugging auth flows

**Backend Proxy:**
- Next.js rewrites proxy all `/api/*`, `/user/*`, `/auth/*`, `/profile/*`, `/dashboard/*` requests to `http://localhost:4000`
- Configured in `next.config.js` with CORS headers
- Uses `credentials: 'include'` for authentication

**Important:** When working with API calls:
1. Always use the `apiClient` instance from `utils/apiClient.ts`
2. Auth tokens are stored in localStorage with key `auth_token`
3. The client logs extensively - check console for auth debugging
4. API responses follow the pattern: `{ success: boolean, data?: T, message?: string }`

### State Management

**App State (`utils/appState.ts`):**
- Custom `useAppState` hook manages global application state
- No external state library - uses React hooks
- Centralized state includes:
  - `currentScreen`: Current app screen/route
  - `user`: Authenticated user object
  - `activeRole`: Current role ('sender' | 'pal' | 'receiver' | 'proxy')
  - Entity selections (jobs, bids, chats, notifications)
  - Flow state (scanning, payment contexts, dispute resolution)

**User Roles:**
The app supports 4 distinct user roles with different permissions:
- `sender`: Posts delivery jobs
- `pal`: Accepts and completes deliveries
- `receiver`: Receives items
- `proxy`: Stores items temporarily

Role switching is handled through `activeRole` state and UI adapts accordingly.

### Navigation System

**Navigation Architecture:**
- Screen-based navigation using `Screen` type union (100+ screens defined in `types/index.ts`)
- `NavigationManager` class (`utils/navigation.ts`) handles navigation guards, history, and role-based access
- `navigationConfig.ts` defines screen configurations and requirements
- Event handlers are centralized in `utils/eventHandlers.ts`

**Navigation Guards:**
- Authentication guard: Redirects to 'auth' if user not logged in
- Role-based guard: Ensures user role has permission for screen
- Job context guard: Ensures a job is selected when required

### Component Organization

**Dashboard Components (`components/dashboard/`):**
- `DashboardScreen.tsx`: Main dashboard with role-specific content
- `RoleSpecificContent.tsx`: Renders UI based on active role
- `StatsGrid.tsx`: Dashboard statistics display
- `DashboardHeader.tsx`: Header with role switcher

**Website Components (`components/`):**
- Marketing pages: `HomePage.tsx`, `AboutPage.tsx`, `PricingPage.tsx`, etc.
- `WebsiteLayout.tsx`, `WebsiteHeader.tsx`, `WebsiteFooter.tsx` for website structure

**Screen Components:**
Over 90 specialized screen components for different app flows (tracking, payment, chat, wallet, etc.). All follow the pattern `[ScreenName]Screen.tsx`.

### Type System

**Core Types (`types/index.ts`):**
- `Screen`: Union of 100+ screen identifiers
- `UserRole`: 4 role types
- `DeliveryStatus`: Job lifecycle states
- `DeliveryJob`: Delivery job entity
- `User`: User entity with multi-role support
- `ProxyItem`: Proxy storage items
- `Notification`: In-app notifications

**API Types (`types/api.ts`):**
- Request/response types for API integration

### Styling

- **Tailwind CSS 4.0** with custom configuration
- **Component library:** Radix UI primitives with custom styling
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Animations:** Framer Motion for complex animations
- **Utilities:** `clsx` and `tailwind-merge` for conditional classes

### Environment Configuration

Required environment variables (see `.env.local`):
```
NEXT_PUBLIC_WEBSITE_DOMAIN=localhost:3000
NEXT_PUBLIC_APP_DOMAIN=localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
```

## Development Patterns

### Authentication Flow
1. User signs in through `AuthScreen.tsx`
2. Token received from API is stored via `apiClient.setAuthToken(token)`
3. Token automatically injected in all subsequent API requests
4. Email verification handled through `EmailVerificationScreen.tsx`

### Adding New Screens
1. Add screen identifier to `Screen` type in `types/index.ts`
2. Create screen component in `components/[ScreenName]Screen.tsx`
3. Add screen config to `navigationConfig.ts` if needed
4. Wire up navigation in parent components

### Role-Based Features
1. Check `activeRole` state to determine current user role
2. Use `filterNotificationsByRole()` from `utils/helpers.ts` for role-specific filtering
3. Dashboard stats are calculated per-role in `utils/dashboard.ts`
4. Navigation guards automatically enforce role permissions

### Working with Deliveries
- Delivery jobs flow through states: pending → bidding → assigned → picked-up → in-transit → arrived → delivered → completed
- Jobs are filtered by role (sender sees their posts, pal sees available jobs and accepted bids)
- Real-time updates should be handled through notifications

## Important Notes

- **Turbopack:** Build and dev both use `--turbopack` flag
- **TypeScript strict mode:** Enabled with target ES2017
- **Path alias:** `@/*` maps to project root for absolute imports
- **Image domains:** Configured for prawnbox.com and vercel deployment domains
- **Middleware matcher:** Excludes `_next/static`, `_next/image`, API routes, and static assets
