/**
 * Retry Hook for Failed Operations
 *
 * Provides retry functionality with exponential backoff for failed API requests
 */

import { useState, useCallback } from 'react'
import { toast } from 'sonner'

interface RetryOptions {
  maxAttempts?: number
  delayMs?: number
  backoffMultiplier?: number
  onRetry?: (attempt: number) => void
  showToast?: boolean
}

export function useRetry() {
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  /**
   * Execute a function with retry logic
   */
  const executeWithRetry = useCallback(
    async <T,>(
      fn: () => Promise<T>,
      options: RetryOptions = {}
    ): Promise<T> => {
      const {
        maxAttempts = 3,
        delayMs = 1000,
        backoffMultiplier = 2,
        onRetry,
        showToast = true,
      } = options

      let lastError: Error | null = null
      let attempt = 0

      while (attempt < maxAttempts) {
        try {
          setIsRetrying(attempt > 0)
          setRetryCount(attempt)

          const result = await fn()

          // Success
          setIsRetrying(false)
          setRetryCount(0)
          return result
        } catch (error) {
          lastError = error instanceof Error ? error : new Error('Unknown error')
          attempt++

          if (attempt < maxAttempts) {
            // Calculate delay with exponential backoff
            const delay = delayMs * Math.pow(backoffMultiplier, attempt - 1)

            if (showToast) {
              toast.info(`Retrying... (${attempt}/${maxAttempts})`, {
                duration: delay,
              })
            }

            // Call retry callback
            onRetry?.(attempt)

            // Wait before next attempt
            await new Promise((resolve) => setTimeout(resolve, delay))
          }
        }
      }

      // All attempts failed
      setIsRetrying(false)
      setRetryCount(0)

      if (showToast) {
        toast.error(`Failed after ${maxAttempts} attempts. Please try again later.`)
      }

      throw lastError || new Error('Operation failed after multiple attempts')
    },
    []
  )

  /**
   * Reset retry state
   */
  const reset = useCallback(() => {
    setIsRetrying(false)
    setRetryCount(0)
  }, [])

  return {
    executeWithRetry,
    isRetrying,
    retryCount,
    reset,
  }
}

/**
 * Manual retry button component state
 */
export function useManualRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
) {
  const [isRetrying, setIsRetrying] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const retry = useCallback(async () => {
    try {
      setIsRetrying(true)
      setError(null)

      const result = await fn()
      setData(result)

      if (options.showToast !== false) {
        toast.success('Operation successful!')
      }

      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Operation failed')
      setError(error)

      if (options.showToast !== false) {
        toast.error(error.message)
      }

      throw error
    } finally {
      setIsRetrying(false)
    }
  }, [fn, options.showToast])

  return {
    retry,
    isRetrying,
    error,
    data,
  }
}

/**
 * Queue for offline requests
 */
interface QueuedRequest {
  id: string
  fn: () => Promise<any>
  timestamp: number
  retries: number
}

class OfflineRequestQueue {
  private queue: QueuedRequest[] = []
  private isProcessing = false

  /**
   * Add request to queue
   */
  add(fn: () => Promise<any>): string {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    this.queue.push({
      id,
      fn,
      timestamp: Date.now(),
      retries: 0,
    })

    return id
  }

  /**
   * Process queue when online
   */
  async process(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return
    }

    this.isProcessing = true

    while (this.queue.length > 0) {
      const request = this.queue[0]

      try {
        await request.fn()

        // Success - remove from queue
        this.queue.shift()

        toast.success('Queued request completed')
      } catch (error) {
        request.retries++

        // If too many retries, remove from queue
        if (request.retries >= 3) {
          this.queue.shift()
          toast.error('Failed to process queued request')
        } else {
          // Move to end of queue for retry
          this.queue.push(this.queue.shift()!)
        }

        // Wait before next attempt
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }

    this.isProcessing = false
  }

  /**
   * Get queue size
   */
  size(): number {
    return this.queue.length
  }

  /**
   * Clear queue
   */
  clear(): void {
    this.queue = []
  }
}

export const offlineRequestQueue = new OfflineRequestQueue()

/**
 * Hook for handling offline requests
 */
export function useOfflineQueue() {
  const [queueSize, setQueueSize] = useState(0)

  const queueRequest = useCallback((fn: () => Promise<any>) => {
    const id = offlineRequestQueue.add(fn)
    setQueueSize(offlineRequestQueue.size())
    return id
  }, [])

  const processQueue = useCallback(async () => {
    await offlineRequestQueue.process()
    setQueueSize(offlineRequestQueue.size())
  }, [])

  return {
    queueRequest,
    processQueue,
    queueSize,
  }
}
