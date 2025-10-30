# Dashboard Refactor Plan: Monolith to App Router

## Current State
- **6,586 lines** in single `app/dashboard/page.tsx`
- **85+ screens** in one switch statement
- **32 useState** hooks for global state
- **No code splitting** - entire app loads upfront
- **Hash-based navigation** instead of proper routing

## Goal
Migrate to proper Next.js 15 App Router with:
- ✅ Automatic code splitting per route
- ✅ Server components where possible
- ✅ Proper SEO and deep linking
- ✅ Shared layouts for common UI
- ✅ Global state management (Zustand)

---

## New Route Structure

### Phase 1: Core Routes (High Priority)

```
app/
├── (auth)/                          # Auth group (no layout)
│   ├── auth/
│   │   └── page.tsx                 # Login/signup
│   └── email-verification/
│       └── page.tsx                 # Email verification
│
├── (dashboard)/                     # Dashboard group (shared layout)
│   ├── layout.tsx                   # Shared: header, footer, navigation
│   │
│   ├── dashboard/
│   │   └── page.tsx                 # Main dashboard (role-specific stats)
│   │
│   ├── jobs/
│   │   ├── page.tsx                 # Available jobs list
│   │   ├── post/page.tsx            # Post new delivery
│   │   ├── [id]/page.tsx            # Job detail view
│   │   ├── [id]/bids/page.tsx       # View bids for job
│   │   ├── [id]/tracking/page.tsx   # Track delivery
│   │   └── my-deliveries/page.tsx   # User's delivery history
│   │
│   ├── wallet/
│   │   ├── page.tsx                 # Wallet overview
│   │   ├── add-funds/page.tsx       # Add funds flow
│   │   ├── withdraw/page.tsx        # Withdraw flow
│   │   └── transactions/page.tsx    # Transaction history
│   │
│   ├── settings/
│   │   ├── page.tsx                 # Settings overview
│   │   ├── profile/page.tsx         # Profile information
│   │   ├── verification/page.tsx    # ID verification
│   │   └── payment-methods/page.tsx # Payment methods
│   │
│   ├── chat/
│   │   ├── page.tsx                 # Chat list
│   │   └── [threadId]/page.tsx      # Chat thread
│   │
│   ├── notifications/
│   │   └── page.tsx                 # Notifications center
│   │
│   └── help/
│       ├── page.tsx                 # Help center
│       └── contact/page.tsx         # Contact support
│
└── website/                         # Already exists
    └── ...
```

### Phase 2: Role-Specific Routes

```
app/(dashboard)/
├── proxy/
│   ├── page.tsx                     # Proxy dashboard
│   ├── items/page.tsx               # Stored items
│   └── [itemId]/handover/page.tsx   # Handover flow
│
├── sponsorship/
│   ├── page.tsx                     # Sponsorship overview
│   ├── search/page.tsx              # Find users to sponsor
│   └── manage/page.tsx              # Manage sponsorships
│
└── referrals/
    └── page.tsx                     # Referral program
```

### Phase 3: Flow-Based Routes (Modals/Intercepting)

```
app/(dashboard)/
├── @modal/                          # Parallel route for modals
│   ├── (.)payments/
│   │   ├── bank-transfer/page.tsx
│   │   ├── card/page.tsx
│   │   └── status/page.tsx
│   │
│   ├── (.)qr-scanner/
│   │   └── page.tsx
│   │
│   └── (.)location-select/
│       └── page.tsx
```

---

## State Management Strategy

### Global State (Zustand Store)

```typescript
// stores/appStore.ts
interface AppStore {
  // User & Auth
  user: User | null
  activeRole: UserRole
  setUser: (user: User | null) => void
  setActiveRole: (role: UserRole) => void

  // Notifications
  notifications: Notification[]
  unreadCount: number

  // Selection State (for navigation context)
  selectedJob: DeliveryJob | null
  selectedBid: Bid | null
  selectedChatThread: ChatThread | null

  // UI State
  isMobileMenuOpen: boolean
}
```

### Server State (React Query/SWR)

```typescript
// For data fetching from API
- useJobs()
- useJob(id)
- useWallet()
- useNotifications()
- useChatThreads()
```

---

## Migration Steps

### Step 1: Setup Infrastructure
1. ✅ Install Zustand: `npm install zustand`
2. ✅ Create stores/appStore.ts
3. ✅ Create app/(dashboard)/layout.tsx
4. ✅ Extract DashboardHeader, DashboardFooter to layout

### Step 2: Migrate Core Routes
1. ✅ Dashboard home page
2. ✅ Jobs listing and detail
3. ✅ Wallet pages
4. ✅ Settings pages

### Step 3: Update Navigation
1. ✅ Replace `navigateToScreen()` with Next.js `useRouter()`
2. ✅ Update all internal links to use `<Link>`
3. ✅ Create navigation helpers in utils/routing.ts

### Step 4: Migrate Remaining Screens
1. ✅ Chat, notifications, help
2. ✅ Proxy dashboard
3. ✅ Sponsorship flows
4. ✅ Payment flows (as modals)

### Step 5: Cleanup
1. ✅ Remove old dashboard/page.tsx
2. ✅ Remove hash navigation utilities
3. ✅ Update tests

---

## Breaking Changes & Compatibility

### URLs Change
**Before:** `app.prawnbox.com/dashboard#wallet`
**After:** `app.prawnbox.com/wallet`

### Navigation API
**Before:** `navigateToScreen('wallet')`
**After:** `router.push('/wallet')`

### State Access
**Before:** Props drilling through renderScreen()
**After:** `const { user, activeRole } = useAppStore()`

---

## Benefits After Refactor

1. **Performance**
   - ~90% reduction in initial bundle size
   - Lazy loading per route
   - Faster page transitions

2. **Developer Experience**
   - Easy to find code (routes = folders)
   - No merge conflicts
   - Better TypeScript inference

3. **User Experience**
   - Deep linking works
   - Browser back button works
   - Bookmarkable URLs
   - Better SEO

4. **Maintainability**
   - Each route is isolated
   - Shared layouts prevent duplication
   - Easy to add new routes

---

## Timeline Estimate

- **Phase 1 (Core Routes):** 2-3 days
- **Phase 2 (Role Routes):** 1 day
- **Phase 3 (Modals):** 1 day
- **Testing & Cleanup:** 1 day

**Total:** ~5-6 days for complete migration
