/**
 * Global Application Store (Zustand)
 *
 * Manages shared state across the dashboard application.
 * Replaces the 32+ useState hooks from the monolithic dashboard/page.tsx
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {
  User,
  UserRole,
  DeliveryJob,
  Bid,
  ProxyItem,
  ChatThread,
  Notification,
  Screen,
  DisputeResolution,
  FavoritePalData,
  ProxyUserData,
} from '@/types/index'
import { notificationListener } from '@/utils/notificationListener'

interface AppState {
  // ========================================
  // User & Authentication
  // ========================================
  user: User | null
  activeRole: UserRole
  setUser: (user: User | null) => void
  setActiveRole: (role: UserRole) => void
  updateUser: (updates: Partial<User>) => void

  // ========================================
  // Selection State (Navigation Context)
  // ========================================
  selectedJob: DeliveryJob | null
  selectedBid: Bid | null
  selectedPal: User | null
  selectedChatThread: ChatThread | null
  selectedProxyItem: ProxyItem | null
  selectedNotification: Notification | null
  selectedFavoritePal: FavoritePalData | null
  selectedProxyReceiver: ProxyUserData | null

  setSelectedJob: (job: DeliveryJob | null) => void
  setSelectedBid: (bid: Bid | null) => void
  setSelectedPal: (pal: User | null) => void
  setSelectedChatThread: (thread: ChatThread | null) => void
  setSelectedProxyItem: (item: ProxyItem | null) => void
  setSelectedNotification: (notification: Notification | null) => void
  setSelectedFavoritePal: (pal: FavoritePalData | null) => void
  setSelectedProxyReceiver: (receiver: ProxyUserData | null) => void

  // ========================================
  // Data Collections
  // ========================================
  deliveryJobs: DeliveryJob[]
  proxyItems: ProxyItem[]
  chatThreads: ChatThread[]
  notifications: Notification[]

  setDeliveryJobs: (jobs: DeliveryJob[]) => void
  setProxyItems: (items: ProxyItem[]) => void
  setChatThreads: (threads: ChatThread[]) => void
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void
  initializeNotifications: (user: User) => void
  cleanupNotifications: () => void
  addDeliveryJob: (job: DeliveryJob) => void
  updateDeliveryJob: (jobId: string, updates: Partial<DeliveryJob>) => void
  removeDeliveryJob: (jobId: string) => void

  // ========================================
  // UI State
  // ========================================
  isMobileMenuOpen: boolean
  notificationTab: 'alerts' | 'general'
  showCompletedDeliveries: boolean

  setMobileMenuOpen: (open: boolean) => void
  setNotificationTab: (tab: 'alerts' | 'general') => void
  setShowCompletedDeliveries: (show: boolean) => void

  // ========================================
  // Processing Job State (minimized bar)
  // ========================================
  processingJob: DeliveryJob | null
  isProcessingMinimized: boolean
  processingBidCount: number

  setProcessingJob: (job: DeliveryJob | null) => void
  setProcessingMinimized: (minimized: boolean) => void
  setProcessingBidCount: (count: number) => void
  clearProcessingJob: () => void

  // ========================================
  // Flow Context (for multi-step flows)
  // ========================================
  locationSelectionContext: {
    type: 'pickup' | 'dropoff'
    returnScreen: Screen
  } | null

  paymentContext: {
    amount: number
    purpose: string
    returnScreen: Screen
    paymentReference?: string
  } | null

  scanContext: 'pickup' | 'delivery' | 'proxy-handover' | 'receiver-unavailable'
  scanCompleted: boolean
  scanningProxyItem: ProxyItem | null

  setLocationSelectionContext: (context: AppState['locationSelectionContext']) => void
  setPaymentContext: (context: AppState['paymentContext']) => void
  setScanContext: (context: AppState['scanContext']) => void
  setScanCompleted: (completed: boolean) => void
  setScanningProxyItem: (item: ProxyItem | null) => void

  // ========================================
  // Dispute & Resolution
  // ========================================
  currentDispute: DisputeResolution | null
  violationFee: number
  refundAmount: number
  disputeTimer: number

  setCurrentDispute: (dispute: DisputeResolution | null) => void
  setViolationFee: (fee: number) => void
  setRefundAmount: (amount: number) => void
  setDisputeTimer: (timer: number) => void

  // ========================================
  // Sponsorship Flow
  // ========================================
  selectedAspiringPal: User | null
  sponsorshipData: {
    amount: number
    paymentMethod: string
    message: string
    isAnonymous: boolean
    sponsorPercentage?: number
    duration?: number
    startDate?: string
    endDate?: string
    escrowId?: string
    status?: string
  } | null

  setSelectedAspiringPal: (pal: User | null) => void
  setSponsorshipData: (data: AppState['sponsorshipData']) => void

  // ========================================
  // Pending Actions (for resuming flows)
  // ========================================
  pendingBid: {
    jobId: string
    bidAmount: number
    job: DeliveryJob
  } | null

  setPendingBid: (bid: AppState['pendingBid']) => void

  // ========================================
  // Timers
  // ========================================
  globalPickupTimers: { [jobId: string]: number }
  updatePickupTimer: (jobId: string, timerValue: number) => void

  // ========================================
  // Utility Actions
  // ========================================
  reset: () => void // Clear all state (for logout)
}

const initialState = {
  // User & Auth
  user: null,
  activeRole: 'sender' as UserRole,

  // Selections
  selectedJob: null,
  selectedBid: null,
  selectedPal: null,
  selectedChatThread: null,
  selectedProxyItem: null,
  selectedNotification: null,
  selectedFavoritePal: null,
  selectedProxyReceiver: null,

  // Collections
  deliveryJobs: [],
  proxyItems: [],
  chatThreads: [],
  notifications: [],

  // UI State
  isMobileMenuOpen: false,
  notificationTab: 'alerts' as const,
  showCompletedDeliveries: false,

  // Processing Job State
  processingJob: null,
  isProcessingMinimized: false,
  processingBidCount: 0,

  // Flow Context
  locationSelectionContext: null,
  paymentContext: null,
  scanContext: 'pickup' as const,
  scanCompleted: false,
  scanningProxyItem: null,

  // Dispute
  currentDispute: null,
  violationFee: 0,
  refundAmount: 0,
  disputeTimer: 600,

  // Sponsorship
  selectedAspiringPal: null,
  sponsorshipData: null,

  // Pending Actions
  pendingBid: null,

  // Timers
  globalPickupTimers: {},
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // ========================================
        // User & Auth Actions
        // ========================================
        setUser: (user) => set({ 
          user, 
          // Clear processing job when user changes (login/logout)
          processingJob: null,
          isProcessingMinimized: false,
          processingBidCount: 0
        }),
        setActiveRole: (activeRole) => set({ activeRole }),
        updateUser: (updates) => set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

        // ========================================
        // Notification Actions
        // ========================================
        initializeNotifications: async (user) => {
          try {
            await notificationListener.initialize(user)
            
            // Set up real-time notification handler
            notificationListener.onNotification((notification) => {
              set((state) => ({
                notifications: [notification, ...state.notifications]
              }))
            })
            
            console.log('✅ Notifications initialized for user:', user.userName)
          } catch (error) {
            console.error('❌ Failed to initialize notifications:', error)
          }
        },
        
        cleanupNotifications: () => {
          notificationListener.disconnect()
        },

        addNotification: (notification) => set((state) => ({
          notifications: [notification, ...state.notifications]
        })),

        markNotificationAsRead: (notificationId) => set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === notificationId ? { ...notif, read: true } : notif
          )
        })),

        markAllNotificationsAsRead: () => set((state) => ({
          notifications: state.notifications.map((notif) => ({ ...notif, read: true }))
        })),

        // ========================================
        // Selection Actions
        // ========================================
        setSelectedJob: (selectedJob) => set({ selectedJob }),
        setSelectedBid: (selectedBid) => set({ selectedBid }),
        setSelectedPal: (selectedPal) => set({ selectedPal }),
        setSelectedChatThread: (selectedChatThread) => set({ selectedChatThread }),
        setSelectedProxyItem: (selectedProxyItem) => set({ selectedProxyItem }),
        setSelectedNotification: (selectedNotification) => set({ selectedNotification }),
        setSelectedFavoritePal: (selectedFavoritePal) => set({ selectedFavoritePal }),
        setSelectedProxyReceiver: (selectedProxyReceiver) => set({ selectedProxyReceiver }),

        // ========================================
        // Data Collection Actions
        // ========================================
        setDeliveryJobs: (deliveryJobs) => set({ deliveryJobs }),
        setProxyItems: (proxyItems) => set({ proxyItems }),
        setChatThreads: (chatThreads) => set({ chatThreads }),
        setNotifications: (notifications) => set({ notifications }),

        addDeliveryJob: (job) => set((state) => ({
          deliveryJobs: [...state.deliveryJobs, job],
        })),

        updateDeliveryJob: (jobId, updates) => set((state) => ({
          deliveryJobs: state.deliveryJobs.map((job) =>
            job.id === jobId ? { ...job, ...updates } : job
          ),
        })),

        removeDeliveryJob: (jobId) => set((state) => ({
          deliveryJobs: state.deliveryJobs.filter((job) => job.id !== jobId),
        })),

        // ========================================
        // UI Actions
        // ========================================
        setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
        setNotificationTab: (notificationTab) => set({ notificationTab }),
        setShowCompletedDeliveries: (showCompletedDeliveries) => set({ showCompletedDeliveries }),

        // ========================================
        // Processing Job Actions
        // ========================================
        setProcessingJob: (processingJob) => set({ processingJob }),
        setProcessingMinimized: (isProcessingMinimized) => set({ isProcessingMinimized }),
        setProcessingBidCount: (processingBidCount) => set({ processingBidCount }),
        clearProcessingJob: () => set({
          processingJob: null,
          isProcessingMinimized: false,
          processingBidCount: 0
        }),

        // ========================================
        // Flow Context Actions
        // ========================================
        setLocationSelectionContext: (locationSelectionContext) => set({ locationSelectionContext }),
        setPaymentContext: (paymentContext) => set({ paymentContext }),
        setScanContext: (scanContext) => set({ scanContext }),
        setScanCompleted: (scanCompleted) => set({ scanCompleted }),
        setScanningProxyItem: (scanningProxyItem) => set({ scanningProxyItem }),

        // ========================================
        // Dispute Actions
        // ========================================
        setCurrentDispute: (currentDispute) => set({ currentDispute }),
        setViolationFee: (violationFee) => set({ violationFee }),
        setRefundAmount: (refundAmount) => set({ refundAmount }),
        setDisputeTimer: (disputeTimer) => set({ disputeTimer }),

        // ========================================
        // Sponsorship Actions
        // ========================================
        setSelectedAspiringPal: (selectedAspiringPal) => set({ selectedAspiringPal }),
        setSponsorshipData: (sponsorshipData) => set({ sponsorshipData }),

        // ========================================
        // Pending Actions
        // ========================================
        setPendingBid: (pendingBid) => set({ pendingBid }),

        // ========================================
        // Timer Actions
        // ========================================
        updatePickupTimer: (jobId, timerValue) => set((state) => ({
          globalPickupTimers: {
            ...state.globalPickupTimers,
            [jobId]: timerValue,
          },
        })),

        // ========================================
        // Utility Actions
        // ========================================
        reset: () => {
          // Cleanup notifications before resetting
          notificationListener.disconnect()
          set(initialState)
        },
      }),
      {
        name: 'prawnbox-app-store',
        // Only persist essential data, not UI state or selections
        partialize: (state) => ({
          user: state.user,
          activeRole: state.activeRole,
          deliveryJobs: state.deliveryJobs,
          notifications: state.notifications,
          // Persist processing job state so it survives page refresh
          processingJob: state.processingJob,
          isProcessingMinimized: state.isProcessingMinimized,
          processingBidCount: state.processingBidCount,
        }),
      }
    )
  )
)

// Convenience selectors
export const selectUser = (state: AppState) => state.user
export const selectActiveRole = (state: AppState) => state.activeRole
export const selectSelectedJob = (state: AppState) => state.selectedJob
export const selectNotifications = (state: AppState) => state.notifications
export const selectUnreadCount = (state: AppState) =>
  state.notifications.filter((n) => !n.read).length
