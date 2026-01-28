import { Screen, UserRole, DeliveryJob, User } from '../types';
import { SCREEN_CONFIGS, navigationUtils as configUtils } from './navigationConfig';

export interface NavigationContext {
  currentScreen: Screen;
  previousScreen?: Screen;
  user: User | null;
  activeRole: UserRole;
  selectedJob?: DeliveryJob | null;
}

export interface NavigationGuard {
  canAccess: (screen: Screen, context: NavigationContext) => boolean;
  redirectTo?: Screen;
  errorMessage?: string;
}

export class NavigationManager {
  private context: NavigationContext;
  private navigationHistory: Screen[] = [];
  private maxHistorySize = 20;
  private navigationGuards: NavigationGuard[] = [];

  constructor(context: NavigationContext) {
    this.context = context;
    this.setupDefaultGuards();
  }

  private setupDefaultGuards() {
    // Authentication guard
    this.addGuard({
      canAccess: (screen, context) => {
        if (configUtils.requiresAuth(screen) && !context.user) {
          console.warn(`🚫 NavigationGuard: Authentication required for ${screen}`);
          return false;
        }
        return true;
      },
      redirectTo: 'auth',
      errorMessage: 'Please log in to access this feature'
    });

    // Role-based access guard
    this.addGuard({
      canAccess: (screen, context) => {
        const config = SCREEN_CONFIGS[screen];
        if (config?.roles && context.user && !config.roles.includes(context.activeRole)) {
          console.warn(`🚫 NavigationGuard: Role ${context.activeRole} cannot access ${screen}`);
          return false;
        }
        return true;
      },
      redirectTo: 'dashboard',
      errorMessage: 'You do not have permission to access this feature'
    });

    // Job context guard
    this.addGuard({
      canAccess: (screen, context) => {
        if (configUtils.requiresJob(screen) && !context.selectedJob) {
          console.warn(`🚫 NavigationGuard: Job context required for ${screen}`);
          return false;
        }
        return true;
      },
      redirectTo: 'dashboard',
      errorMessage: 'Please select a delivery to continue'
    });
  }

  updateContext(context: Partial<NavigationContext>) {
    this.context = { ...this.context, ...context };
  }

  addGuard(guard: NavigationGuard) {
    this.navigationGuards.push(guard);
  }

  removeGuard(guard: NavigationGuard) {
    const index = this.navigationGuards.indexOf(guard);
    if (index > -1) {
      this.navigationGuards.splice(index, 1);
    }
  }

  canNavigateTo(screen: Screen): { allowed: boolean; redirectTo?: Screen; errorMessage?: string } {
    for (const guard of this.navigationGuards) {
      if (!guard.canAccess(screen, this.context)) {
        return {
          allowed: false,
          redirectTo: guard.redirectTo,
          errorMessage: guard.errorMessage
        };
      }
    }
    return { allowed: true };
  }

  navigateWithHistory(screen: Screen): Screen | null {
    console.log('🚀 NavigationManager: Navigating from', this.context.currentScreen, 'to', screen);

    // Check navigation guards
    const guardResult = this.canNavigateTo(screen);
    if (!guardResult.allowed) {
      console.warn('🚫 NavigationManager: Navigation blocked by guards');
      return guardResult.redirectTo || null;
    }

    try {
      // Add current screen to history if it's not already the same
      if (this.context.currentScreen !== screen) {
        this.navigationHistory.push(this.context.currentScreen);

        // Limit history size
        if (this.navigationHistory.length > this.maxHistorySize) {
          this.navigationHistory.shift();
        }
      }

      this.context.previousScreen = this.context.currentScreen;
      this.context.currentScreen = screen;

      // Log successful navigation
      console.log('✅ NavigationManager: Navigation prepared for', screen);
      return screen;

    } catch (error) {
      console.error('❌ NavigationManager: Navigation failed:', error);
      return null;
    }
  }

  goBack(): Screen | null {
    try {
      if (this.navigationHistory.length > 0) {
        const previousScreen = this.navigationHistory.pop()!;
        console.log('🔙 NavigationManager: Going back to', previousScreen);

        this.context.currentScreen = previousScreen;
        return previousScreen;
      }

      // Fallback to default screen based on user role
      const fallbackScreen = this.getFallbackScreen();
      console.log('🔙 NavigationManager: No history, going to fallback:', fallbackScreen);
      this.context.currentScreen = fallbackScreen;
      return fallbackScreen;

    } catch (error) {
      console.error('❌ NavigationManager: Go back failed:', error);
      return null;
    }
  }

  private getFallbackScreen(): Screen {
    if (!this.context.user) return 'auth';

    switch (this.context.activeRole) {
      case 'pal': return 'available-jobs';
      case 'sender': return 'dashboard';
      case 'receiver': return 'dashboard';
      case 'proxy': return 'proxy-dashboard';
      default: return 'dashboard';
    }
  }

  // Enhanced Pal job navigation with error handling
  handlePalJobNavigation(job: DeliveryJob): Screen | null {
    try {
      console.log('🔥 NavigationManager: Pal job navigation for', job.title, 'Status:', job.status);

      if (!job || !job.status) {
        console.error('❌ NavigationManager: Invalid job data for navigation');
        return null;
      }

      let targetScreen: Screen;
      
      switch (job.status) {
        case 'assigned':
          targetScreen = 'pickup-confirmation';
          break;
        case 'picked-up':
          targetScreen = 'delivery-progress';
          break;
        case 'in-transit':
          targetScreen = 'delivery-confirmation';
          break;
        default:
          console.warn('⚠️ NavigationManager: Unknown job status, defaulting to pickup-confirmation');
          targetScreen = 'pickup-confirmation';
      }

      return this.navigateWithHistory(targetScreen);
    } catch (error) {
      console.error('❌ NavigationManager: Pal job navigation failed:', error);
      return null;
    }
  }

  // Enhanced role-based navigation
  handleRoleBasedNavigation(role: UserRole): Screen | null {
    try {
      console.log('🎭 NavigationManager: Role-based navigation for', role);

      let targetScreen: Screen;
      
      switch (role) {
        case 'sender':
          targetScreen = 'dashboard';
          break;
        case 'pal':
          targetScreen = 'available-jobs';
          break;
        case 'receiver':
          targetScreen = 'dashboard';
          break;
        case 'proxy':
          targetScreen = 'proxy-dashboard';
          break;
        default:
          console.warn('⚠️ NavigationManager: Unknown role, defaulting to dashboard');
          targetScreen = 'dashboard';
      }

      return this.navigateWithHistory(targetScreen);
    } catch (error) {
      console.error('❌ NavigationManager: Role-based navigation failed:', error);
      return null;
    }
  }

  // Enhanced breadcrumb generation using config
  generateBreadcrumbs(): { label: string; screen: Screen; onClick?: () => void }[] {
    try {
      const breadcrumbs = [
        { label: 'Dashboard', screen: 'dashboard' as Screen }
      ];

      if (this.context.currentScreen !== 'dashboard') {
        const screenTitle = configUtils.getScreenTitle(this.context.currentScreen);
        breadcrumbs.push({
          label: screenTitle,
          screen: this.context.currentScreen
        });
      }

      return breadcrumbs;
    } catch (error) {
      console.error('❌ NavigationManager: Breadcrumb generation failed:', error);
      return [{ label: 'Dashboard', screen: 'dashboard' as Screen }];
    }
  }

  // Navigation analytics
  getNavigationStats() {
    return {
      currentScreen: this.context.currentScreen,
      previousScreen: this.context.previousScreen,
      historyLength: this.navigationHistory.length,
      sessionScreens: [...this.navigationHistory, this.context.currentScreen],
      uniqueScreens: new Set([...this.navigationHistory, this.context.currentScreen]).size
    };
  }

  // Clear navigation data
  clearHistory() {
    this.navigationHistory = [];
    console.log('🧹 NavigationManager: History cleared');
  }

  // Reset to initial state
  reset() {
    this.navigationHistory = [];
    this.context.currentScreen = 'auth';
    this.context.previousScreen = undefined;
    this.context.user = null;
    this.context.activeRole = 'sender';
    this.context.selectedJob = null;
    console.log('🔄 NavigationManager: Reset to initial state');
  }

  getNavigationHistory(): Screen[] {
    return [...this.navigationHistory];
  }

  getCurrentContext(): NavigationContext {
    return { ...this.context };
  }
}

// Enhanced navigation utilities
export const navigationUtils = {
  // Check if screen should use desktop enhancements
  shouldUseDesktopEnhancements: (screen: Screen, hasUser: boolean): boolean => {
    const enhancedScreens: Screen[] = [
      'dashboard', 'available-jobs', 'accepted-bids',
      'bids', 'tracking', 'wallet', 'settings'
    ];
    return enhancedScreens.includes(screen) && hasUser;
  },

  // Check if screen should use full width layout
  isFullWidthScreen: (screen: Screen): boolean => {
    const fullWidthScreens: Screen[] = ['splash', 'onboarding', 'auth'];
    return fullWidthScreens.includes(screen);
  },

  // Get screen transition class
  getTransitionClass: (fromScreen: Screen, toScreen: Screen): string => {
    // Add custom transition logic based on screen relationships
    if (fromScreen === 'dashboard' && toScreen === 'accepted-bids') {
      return 'slide-left';
    }
    if (fromScreen === 'accepted-bids' && toScreen === 'pickup-confirmation') {
      return 'slide-up';
    }
    return 'fade';
  },

  // Format screen name for display
  formatScreenName: (screen: Screen): string => {
    return configUtils.getScreenTitle(screen);
  },

  // Get screens available for user role
  getAvailableScreens: (role: UserRole): Screen[] => {
    return configUtils.getScreensForRole(role);
  },

  // Validate screen exists and is accessible
  validateScreen: (screen: string, role: UserRole): screen is Screen => {
    return configUtils.isValidScreen(screen) && configUtils.getScreensForRole(role).includes(screen as Screen);
  }
};