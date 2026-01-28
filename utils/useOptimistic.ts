/**
 * Optimistic UI Update Hook
 *
 * Provides utilities for implementing optimistic updates that improve perceived performance
 */

import { useState, useCallback, useRef } from 'react'
import { toast } from 'sonner'

export interface OptimisticUpdate<T> {
  id: string
  type: 'add' | 'update' | 'delete'
  data: T
  previousData?: T
  timestamp: number
}

export function useOptimistic<T extends { id: string }>(
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData)
  const [pendingUpdates, setPendingUpdates] = useState<Map<string, OptimisticUpdate<T>>>(
    new Map()
  )
  const rollbackTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map())

  /**
   * Add item optimistically
   */
  const addOptimistic = useCallback(
    async (
      item: T,
      apiCall: () => Promise<T>,
      options: {
        onSuccess?: (data: T) => void
        onError?: (error: Error) => void
        rollbackDelay?: number
      } = {}
    ) => {
      const updateId = `add-${item.id}-${Date.now()}`

      // Add to pending updates
      const update: OptimisticUpdate<T> = {
        id: updateId,
        type: 'add',
        data: item,
        timestamp: Date.now(),
      }

      setPendingUpdates((prev) => new Map(prev).set(updateId, update))

      // Optimistically add to data
      setData((prev) => [...prev, item])

      try {
        // Make API call
        const result = await apiCall()

        // Success - remove from pending and update with real data
        setPendingUpdates((prev) => {
          const newMap = new Map(prev)
          newMap.delete(updateId)
          return newMap
        })

        setData((prev) =>
          prev.map((d) => (d.id === item.id ? result : d))
        )

        options.onSuccess?.(result)
      } catch (error) {
        // Error - rollback
        const err = error instanceof Error ? error : new Error('Failed to add item')

        setPendingUpdates((prev) => {
          const newMap = new Map(prev)
          newMap.delete(updateId)
          return newMap
        })

        setData((prev) => prev.filter((d) => d.id !== item.id))

        toast.error(err.message)
        options.onError?.(err)
      }
    },
    []
  )

  /**
   * Update item optimistically
   */
  const updateOptimistic = useCallback(
    async (
      itemId: string,
      updates: Partial<T>,
      apiCall: () => Promise<T>,
      options: {
        onSuccess?: (data: T) => void
        onError?: (error: Error) => void
        rollbackDelay?: number
      } = {}
    ) => {
      const updateId = `update-${itemId}-${Date.now()}`

      // Find current item
      const currentItem = data.find((d) => d.id === itemId)
      if (!currentItem) {
        throw new Error('Item not found')
      }

      // Create updated item
      const updatedItem = { ...currentItem, ...updates }

      // Add to pending updates
      const update: OptimisticUpdate<T> = {
        id: updateId,
        type: 'update',
        data: updatedItem,
        previousData: currentItem,
        timestamp: Date.now(),
      }

      setPendingUpdates((prev) => new Map(prev).set(updateId, update))

      // Optimistically update data
      setData((prev) =>
        prev.map((d) => (d.id === itemId ? updatedItem : d))
      )

      try {
        // Make API call
        const result = await apiCall()

        // Success - remove from pending and update with real data
        setPendingUpdates((prev) => {
          const newMap = new Map(prev)
          newMap.delete(updateId)
          return newMap
        })

        setData((prev) =>
          prev.map((d) => (d.id === itemId ? result : d))
        )

        options.onSuccess?.(result)
      } catch (error) {
        // Error - rollback to previous state
        const err = error instanceof Error ? error : new Error('Failed to update item')

        setPendingUpdates((prev) => {
          const newMap = new Map(prev)
          newMap.delete(updateId)
          return newMap
        })

        setData((prev) =>
          prev.map((d) => (d.id === itemId ? currentItem : d))
        )

        toast.error(err.message)
        options.onError?.(err)
      }
    },
    [data]
  )

  /**
   * Delete item optimistically
   */
  const deleteOptimistic = useCallback(
    async (
      itemId: string,
      apiCall: () => Promise<void>,
      options: {
        onSuccess?: () => void
        onError?: (error: Error) => void
        rollbackDelay?: number
      } = {}
    ) => {
      const updateId = `delete-${itemId}-${Date.now()}`

      // Find current item
      const currentItem = data.find((d) => d.id === itemId)
      if (!currentItem) {
        throw new Error('Item not found')
      }

      // Add to pending updates
      const update: OptimisticUpdate<T> = {
        id: updateId,
        type: 'delete',
        data: currentItem,
        previousData: currentItem,
        timestamp: Date.now(),
      }

      setPendingUpdates((prev) => new Map(prev).set(updateId, update))

      // Optimistically remove from data
      setData((prev) => prev.filter((d) => d.id !== itemId))

      try {
        // Make API call
        await apiCall()

        // Success - remove from pending
        setPendingUpdates((prev) => {
          const newMap = new Map(prev)
          newMap.delete(updateId)
          return newMap
        })

        options.onSuccess?.()
      } catch (error) {
        // Error - rollback by adding item back
        const err = error instanceof Error ? error : new Error('Failed to delete item')

        setPendingUpdates((prev) => {
          const newMap = new Map(prev)
          newMap.delete(updateId)
          return newMap
        })

        setData((prev) => [...prev, currentItem])

        toast.error(err.message)
        options.onError?.(err)
      }
    },
    [data]
  )

  /**
   * Check if item has pending updates
   */
  const isPending = useCallback(
    (itemId: string): boolean => {
      return Array.from(pendingUpdates.values()).some(
        (update) => update.data.id === itemId
      )
    },
    [pendingUpdates]
  )

  /**
   * Clear all pending updates
   */
  const clearPending = useCallback(() => {
    setPendingUpdates(new Map())
    rollbackTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    rollbackTimeouts.current.clear()
  }, [])

  return {
    data,
    setData,
    addOptimistic,
    updateOptimistic,
    deleteOptimistic,
    isPending,
    pendingUpdates: Array.from(pendingUpdates.values()),
    clearPending,
  }
}

/**
 * Simpler optimistic hook for single values
 */
export function useOptimisticValue<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [isPending, setIsPending] = useState(false)
  const [previousValue, setPreviousValue] = useState<T>(initialValue)

  const updateOptimistic = useCallback(
    async (
      newValue: T,
      apiCall: () => Promise<T>,
      options: {
        onSuccess?: (data: T) => void
        onError?: (error: Error) => void
      } = {}
    ) => {
      // Store previous value
      setPreviousValue(value)
      setIsPending(true)

      // Optimistically update
      setValue(newValue)

      try {
        // Make API call
        const result = await apiCall()

        // Success
        setValue(result)
        setIsPending(false)
        options.onSuccess?.(result)
      } catch (error) {
        // Error - rollback
        const err = error instanceof Error ? error : new Error('Update failed')

        setValue(previousValue)
        setIsPending(false)

        toast.error(err.message)
        options.onError?.(err)
      }
    },
    [value, previousValue]
  )

  return {
    value,
    setValue,
    updateOptimistic,
    isPending,
  }
}

/**
 * Optimistic hook for arrays with simple operations
 */
export function useOptimisticArray<T>(initialArray: T[] = []) {
  const [array, setArray] = useState<T[]>(initialArray)

  const addOptimistic = useCallback(
    async (
      item: T,
      apiCall: () => Promise<T>,
      options: { onSuccess?: (data: T) => void; onError?: (error: Error) => void } = {}
    ) => {
      // Optimistically add
      setArray((prev) => [...prev, item])

      try {
        const result = await apiCall()
        // Update with real data
        setArray((prev) => [...prev.slice(0, -1), result])
        options.onSuccess?.(result)
      } catch (error) {
        // Rollback
        setArray((prev) => prev.slice(0, -1))
        const err = error instanceof Error ? error : new Error('Failed')
        toast.error(err.message)
        options.onError?.(err)
      }
    },
    []
  )

  const removeOptimistic = useCallback(
    async (
      index: number,
      apiCall: () => Promise<void>,
      options: { onSuccess?: () => void; onError?: (error: Error) => void } = {}
    ) => {
      const removed = array[index]

      // Optimistically remove
      setArray((prev) => prev.filter((_, i) => i !== index))

      try {
        await apiCall()
        options.onSuccess?.()
      } catch (error) {
        // Rollback - add back
        setArray((prev) => [...prev.slice(0, index), removed, ...prev.slice(index)])
        const err = error instanceof Error ? error : new Error('Failed')
        toast.error(err.message)
        options.onError?.(err)
      }
    },
    [array]
  )

  return {
    array,
    setArray,
    addOptimistic,
    removeOptimistic,
  }
}
