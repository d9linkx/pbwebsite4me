import React, { JSX } from 'react';
import { Screen, User, UserRole, DeliveryJob } from '../types';

// Enhanced screen rendering utilities
export class ScreenRenderer {
  private user: User | null;
  private activeRole: UserRole;
  private selectedJob: DeliveryJob | null;

  constructor(user: User | null, activeRole: UserRole, selectedJob: DeliveryJob | null) {
    this.user = user;
    this.activeRole = activeRole;
    this.selectedJob = selectedJob;
  }

  updateContext(user: User | null, activeRole: UserRole, selectedJob: DeliveryJob | null) {
    this.user = user;
    this.activeRole = activeRole;
    this.selectedJob = selectedJob;
  }

  // Enhanced loading screen with context
  renderLoadingScreen(message: string = 'Loading...', showProgress: boolean = false): JSX.Element {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-prawnbox-accent rounded-full animate-pulse mx-auto mb-4 relative">
            {showProgress && (
              <div className="absolute inset-0 rounded-full border-4 border-prawnbox-accent/20 border-t-prawnbox-accent animate-spin"></div>
            )}
          </div>
          <p className="text-prawnbox-text-light text-sm font-medium">{message}</p>
          {this.user && (
            <p className="text-xs text-prawnbox-text-light mt-2">Welcome back, {this.user.name}</p>
          )}
        </div>
      </div>
    );
  }

  // Enhanced error screen with retry functionality
  renderErrorScreen(
    error: string,
    onRetry?: () => void,
    onGoHome?: () => void
  ): JSX.Element {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-prawnbox-primary mb-3">Something went wrong</h2>
          <p className="text-prawnbox-text-light mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-6 py-3 bg-prawnbox-accent text-white rounded-xl font-medium hover:bg-prawnbox-accent-light transition-colors"
              >
                Try Again
              </button>
            )}
            {onGoHome && (
              <button
                onClick={onGoHome}
                className="px-6 py-3 border border-gray-200 text-prawnbox-primary rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Enhanced unauthorized screen
  renderUnauthorizedScreen(onLogin: () => void): JSX.Element {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-prawnbox-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-prawnbox-accent text-2xl">🔒</span>
          </div>
          <h2 className="text-xl font-bold text-prawnbox-primary mb-3">Authentication Required</h2>
          <p className="text-prawnbox-text-light mb-6">Please log in to access this feature</p>
          <button
            onClick={onLogin}
            className="px-8 py-3 bg-prawnbox-accent text-white rounded-xl font-medium hover:bg-prawnbox-accent-light transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  // Enhanced empty state renderer
  renderEmptyState(
    title: string,
    description: string,
    actionLabel?: string,
    onAction?: () => void,
    icon?: string
  ): JSX.Element {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-gray-400 text-2xl">{icon || '📦'}</span>
        </div>
        <h3 className="text-lg font-bold text-prawnbox-primary mb-3">{title}</h3>
        <p className="text-prawnbox-text-light mb-6 max-w-md mx-auto">{description}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-6 py-3 bg-prawnbox-accent text-white rounded-xl font-medium hover:bg-prawnbox-accent-light transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }

  // Enhanced role-specific content renderer
  renderRoleSpecificContent(content: {
    sender?: JSX.Element;
    pal?: JSX.Element;
    receiver?: JSX.Element;
    proxy?: JSX.Element;
    default?: JSX.Element;
  }): JSX.Element {
    return content[this.activeRole] || content.default || <div>Role content not available</div>;
  }

  // Enhanced responsive wrapper
  renderResponsiveWrapper(
    children: JSX.Element,
    options: {
      padding?: boolean;
      maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
      background?: boolean;
    } = {}
  ): JSX.Element {
    const {
      padding = true,
      maxWidth = 'lg',
      background = true
    } = options;

    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-full'
    };

    return (
      <div className={`
        min-h-screen w-full 
        ${background ? 'bg-gradient-to-br from-gray-50 via-white to-gray-50' : ''}
      `}>
        <div className={`
          mx-auto transition-all duration-300 ease-in-out
          ${maxWidthClasses[maxWidth]}
          ${padding ? 'px-4 sm:px-6 py-4 sm:py-6' : ''}
        `}>
          {children}
        </div>
      </div>
    );
  }

  // Enhanced status indicator renderer
  renderStatusIndicator(
    status: string,
    options: {
      showIcon?: boolean;
      size?: 'sm' | 'md' | 'lg';
      animate?: boolean;
    } = {}
  ): JSX.Element {
    const { showIcon = true, size = 'md', animate = false } = options;

    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '⏳' },
      assigned: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '📋' },
      'picked-up': { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '📦' },
      'in-transit': { color: 'bg-prawnbox-accent text-white border-prawnbox-accent', icon: '🚛' },
      delivered: { color: 'bg-green-100 text-green-800 border-green-200', icon: '✅' },
      completed: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '🏁' },
      cancelled: { color: 'bg-red-100 text-red-800 border-red-200', icon: '❌' },
      disputed: { color: 'bg-red-100 text-red-800 border-red-200', icon: '⚠️' }
    };

    const sizeClasses = {
      sm: 'text-xs px-2 py-1',
      md: 'text-sm px-3 py-1.5',
      lg: 'text-base px-4 py-2'
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`
        inline-flex items-center rounded-lg border font-semibold
        ${config.color} ${sizeClasses[size]}
        ${animate ? 'animate-pulse' : ''}
      `}>
        {showIcon && <span className="mr-1">{config.icon}</span>}
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  }

  // Enhanced breadcrumb renderer
  renderBreadcrumbs(
    breadcrumbs: { label: string; onClick?: () => void }[]
  ): JSX.Element {
    return (
      <nav className="flex items-center space-x-2 text-sm mb-6">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-400">→</span>}
            {crumb.onClick ? (
              <button
                onClick={crumb.onClick}
                className="text-prawnbox-accent hover:text-prawnbox-accent-light transition-colors hover:underline"
              >
                {crumb.label}
              </button>
            ) : (
              <span className="text-prawnbox-primary font-medium">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  }
}

// Utility functions for screen rendering
export const screenUtils = {
  // Create consistent card wrapper
  createCardWrapper: (
    children: JSX.Element,
    options: {
      padding?: 'sm' | 'md' | 'lg';
      hover?: boolean;
      border?: boolean;
    } = {}
  ): JSX.Element => {
    const { padding = 'md', hover = false, border = true } = options;

    const paddingClasses = {
      sm: 'p-3',
      md: 'p-4 sm:p-6',
      lg: 'p-6 sm:p-8'
    };

    return (
      <div className={`
        bg-white rounded-xl transition-all duration-200
        ${paddingClasses[padding]}
        ${border ? 'border border-gray-100' : ''}
        ${hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : 'shadow-sm'}
      `}>
        {children}
      </div>
    );
  },

  // Create consistent button styles
  getButtonClasses: (
    variant: 'primary' | 'secondary' | 'outline' | 'ghost',
    size: 'sm' | 'md' | 'lg' = 'md'
  ): string => {
    const baseClasses = 'font-medium transition-all duration-200 rounded-xl flex items-center justify-center';
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg'
    };

    const variantClasses = {
      primary: 'bg-prawnbox-accent text-white hover:bg-prawnbox-accent-light',
      secondary: 'bg-gray-100 text-prawnbox-primary hover:bg-gray-200',
      outline: 'border border-gray-200 text-prawnbox-primary hover:bg-gray-50',
      ghost: 'text-prawnbox-primary hover:bg-gray-50'
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  }
};