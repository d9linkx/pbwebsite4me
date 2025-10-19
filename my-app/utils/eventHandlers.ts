import { DeliveryJob, User, UserRole } from '../types';

export interface EventContext {
  user: User | null;
  activeRole: UserRole;
  selectedJob: DeliveryJob | null;
}

export class EventHandlers {
  private context: EventContext;

  constructor(context: EventContext) {
    this.context = context;
  }

  updateContext(context: Partial<EventContext>) {
    this.context = { ...this.context, ...context };
  }

  // Enhanced button click handler with proper event management
  createButtonHandler(
    action: string,
    callback: () => void,
    options: {
      preventBubbling?: boolean;
      logAction?: boolean;
      requireAuth?: boolean;
    } = {}
  ) {
    return (e: React.MouseEvent) => {
      if (options.preventBubbling) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (options.logAction) {
        console.log('🔘 EventHandler: Button clicked -', action);
      }

      if (options.requireAuth && !this.context.user) {
        console.warn('⚠️ EventHandler: Action requires authentication -', action);
        return;
      }

      try {
        callback();
      } catch (error) {
        console.error('❌ EventHandler: Error in button handler -', action, error);
      }
    };
  }

  // Enhanced job selection handler
  createJobSelectionHandler(
    job: DeliveryJob,
    onJobSelect: (job: DeliveryJob) => void,
    navigationCallback?: () => void
  ) {
    return this.createButtonHandler(
      `job-select-${job.id}`,
      () => {
        console.log('📦 EventHandler: Job selected -', job.title, 'Status:', job.status);
        onJobSelect(job);
        
        if (navigationCallback) {
          navigationCallback();
        }
      },
      {
        preventBubbling: true,
        logAction: true,
        requireAuth: true
      }
    );
  }

  // Enhanced filter change handler
  createFilterHandler<T>(
    filterValue: T,
    setFilter: (value: T) => void,
    label: string
  ) {
    return this.createButtonHandler(
      `filter-${label}`,
      () => {
        console.log('🎯 EventHandler: Filter changed -', label, 'Value:', filterValue);
        setFilter(filterValue);
      },
      {
        preventBubbling: true,
        logAction: true
      }
    );
  }

  // Enhanced navigation handler
  createNavigationHandler(
    targetScreen: string,
    navigationCallback: (screen: string) => void,
    options: {
      requireRole?: UserRole;
      requireJob?: boolean;
    } = {}
  ) {
    return this.createButtonHandler(
      `navigate-${targetScreen}`,
      () => {
        if (options.requireRole && this.context.activeRole !== options.requireRole) {
          console.warn('⚠️ EventHandler: Navigation requires role -', options.requireRole);
          return;
        }

        if (options.requireJob && !this.context.selectedJob) {
          console.warn('⚠️ EventHandler: Navigation requires selected job');
          return;
        }

        console.log('🚀 EventHandler: Navigating to -', targetScreen);
        navigationCallback(targetScreen);
      },
      {
        preventBubbling: true,
        logAction: true,
        requireAuth: true
      }
    );
  }

  // Enhanced touch/click optimization
  createTouchOptimizedHandler(
    action: string,
    callback: () => void,
    options: {
      hapticFeedback?: boolean;
      visualFeedback?: boolean;
      delayMs?: number;
    } = {}
  ) {
    return (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('👆 EventHandler: Touch optimized action -', action);

      // Add visual feedback
      if (options.visualFeedback) {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
          target.style.transform = '';
        }, 150);
      }

      // Add haptic feedback (if supported)
      if (options.hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }

      // Execute callback with optional delay
      const delay = options.delayMs || 0;
      setTimeout(() => {
        try {
          callback();
        } catch (error) {
          console.error('❌ EventHandler: Error in touch handler -', action, error);
        }
      }, delay);
    };
  }

  // Enhanced form submission handler
  createFormSubmissionHandler(
    formName: string,
    submitCallback: (formData: FormData) => void,
    validationCallback?: (formData: FormData) => boolean
  ) {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('📝 EventHandler: Form submission -', formName);

      const formData = new FormData(e.currentTarget);

      // Run validation if provided
      if (validationCallback && !validationCallback(formData)) {
        console.warn('⚠️ EventHandler: Form validation failed -', formName);
        return;
      }

      try {
        submitCallback(formData);
      } catch (error) {
        console.error('❌ EventHandler: Error in form submission -', formName, error);
      }
    };
  }

  // Enhanced scroll handler for performance
  createScrollHandler(
    callback: (scrollPosition: number) => void,
    throttleMs: number = 16
  ) {
    let ticking = false;

    return (e: React.UIEvent<HTMLElement>) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = e.currentTarget.scrollTop;
          callback(scrollPosition);
          ticking = false;
        });
        ticking = true;
      }
    };
  }

  // Enhanced keyboard handler
  createKeyboardHandler(
    keyMap: { [key: string]: () => void }
  ) {
    return (e: React.KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (keyMap[key]) {
        e.preventDefault();
        console.log('⌨️ EventHandler: Keyboard action -', key);
        keyMap[key]();
      }
    };
  }
}

// Utility functions for event handling
export const eventUtils = {
  // Create safe event handler that catches errors
  createSafeHandler: (callback: () => void, errorMessage?: string) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      try {
        callback();
      } catch (error) {
        console.error('❌ Safe Handler Error:', errorMessage || 'Unknown action', error);
      }
    };
  },

  // Create debounced handler for search/input
  createDebouncedHandler: (callback: (value: string) => void, delayMs: number = 300) => {
    let timeoutId: NodeJS.Timeout;

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(value);
      }, delayMs);
    };
  },

  // Create handler with loading state management
  createLoadingHandler: (
    callback: () => Promise<void>,
    setLoading: (loading: boolean) => void
  ) => {
    return async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      setLoading(true);
      try {
        await callback();
      } catch (error) {
        console.error('❌ Loading Handler Error:', error);
      } finally {
        setLoading(false);
      }
    };
  }
};