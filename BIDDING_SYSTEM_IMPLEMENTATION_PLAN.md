# Prawnbox Real-Time Bidding System - Implementation Plan

## Executive Summary
This plan outlines the implementation of a real-time bidding system for the Prawnbox delivery platform. The system will enable immediate job broadcasting, competitive bidding by Pals, and smart auto-assignment features to enhance user experience and reduce delivery assignment time from hours to minutes.

---

## 1. Current State Analysis

### Existing Infrastructure ✅
- **Bid Interface**: Already defined in `types/index.ts`
  ```typescript
  interface Bid {
    id: string;
    palId: string;
    palName: string;
    palRating: number;
    vehicleType: VehicleType;
    estimatedTime: string;
    amount: number;
    message: string;
    placedAt: string;
    canEdit: boolean;
    isAccepted?: boolean;
    createdAt: string;
  }
  ```
- **DeliveryJob**: Contains `bids[]` array and bidding-related fields
- **Screens**: BidsScreen, AcceptedBidsScreen, BidEditScreen components exist
- **API Types**: CreateBidRequest, UpdateBidRequest defined

### Gaps to Address ❌
1. No real-time bidding updates (WebSocket/polling)
2. No bidding duration/timeout logic
3. No automatic job broadcasting to nearby Pals
4. No smart pricing suggestions
5. No auto-assignment rules
6. Limited notification system for bidding events
7. No bidding mode selection (Open/Quick Accept/Direct)

---

## 2. Enhanced Database Schema

### 2.1 Extended `Bid` Interface
```typescript
export interface Bid {
  // Existing fields
  id: string;
  palId: string;
  palName: string;
  palRating: number;
  vehicleType: VehicleType;
  estimatedTime: string;
  amount: number;
  message: string;
  placedAt: string;
  canEdit: boolean;
  isAccepted?: boolean;
  createdAt: string;

  // NEW FIELDS
  palDistance: number; // km from pickup location
  palCompletedJobs: number; // Total completed deliveries
  palCompletionRate: number; // Percentage of successful deliveries
  estimatedPickupTime: string; // "15 mins", "30 mins"
  bidStatus: 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired';
  bidScore: number; // Calculated matching score (0-100)
  isLowestBid: boolean; // Flag if this is currently the lowest bid
  bidRank: number; // Ranking among all bids (1 = best)
  withdrawnAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}
```

### 2.2 Extended `DeliveryJob` Interface
```typescript
export interface DeliveryJob {
  // ... existing fields ...

  // NEW BIDDING FIELDS
  biddingConfig: {
    mode: 'open' | 'quick_accept' | 'direct_assign';
    duration: number; // milliseconds
    startedAt: string;
    endsAt: string;
    maxPrice: number; // Sender's maximum willing to pay
    suggestedPrice: number; // System-calculated price
    minBidDecrement: number; // Minimum difference between bids (₦50)
    autoAccept?: {
      enabled: boolean;
      maxPriceVariance: number; // e.g., 10% above suggested
      minPalRating: number; // e.g., 4.0
    };
  };

  biddingStatus: 'not_started' | 'active' | 'ended' | 'auto_assigned' | 'manually_assigned';
  lowestBidAmount?: number;
  lowestBidId?: string;
  totalBidsReceived: number;
  uniqueBiddersCount: number;

  // Broadcast settings
  broadcastRadius: number; // km - initial radius for Pal notifications
  broadcastHistory: {
    radius: number;
    timestamp: string;
    palsNotified: number;
  }[];

  // Assignment tracking
  assignmentMethod: 'auto' | 'manual' | 'direct';
  assignedAt?: string;
  timeToAssignment?: number; // milliseconds from post to assignment
}
```

### 2.3 New `BiddingNotification` Interface
```typescript
export interface BiddingNotification {
  id: string;
  jobId: string;
  userId: string; // Who receives this notification
  userRole: 'sender' | 'pal';
  type:
    | 'new_job_available'      // Pal: new job in area
    | 'first_bid_received'     // Sender: got first bid
    | 'new_lower_bid'          // Sender: new lowest bid
    | 'outbid'                 // Pal: someone bid lower
    | 'bid_accepted'           // Pal: your bid was accepted
    | 'bidding_ending_soon'    // Both: 5 mins remaining
    | 'bidding_ended'          // Both: time expired
    | 'auto_assigned'          // Both: job auto-assigned
    | 'no_bids_received';      // Sender: no bids yet

  title: string;
  message: string;
  data: {
    jobTitle: string;
    currentLowestBid?: number;
    yourBidAmount?: number;
    timeRemaining?: number; // milliseconds
    winningPalName?: string;
  };
  priority: 'low' | 'normal' | 'high' | 'urgent';
  read: boolean;
  actionRequired: boolean;
  createdAt: string;
}
```

### 2.4 New `PricingSuggestion` Interface
```typescript
export interface PricingSuggestion {
  jobId: string;
  basePrice: number;
  factors: {
    distance: { value: number; impact: number }; // km and ₦
    packageSize: { value: ItemSize; impact: number };
    urgency: { value: 'low' | 'medium' | 'high'; impact: number };
    timeOfDay: { value: string; impact: number }; // surge pricing
    traffic: { value: 'light' | 'moderate' | 'heavy'; impact: number };
    weather: { value: 'clear' | 'rain' | 'storm'; impact: number };
  };
  suggestedPrice: number;
  priceRange: { min: number; max: number };
  marketAverage: number; // Average price for similar deliveries
  competitiveBid: number; // Price likely to attract bids quickly
  calculatedAt: string;
}
```

---

## 3. Implementation Phases

### PHASE 1: Core Bidding Backend (Week 1-2)

#### 3.1 API Endpoints
```typescript
// Job Broadcasting
POST   /api/jobs                    // Enhanced to trigger broadcast
POST   /api/jobs/:id/broadcast      // Manual re-broadcast with wider radius

// Bidding
GET    /api/jobs/:id/bids           // Get all bids for a job (with live updates)
POST   /api/jobs/:id/bids           // Pal places a bid
PATCH  /api/bids/:id                // Edit bid (if allowed)
DELETE /api/bids/:id                // Withdraw bid
POST   /api/bids/:id/accept         // Sender accepts a bid

// Pricing
GET    /api/pricing/suggest?        // Get price suggestion
       pickup=lat,lng&
       dropoff=lat,lng&
       size=medium&
       urgency=high

// Notifications
GET    /api/notifications/bidding   // Get bidding-related notifications
POST   /api/notifications/:id/read  // Mark as read
```

#### 3.2 Real-Time Updates (WebSocket)
```typescript
// Socket Events
socket.on('job:new', (job) => {})           // New job broadcast
socket.on('bid:new', (bid) => {})           // New bid placed
socket.on('bid:update', (bid) => {})        // Bid updated
socket.on('bid:lowest', (bidId) => {})      // New lowest bid
socket.on('bid:accepted', (bidId) => {})    // Bid accepted
socket.on('bidding:ending', (jobId) => {})  // 5 mins warning
socket.on('bidding:ended', (jobId) => {})   // Bidding closed
socket.on('job:assigned', (assignment) => {}) // Job assigned

// Client subscribes to job updates
socket.emit('subscribe:job', jobId);
socket.emit('unsubscribe:job', jobId);
```

#### 3.3 Background Jobs (Node.js/Python)
```typescript
// Cron jobs or queue workers
1. BroadcastJob: Notify nearby Pals when job is posted
2. BiddingTimerJob: Check for expired bidding periods (every 30 seconds)
3. AutoAssignJob: Auto-assign when criteria met
4. NoBidsAlertJob: Alert sender if no bids after 10 mins
5. PriceRecalculationJob: Update price suggestions based on market data
```

---

### PHASE 2: Sender Experience (Week 3)

#### 3.4 Enhanced Job Posting Flow

**File**: `app/(dashboard)/jobs/post/page.tsx`

```typescript
// New sections to add
interface JobPostingForm {
  // ... existing fields ...

  biddingMode: 'open' | 'quick_accept' | 'direct_assign';
  biddingDuration: number; // minutes: 5, 15, 30
  maxPrice: number; // calculated or manual
  autoAccept: boolean;
  autoAcceptCriteria?: {
    maxPriceVariance: number; // percentage
    minPalRating: number;
  };
  preferredPalId?: string; // for direct assignment
}

// UI Components
1. BiddingModeSelector (Radio buttons with descriptions)
2. PricingSlider (shows suggested price + range)
3. AutoAcceptToggle (with criteria inputs)
4. PreferredPalPicker (dropdown of past Pals with good ratings)
```

**New Component**: `components/pricing/PricingSuggestionCard.tsx`
- Shows suggested price with breakdown
- Displays factors (distance, size, urgency)
- Allows manual override with warning if too low/high
- Shows market comparison

#### 3.5 Live Bid Management Interface

**File**: `app/(dashboard)/jobs/[id]/bids/page.tsx`

```typescript
// Real-time bid list with:
1. Live countdown timer
2. Bid cards with Pal details (rating, distance, ETA)
3. Lowest bid highlight
4. One-click "Accept Bid" button
5. Pal profile quick view
6. Bid comparison table
7. Auto-accept status indicator
8. Refresh/realtime indicator
```

**New Component**: `components/bidding/BidCard.tsx`
```typescript
interface BidCardProps {
  bid: Bid;
  isLowest: boolean;
  isRecommended: boolean; // Based on score
  onAccept: (bidId: string) => void;
  onViewPalProfile: (palId: string) => void;
}

// Features:
- Visual indicator for lowest bid (green border)
- Recommended tag (AI-powered)
- Pal stats: rating, completed jobs, vehicle type
- Quick actions: Accept, View Profile, Message
```

---

### PHASE 3: Pal Experience (Week 4)

#### 3.6 Available Jobs Feed (Real-time)

**File**: `app/(dashboard)/jobs/page.tsx`

```typescript
// Enhanced job list with:
1. Real-time updates (new jobs appear instantly)
2. Map view with jobs as pins
3. Distance filter (< 5km, < 10km, < 20km)
4. Price range filter
5. Package size filter
6. Sorting: Nearest first, Highest pay, Ending soon
7. "Quick Bid" button on each job card
```

**New Component**: `components/jobs/JobMapView.tsx`
- Interactive map showing available jobs
- Color-coded by urgency/time remaining
- Click marker to see job details + quick bid
- Current location indicator

#### 3.7 Quick Bidding Interface

**New Component**: `components/bidding/QuickBidModal.tsx`
```typescript
interface QuickBidModalProps {
  job: DeliveryJob;
  onSubmit: (bid: CreateBidRequest) => void;
  onCancel: () => void;
}

// Features:
- Pre-filled bid amount (suggested competitive bid)
- ETA selector ("15 mins", "30 mins", "1 hour")
- Optional message input
- Vehicle type selector
- "Place Bid" button
- Shows: current lowest bid, time remaining, your distance to pickup
```

#### 3.8 My Bids Dashboard

**File**: `app/(dashboard)/jobs/bids/page.tsx`

```typescript
// Tabs:
1. Active Bids (pending/leading/outbid status)
2. Won Bids (accepted)
3. Lost Bids (rejected/expired)

// Each bid shows:
- Job details
- Your bid amount vs current lowest
- Status: "Leading" (green), "Outbid" (yellow), "Time ending" (red)
- Time remaining countdown
- Quick actions: Edit (if allowed), Withdraw
```

---

### PHASE 4: Smart Features (Week 5)

#### 3.9 Auto-Assignment Logic

**File**: `utils/bidding/autoAssign.ts`

```typescript
interface AutoAssignmentRules {
  // Rule 1: Single qualifying bid
  singleBidTimeout: number; // 5 mins - if only 1 bid, auto-assign

  // Rule 2: Sender inactive
  senderNoResponseTimeout: number; // 15 mins - assign to best bid

  // Rule 3: Auto-accept criteria met
  autoAcceptCriteria: {
    enabled: boolean;
    maxPriceVariance: number;
    minPalRating: number;
  };

  // Rule 4: Bidding expired
  biddingExpired: boolean; // Assign to lowest/best bid
}

function calculateBestBid(bids: Bid[]): Bid {
  // Scoring algorithm
  bids.forEach(bid => {
    bid.bidScore =
      (bid.palRating / 5) * 40 +           // 40% weight
      (1 - bid.palDistance / maxDistance) * 30 + // 30% weight
      (bid.palCompletionRate / 100) * 15 + // 15% weight
      (1 - bid.estimatedPickupMinutes / maxPickupTime) * 10 + // 10% weight
      (1 - bid.amount / maxAmount) * 5;    // 5% weight
  });

  return bids.sort((a, b) => b.bidScore - a.bidScore)[0];
}
```

#### 3.10 Dynamic Pricing Algorithm

**File**: `utils/pricing/calculate.ts`

```typescript
interface PricingFactors {
  baseRate: number;          // ₦500 base
  perKmRate: number;         // ₦100/km
  packageMultiplier: {       // Size premium
    small: 1.0,
    medium: 1.2,
    large: 1.5,
    xlarge: 2.0
  };
  urgencyMultiplier: {       // Time premium
    standard: 1.0,           // Next day
    same_day: 1.3,
    express: 1.7,            // < 3 hours
    urgent: 2.5              // < 1 hour
  };
  surgeMultiplier: {         // Peak hours
    morning: 1.2,            // 7-9am
    lunch: 1.15,             // 12-2pm
    evening: 1.3,            // 5-8pm
    night: 1.1,              // 8pm-12am
    default: 1.0
  };
  trafficMultiplier: {
    light: 1.0,
    moderate: 1.1,
    heavy: 1.25
  };
}

function calculateSuggestedPrice(params: JobParams): PricingSuggestion {
  const {
    distance,
    packageSize,
    urgency,
    pickupTime,
    weather,
    traffic
  } = params;

  const basePrice = PRICING.baseRate + (distance * PRICING.perKmRate);

  const sizeImpact = basePrice * (PRICING.packageMultiplier[packageSize] - 1);
  const urgencyImpact = basePrice * (PRICING.urgencyMultiplier[urgency] - 1);
  const surgeImpact = basePrice * (getSurgeMultiplier(pickupTime) - 1);
  const trafficImpact = basePrice * (PRICING.trafficMultiplier[traffic] - 1);

  const suggestedPrice = Math.round(
    basePrice +
    sizeImpact +
    urgencyImpact +
    surgeImpact +
    trafficImpact
  );

  return {
    jobId: params.jobId,
    basePrice,
    factors: {
      distance: { value: distance, impact: distance * PRICING.perKmRate },
      packageSize: { value: packageSize, impact: sizeImpact },
      urgency: { value: urgency, impact: urgencyImpact },
      timeOfDay: { value: pickupTime, impact: surgeImpact },
      traffic: { value: traffic, impact: trafficImpact },
      weather: { value: weather, impact: 0 }
    },
    suggestedPrice,
    priceRange: {
      min: Math.round(suggestedPrice * 0.8),
      max: Math.round(suggestedPrice * 1.2)
    },
    marketAverage: await getMarketAverage(params),
    competitiveBid: Math.round(suggestedPrice * 0.9),
    calculatedAt: new Date().toISOString()
  };
}
```

#### 3.11 Notification System

**File**: `utils/notifications/biddingNotifications.ts`

```typescript
// Notification templates
const NOTIFICATION_TEMPLATES = {
  new_job_available: {
    sender: (job: DeliveryJob) => ({
      title: "New Delivery Available!",
      message: `${job.title} - ${job.distance}km away - ₦${job.biddingConfig.suggestedPrice}`,
      priority: job.biddingConfig.mode === 'quick_accept' ? 'urgent' : 'high'
    })
  },

  first_bid_received: {
    receiver: (bid: Bid) => ({
      title: "You got your first bid!",
      message: `${bid.palName} bid ₦${bid.amount} for your delivery`,
      priority: 'high',
      actionRequired: true
    })
  },

  new_lower_bid: {
    receiver: (bid: Bid, previousLow: number) => ({
      title: "New lower bid received",
      message: `₦${bid.amount} (was ₦${previousLow})`,
      priority: 'normal'
    })
  },

  outbid: {
    sender: (job: DeliveryJob, yourBid: Bid, lowestBid: Bid) => ({
      title: "You've been outbid",
      message: `New lowest bid: ₦${lowestBid.amount} (yours: ₦${yourBid.amount})`,
      priority: 'normal',
      actionRequired: true
    })
  },

  bidding_ending_soon: {
    both: (job: DeliveryJob) => ({
      title: "Bidding ends in 5 minutes",
      message: `${job.title} - ${job.bids.length} bids received`,
      priority: 'high'
    })
  },

  bid_accepted: {
    sender: (job: DeliveryJob) => ({
      title: "Your bid was accepted!",
      message: `Get ready to pick up ${job.title}`,
      priority: 'urgent',
      actionRequired: true
    })
  }
};

// Push notification sender
async function sendBiddingNotification(
  userId: string,
  type: BiddingNotificationType,
  data: NotificationData
) {
  const notification = NOTIFICATION_TEMPLATES[type](data);

  // Send via multiple channels
  await Promise.all([
    sendPushNotification(userId, notification),
    saveToDatabase(userId, { ...notification, type }),
    sendInAppNotification(userId, notification)
  ]);
}
```

---

### PHASE 5: UI/UX Enhancements (Week 6)

#### 3.12 Components to Create/Update

**New Components:**
```
components/
├── bidding/
│   ├── BidCard.tsx                  // Individual bid display
│   ├── BidList.tsx                  // List of bids with sorting
│   ├── BidComparison.tsx            // Side-by-side bid comparison
│   ├── QuickBidModal.tsx            // Pal's quick bid interface
│   ├── BiddingStatusBar.tsx         // Live countdown + stats
│   └── BiddingModeSelector.tsx      // Job posting mode selection
│
├── pricing/
│   ├── PricingSuggestionCard.tsx    // Price breakdown
│   ├── PriceRangeSlider.tsx         // Max price input
│   └── MarketComparisonChart.tsx    // Historical price data
│
├── jobs/
│   ├── JobMapView.tsx               // Map with job markers
│   ├── JobFilterPanel.tsx           // Distance/price filters
│   └── AvailableJobCard.tsx         // Enhanced job card for Pals
│
└── notifications/
    ├── BiddingNotificationBadge.tsx // Header badge
    └── BiddingNotificationList.tsx  // Notification feed
```

**Updated Components:**
```
app/(dashboard)/jobs/
├── page.tsx                         // Available jobs (Pal view)
├── post/page.tsx                    // Enhanced posting form
├── [id]/bids/page.tsx               // Live bid management
└── bids/page.tsx                    // My bids dashboard

components/
├── AcceptedBidsScreen.tsx           // Add real-time updates
├── BidsScreen.tsx                   // Add live bid updates
└── dashboard/QuickActionsCard.tsx   // Add "Active Bids" counter
```

#### 3.13 Design Specifications

**Color System:**
```typescript
const BIDDING_COLORS = {
  lowest_bid: '#22c55e',      // Green - Leading/best bid
  outbid: '#f59e0b',          // Orange - Outbid warning
  ending_soon: '#ef4444',     // Red - Urgency
  accepted: '#8b5cf6',        // Purple - Success
  pending: '#6b7280',         // Gray - Waiting
  auto_assign: '#3b82f6'      // Blue - Auto-assigned
};
```

**Animations:**
- New bid arrival: Slide-in from right
- Lowest bid change: Pulse animation
- Countdown timer: Color shift (green → yellow → red)
- Auto-accept: Confetti effect

---

## 4. Testing Strategy

### 4.1 Unit Tests
```typescript
// Pricing algorithm
test('calculates correct base price', () => {});
test('applies surge pricing correctly', () => {});
test('respects min/max price limits', () => {});

// Bid scoring
test('ranks bids by score correctly', () => {});
test('prioritizes higher-rated Pals', () => {});

// Auto-assignment
test('auto-assigns after timeout', () => {});
test('auto-accepts qualifying bid', () => {});
```

### 4.2 Integration Tests
```typescript
// End-to-end bidding flow
test('sender posts job → pals receive notification', async () => {});
test('pal places bid → sender receives notification', async () => {});
test('sender accepts bid → pal gets assignment', async () => {});
test('bidding expires → best bid auto-assigned', async () => {});
```

### 4.3 Load Testing
- Simulate 100 concurrent jobs
- 500 Pals bidding simultaneously
- WebSocket connection stability
- Database query performance

---

## 5. Deployment Plan

### 5.1 Feature Flags
```typescript
const FEATURE_FLAGS = {
  REAL_TIME_BIDDING: true,
  AUTO_ASSIGNMENT: true,
  DYNAMIC_PRICING: true,
  QUICK_ACCEPT_MODE: true,
  PUSH_NOTIFICATIONS: true,
  MAP_VIEW: false // Rollout later
};
```

### 5.2 Phased Rollout
1. **Internal Testing (Week 7)**: Test with team members
2. **Beta Users (Week 8)**: 10% of active users
3. **Gradual Rollout (Week 9-10)**: 25% → 50% → 100%
4. **Monitor & Optimize (Ongoing)**

### 5.3 Monitoring & Metrics
```typescript
// Key metrics to track
const KPIs = {
  averageTimeToFirstBid: number;      // Target: < 2 mins
  averageTimeToAssignment: number;    // Target: < 10 mins
  biddingParticipationRate: number;   // Target: > 60% of nearby Pals
  autoAssignmentRate: number;         // Target: 30-40%
  priceAccuracyScore: number;         // Actual vs suggested price variance
  bidCompetitionIndex: number;        // Average bids per job (Target: 3-5)
};
```

---

## 6. Success Criteria

### Phase 1-2 (Weeks 1-3)
- [ ] Jobs broadcast to Pals within 5 seconds of posting
- [ ] Real-time bid updates working (< 1 second latency)
- [ ] Pricing suggestions accurate within ±15% of market rates
- [ ] Sender can accept bids with single click

### Phase 3-4 (Weeks 4-5)
- [ ] Pals receive push notifications for nearby jobs
- [ ] Quick bid submission in < 30 seconds
- [ ] Auto-assignment working for 80%+ of eligible cases
- [ ] Notification delivery rate > 95%

### Phase 5-6 (Weeks 6-7)
- [ ] UI loads in < 2 seconds
- [ ] Mobile experience smooth (60fps animations)
- [ ] Zero critical bugs in production
- [ ] User satisfaction score > 4.5/5

### Overall Goals (Week 10)
- [ ] 75% reduction in time-to-assignment (from hours to < 10 mins)
- [ ] 50% increase in job completion rate
- [ ] 40% increase in Pal participation
- [ ] 90% of senders satisfied with pricing
- [ ] 85% of jobs get 3+ competitive bids

---

## 7. Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebSocket connection drops | High | Auto-reconnect + fallback to polling |
| Bid spam/abuse | Medium | Rate limiting + captcha for new users |
| Pricing algorithm inaccurate | High | A/B test + manual override option |
| No bids received | High | Auto-broadcast to wider radius + price suggestions |
| Server overload (many concurrent jobs) | High | Queue system + horizontal scaling |
| Push notification failures | Medium | SMS fallback + in-app badge |

---

## 8. Future Enhancements (Post-Launch)

1. **AI-Powered Matching**: Machine learning to predict best Pal for each job
2. **Recurring Deliveries**: Auto-assign to preferred Pal based on history
3. **Bulk Job Posting**: Post multiple deliveries at once with bulk bidding
4. **Pal Availability Calendar**: Let Pals set available hours for auto-matching
5. **Video Verification**: QR code + video scan for secure handoffs
6. **Gamification**: Badges for fastest bidders, most accepted bids, etc.
7. **Analytics Dashboard**: Sender can see average prices, bid trends over time

---

## Timeline Summary

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1**: Backend | 2 weeks | APIs, WebSockets, background jobs |
| **Phase 2**: Sender UX | 1 week | Enhanced posting, bid management |
| **Phase 3**: Pal UX | 1 week | Job feed, quick bidding |
| **Phase 4**: Smart Features | 1 week | Auto-assign, pricing algorithm |
| **Phase 5**: UI Polish | 1 week | Components, animations |
| **Phase 6**: Testing | 1 week | Unit, integration, load tests |
| **Phase 7**: Beta Launch | 1 week | Internal testing |
| **Phase 8**: Rollout | 2 weeks | Gradual user migration |
| **Total** | **10 weeks** | Full production launch |

---

## Next Steps

1. **Approval**: Review and approve this plan
2. **Resource Allocation**: Assign developers, designers
3. **Sprint Planning**: Break down into 2-week sprints
4. **Kickoff**: Start with Phase 1 backend development
5. **Weekly Check-ins**: Monitor progress, adjust timeline as needed

---

**Document Version**: 1.0
**Created**: January 2025
**Owner**: Development Team
**Status**: Awaiting Approval
