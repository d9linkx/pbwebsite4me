# Migration Guide: Monolith to App Router

## 🎉 What's Been Completed

### ✅ Infrastructure Setup
1. **Zustand State Management** - `stores/appStore.ts`
   - Global state store replacing 32+ useState hooks
   - Persistent storage for user and auth data
   - Convenience selectors for common state access

2. **Dashboard Layout** - `app/(dashboard)/layout.tsx`
   - Shared layout for all dashboard pages
   - Includes DashboardHeader and DashboardFooter
   - Auto-handles auth redirects
   - Manages role switching globally

### ✅ Migrated Routes

#### Dashboard Home
- **Route:** `app/(dashboard)/page.tsx`
- **URL:** `app.prawnbox.com/`
- **Component:** DashboardScreen
- **Features:** Role-specific stats, quick actions

#### Jobs Routes
1. **Available Jobs** - `app/(dashboard)/jobs/page.tsx`
   - URL: `/jobs`
   - Lists jobs available for bidding

2. **Post Delivery** - `app/(dashboard)/jobs/post/page.tsx`
   - URL: `/jobs/post`
   - Form to create new delivery

3. **My Deliveries** - `app/(dashboard)/jobs/my-deliveries/page.tsx`
   - URL: `/jobs/my-deliveries`
   - User's delivery history with filters
   - Query params: `?filter=active` or `?filter=completed`

---

## 📋 Migration Checklist

### Remaining Routes to Migrate

#### High Priority (Core Functionality)

- [ ] **Wallet Routes**
  ```
  app/(dashboard)/wallet/
  ├── page.tsx              # Wallet overview
  ├── add-funds/page.tsx    # Add funds flow
  ├── withdraw/page.tsx     # Withdraw flow
  └── transactions/page.tsx # Transaction history
  ```
  - Component: `WalletScreen`, `WalletAddFundsScreen`, `WalletWithdrawScreen`
  - State: `user.walletBalance`, `pendingBid`

- [ ] **Settings Routes**
  ```
  app/(dashboard)/settings/
  ├── page.tsx              # Settings overview
  ├── profile/page.tsx      # ProfileInformationScreen
  ├── verification/page.tsx # VerificationScreen
  └── payment-methods/page.tsx # PaymentMethodsScreen
  ```

- [ ] **Job Detail (Dynamic Route)**
  ```
  app/(dashboard)/jobs/[id]/
  ├── page.tsx              # Job detail view
  ├── bids/page.tsx         # Bids for this job
  └── tracking/page.tsx     # Live tracking
  ```
  - Get job ID from URL params: `const params = useParams()`
  - Load job from store: `deliveryJobs.find(j => j.id === params.id)`

#### Medium Priority

- [ ] **Chat Routes**
  ```
  app/(dashboard)/chat/
  ├── page.tsx              # Chat list (ChatScreen)
  └── [threadId]/page.tsx   # Chat thread
  ```

- [ ] **Notifications**
  ```
  app/(dashboard)/notifications/page.tsx
  ```
  - Use query param for tab: `?tab=alerts` or `?tab=general`
  - Component: `NotificationsScreen`

- [ ] **Proxy Routes**
  ```
  app/(dashboard)/proxy/
  ├── page.tsx              # ProxyDashboard
  └── items/[id]/page.tsx   # Item detail
  ```

- [ ] **Help Routes**
  ```
  app/(dashboard)/help/
  ├── page.tsx              # HelpCenterScreen
  └── contact/page.tsx      # ContactSupportScreen
  ```

#### Low Priority (Secondary Features)

- [ ] **Sponsorship**
  ```
  app/(dashboard)/sponsorship/
  ├── page.tsx              # Overview
  ├── search/page.tsx       # SponsorUserSearchScreen
  └── manage/page.tsx       # SponsorshipManagementScreen
  ```

- [ ] **Referrals**
  ```
  app/(dashboard)/referrals/page.tsx
  ```

- [ ] **Ratings**
  ```
  app/(dashboard)/ratings/page.tsx
  ```

---

## 🛠️ How to Migrate a Screen

### Step 1: Create the Route File

```bash
# Example: Migrating the wallet page
mkdir -p app/(dashboard)/wallet
touch app/(dashboard)/wallet/page.tsx
```

### Step 2: Create the Page Component

```tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { WalletScreen } from '@/components/WalletScreen'
import { useAppStore } from '@/stores/appStore'

export default function WalletPage() {
  const router = useRouter()

  // Get state from store
  const { user, updateUser } = useAppStore()

  // Handle navigation
  const handleNavigate = (route: string) => {
    router.push(route)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <WalletScreen
        user={user}
        onNavigate={handleNavigate}
        onBack={handleBack}
        // ... other props
      />
    </div>
  )
}
```

### Step 3: Update Navigation References

In the old system, navigation was done via:
```tsx
navigateToScreen('wallet')
```

In the new system, use:
```tsx
router.push('/wallet')
```

Update the `handleNavigate` function in `app/(dashboard)/layout.tsx` to include your new route in the `screenToRouteMap`.

### Step 4: Test the Route

1. Run dev server: `npm run dev`
2. Navigate to `http://localhost:3000/wallet`
3. Test navigation to/from the page
4. Verify state persistence

---

## 🎯 Dynamic Routes

### Example: Job Detail Page

```tsx
// app/(dashboard)/jobs/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { deliveryJobs, setSelectedJob } = useAppStore()

  // Get job from URL
  const jobId = params.id as string
  const job = deliveryJobs.find(j => j.id === jobId)

  useEffect(() => {
    if (job) {
      setSelectedJob(job)
    }
  }, [job, setSelectedJob])

  if (!job) {
    return <div>Job not found</div>
  }

  return (
    <div>
      <h1>{job.title}</h1>
      {/* Job details */}
    </div>
  )
}
```

---

## 📦 State Management Patterns

### Reading State

```tsx
// Get single value
const user = useAppStore(state => state.user)

// Get multiple values
const { user, activeRole, notifications } = useAppStore()

// Use selector
const unreadCount = useAppStore(selectUnreadCount)
```

### Updating State

```tsx
// Direct setter
const { setUser, setActiveRole } = useAppStore()
setUser(newUser)
setActiveRole('pal')

// Update user fields
const { updateUser } = useAppStore()
updateUser({ walletBalance: 1000 })

// Add to collection
const { addDeliveryJob } = useAppStore()
addDeliveryJob(newJob)
```

### Persist State

The store automatically persists:
- `user`
- `activeRole`
- `deliveryJobs`
- `notifications`

Other state (UI, selections) is session-only.

---

## 🔗 Navigation Mapping

| Old Screen | New Route | Component |
|-----------|-----------|-----------|
| `dashboard` | `/` | DashboardScreen |
| `available-jobs` | `/jobs` | AvailableJobsScreen |
| `post-delivery` | `/jobs/post` | PostDeliveryScreen |
| `my-deliveries` | `/jobs/my-deliveries` | SentDeliveriesHistoryScreen |
| `wallet` | `/wallet` | WalletScreen |
| `wallet-add-funds` | `/wallet/add-funds` | WalletAddFundsScreen |
| `settings` | `/settings` | SettingsScreen |
| `profile-information` | `/settings/profile` | ProfileInformationScreen |
| `chat` | `/chat` | ChatScreen |
| `notifications` | `/notifications` | NotificationsScreen |
| `help-center` | `/help` | HelpCenterScreen |
| `proxy-dashboard` | `/proxy` | ProxyDashboard |

---

## 🚨 Breaking Changes

### 1. URL Structure
**Before:** `app.prawnbox.com/dashboard#wallet`
**After:** `app.prawnbox.com/wallet`

### 2. Navigation API
**Before:** `navigateToScreen('wallet')`
**After:** `router.push('/wallet')`

### 3. State Access
**Before:** Props drilling through renderScreen
**After:** `useAppStore()` hook

### 4. Component Mounting
**Before:** All screens loaded upfront
**After:** Lazy loaded per route

---

## 🧪 Testing Checklist

For each migrated route:
- [ ] Direct URL access works
- [ ] Browser back/forward buttons work
- [ ] State persists across navigation
- [ ] Auth guard redirects to login if needed
- [ ] Mobile responsive
- [ ] Shared header/footer render correctly
- [ ] Role switcher updates content

---

## 📝 Migration Progress Tracker

Track your progress by checking off routes as you migrate them:

**Core Routes (Phase 1)**
- [x] Dashboard home
- [x] Jobs listing
- [x] Post delivery
- [x] My deliveries
- [ ] Wallet
- [ ] Settings

**Secondary Routes (Phase 2)**
- [ ] Chat
- [ ] Notifications
- [ ] Help
- [ ] Proxy dashboard

**Detail Routes (Phase 3)**
- [ ] Job detail `/jobs/[id]`
- [ ] Chat thread `/chat/[threadId]`

**Advanced Routes (Phase 4)**
- [ ] Sponsorship
- [ ] Referrals
- [ ] Ratings

---

## 🎓 Next Steps

1. **Migrate Wallet Routes** (highest user impact)
   - Users need to add funds and withdraw
   - Critical for payment flows

2. **Migrate Settings Routes**
   - Profile, verification, payment methods
   - Important for onboarding

3. **Create Job Detail Page**
   - Dynamic route with job ID
   - Needed for viewing job details, bids, tracking

4. **Migrate Remaining Screens**
   - Follow the pattern established
   - Reference existing migrated pages

5. **Remove Old Code**
   - Once all routes are migrated, delete `app/dashboard/page.tsx` (6,586 lines!)
   - Remove hash navigation utilities
   - Clean up unused imports

---

## 💡 Tips & Best Practices

1. **One route at a time** - Don't rush, test each thoroughly

2. **Reuse existing components** - The screen components (`WalletScreen`, etc.) still work, just wrap them in route pages

3. **Handle missing data gracefully** - Check if job/user exists before rendering

4. **Use TypeScript** - Leverage type safety for route params

5. **Test on mobile** - Dashboard layout is responsive

6. **Check console** - Old `navigateToScreen` calls will show warnings

7. **Keep old page.tsx** - Don't delete the monolith until migration is 100% complete

---

## 🐛 Common Issues

### Issue: "Cannot find module '@/components/...'"
**Solution:** Check import path, ensure component file exists

### Issue: "user is null"
**Solution:** Check auth guard in layout, ensure user is loaded from auth hook

### Issue: "Page not found"
**Solution:** Verify route file is in correct location and named `page.tsx`

### Issue: "State not persisting"
**Solution:** Check Zustand persist config, ensure you're using the correct store methods

### Issue: "Navigation not working"
**Solution:** Use `router.push()` instead of `navigateToScreen()`, update layout mapping

---

## 📞 Need Help?

- Check existing migrated routes for examples
- Review the `REFACTOR_PLAN.md` for architecture details
- Test in development before pushing to production
- Commit frequently as you migrate each route

Good luck with the migration! 🚀
