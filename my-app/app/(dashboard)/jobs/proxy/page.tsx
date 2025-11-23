/**
 * Proxy Jobs Page
 *
 * Shows all deliveries where the user is acting as a proxy (storage location)
 * Route: /jobs/proxy
 */

'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'
import type { DeliveryJob, Screen, ItemSize, DeliveryStatus, Bid } from '@/types/index'
import { apiService } from '@/utils/apiService'
import { toast } from 'sonner'
import { ArrowLeft, Package, Clock, CheckCircle, MapPin, Eye, MessageCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

type FilterStatus = 'all' | 'incoming' | 'stored' | 'picked-up' | 'completed'

interface PackageResponse {
  _id: string
  id?: string
  title: string
  description?: string
  sender?: {
    senderId?: string | { _id: string }
    name?: string
    phone?: string
    formattedAddress?: string
    address?: string
  }
  receiver?: {
    receiverId?: string
    name?: string
    phone?: string
    formattedAddress?: string
  }
  items?: Array<{
    size?: string
    category?: string
    weight?: string | number
    images?: Array<{ url: string }>
  }>
  price?: number
  value?: number
  status?: string
  pickupDate?: string
  pickupTime?: string
  notes?: string
  escrowAmount?: number
  bids?: Bid[]
  pal?: {
    palId?: string
    name?: string
    phone?: string
  }
  proxy?: {
    proxyId?: string
    name?: string
    phone?: string
  }
  createdAt?: string
  orderNumber?: string
  pickupLocation?: string
  dropoffLocation?: string
  category?: string
  weight?: string
  itemSize?: string
}

export default function ProxyJobsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')

  const user = useAppStore((state) => state.user)
  const deliveryJobs = useAppStore((state) => state.deliveryJobs)
  const setDeliveryJobs = useAppStore((state) => state.setDeliveryJobs)
  const setSelectedJob = useAppStore((state) => state.setSelectedJob)

  // Fetch proxy packages from backend
  useEffect(() => {
    const fetchProxyPackages = async () => {
      if (!user) {
        router.push('/auth')
        return
      }

      try {
        setIsLoading(true)
        console.log('📦 Fetching proxy packages from backend...')

        const response = await apiService.getAllPackages()

        if (response.success && response.data) {
          console.log('✅ Packages fetched from backend:', response.data)

          // Map backend packages to frontend DeliveryJob format
          const allMappedJobs: DeliveryJob[] = response.data.map((pkg: PackageResponse) => {
            const senderId = pkg.sender?.senderId
              ? (typeof pkg.sender.senderId === 'object' ? pkg.sender.senderId._id : pkg.sender.senderId)
              : user?.id || ''

            const job: DeliveryJob = {
              id: pkg._id || pkg.id || '',
              orderNumber: pkg.orderNumber || `ORD-${(pkg._id || '').slice(0, 8).toUpperCase()}`,
              senderId,
              senderName: pkg.sender?.name || user?.name || '',
              senderPhone: pkg.sender?.phone || user?.phone || '',
              title: pkg.title,
              description: pkg.description || '',
              pickupLocation: pkg.sender?.formattedAddress || pkg.sender?.address || pkg.pickupLocation || 'Pickup address not specified',
              dropoffLocation: pkg.receiver?.formattedAddress || pkg.receiver?.address || pkg.dropoffLocation || 'Delivery address not specified',
              itemSize: (pkg.items?.[0]?.size as ItemSize) || 'Medium',
              category: pkg.items?.[0]?.category || pkg.category || '',
              weight: pkg.items?.[0]?.weight?.toString() || pkg.weight || '',
              value: pkg.price || pkg.items?.[0]?.value || 0,
              receiverId: pkg.receiver?.receiverId,
              receiverName: pkg.receiver?.name || '',
              receiverPhone: pkg.receiver?.phone || '',
              selectedPalId: pkg.pal?.palId,
              selectedPalName: pkg.pal?.name,
              selectedPalPhone: pkg.pal?.phone,
              proxyId: pkg.proxy?.proxyId,
              proxyName: pkg.proxy?.name,
              status: (pkg.status as DeliveryStatus) || 'pending',
              pickupDate: pkg.pickupDate || new Date().toISOString(),
              pickupTime: pkg.pickupTime || '12:00',
              notes: pkg.notes || '',
              images: pkg.items?.[0]?.images?.map(img => img.url) || [],
              bids: pkg.bids?.map(bid => ({
                ...bid,
                vehicleType: bid.vehicleType || 'car',
                canEdit: bid.canEdit || false,
                isAccepted: bid.isAccepted || false,
                placedAt: bid.placedAt || new Date().toISOString(),
                createdAt: bid.createdAt || new Date().toISOString()
              })) || [],
              isLive: true,
              createdAt: pkg.createdAt || new Date().toISOString(),
              distance: 0,
            }

            return job
          })

          console.log('📦 Total packages fetched:', allMappedJobs.length)
          setDeliveryJobs(allMappedJobs)
        } else {
          console.warn('⚠️ No packages found or request failed')
        }
      } catch (error: unknown) {
        console.error('❌ Error fetching packages:', error)
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
        toast.error(`Failed to load deliveries: ${errorMessage}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProxyPackages()
  }, [user, router, setDeliveryJobs])

  // Filter proxy packages from the global store
  const proxyJobs = useMemo(() => {
    if (!user) return []

    return deliveryJobs
      .filter(job => {
        const jobProxyId = job.proxyId?.toString()
        const currentUserId = user.id?.toString()
        return jobProxyId === currentUserId
      })
      .map(job => ({
        ...job,
        orderNumber: job.orderNumber || `ORD-${job.id.slice(0, 8).toUpperCase()}`,
        pickupTime: job.pickupTime || '12:00',
        bids: job.bids || [],
        value: job.value || 0,
        status: job.status || 'pending',
        createdAt: job.createdAt || new Date().toISOString(),
        pickupDate: job.pickupDate || new Date().toISOString()
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [user, deliveryJobs])

  // Filter jobs based on search and status
  const filteredJobs = useMemo(() => {
    return proxyJobs.filter(job => {
      const matchesSearch = (job.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.pickupLocation || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.dropoffLocation || '').toLowerCase().includes(searchQuery.toLowerCase())

      let matchesStatus = true
      if (filterStatus === 'incoming') {
        matchesStatus = ['assigned', 'picked-up'].includes(job.status)
      } else if (filterStatus === 'stored') {
        matchesStatus = job.status === 'delivered'
      } else if (filterStatus === 'picked-up') {
        matchesStatus = job.status === 'in-transit'
      } else if (filterStatus === 'completed') {
        matchesStatus = job.status === 'completed'
      } else if (filterStatus !== 'all') {
        matchesStatus = job.status === filterStatus
      }

      return matchesSearch && matchesStatus
    })
  }, [proxyJobs, searchQuery, filterStatus])

  const stats = useMemo(() => {
    const total = proxyJobs.length
    const incoming = proxyJobs.filter(job => ['assigned', 'picked-up'].includes(job.status)).length
    const stored = proxyJobs.filter(job => job.status === 'delivered').length
    const completed = proxyJobs.filter(job => job.status === 'completed').length

    return { total, incoming, stored, completed }
  }, [proxyJobs])

  const getStatusInfo = (job: DeliveryJob) => {
    switch (job.status) {
      case 'assigned':
      case 'picked-up':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: Clock, label: 'Incoming' }
      case 'in-transit':
        return { color: 'text-blue-600', bg: 'bg-blue-100', icon: Package, label: 'In Transit' }
      case 'delivered':
        return { color: 'text-purple-600', bg: 'bg-purple-100', icon: Package, label: 'Stored' }
      case 'completed':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle, label: 'Completed' }
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: Package, label: job.status }
    }
  }

  const handleJobSelect = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push(`/jobs/${job.id}`)
  }

  const handleOpenChat = (job: DeliveryJob) => {
    setSelectedJob(job)
    router.push('/chat')
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const formatAmount = (amount: number): string => {
    return `₦${amount.toLocaleString('en-NG')}`
  }

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-[#f44708] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading proxy deliveries...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 p-6 sticky top-0 z-20 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </motion.button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Proxy Deliveries</h1>
              <p className="text-sm text-gray-600">Items stored at your location</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Package size={24} className="text-[#f44708] mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600">Total</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Clock size={24} className="text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.incoming}</p>
            <p className="text-xs text-gray-600">Incoming</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Package size={24} className="text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.stored}</p>
            <p className="text-xs text-gray-600">Stored</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <CheckCircle size={24} className="text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className="flex overflow-x-auto gap-2 pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { key: 'all', label: 'All' },
            { key: 'incoming', label: 'Incoming' },
            { key: 'stored', label: 'Stored' },
            { key: 'picked-up', label: 'Picked Up' },
            { key: 'completed', label: 'Completed' }
          ].map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key as FilterStatus)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                filterStatus === filter.key
                  ? 'bg-[#f44708] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Deliveries List */}
        {filteredJobs.length === 0 ? (
          <motion.div
            className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Package size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 font-semibold mb-2">No Proxy Deliveries Found</h3>
            <p className="text-gray-600 text-sm">
              {searchQuery || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Deliveries stored at your location will appear here'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job, index) => {
              const statusInfo = getStatusInfo(job)
              const StatusIcon = statusInfo.icon

              return (
                <motion.div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#f44708] hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleJobSelect(job)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.05) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900 font-semibold">{job.title}</h3>
                    <Badge className={`${statusInfo.bg} ${statusInfo.color} border-0`}>
                      <StatusIcon size={14} className="mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <User size={16} className="text-blue-600" />
                      <span className="text-gray-600">Sender:</span>
                      <span className="text-gray-900 truncate">{job.senderName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User size={16} className="text-purple-600" />
                      <span className="text-gray-600">Receiver:</span>
                      <span className="text-gray-900 truncate">{job.receiverName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">Value</p>
                      <p className="text-gray-900 font-medium">{formatAmount(job.value)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Size</p>
                      <p className="text-gray-900 font-medium">{job.itemSize}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Pal</p>
                      <p className="text-gray-900 font-medium truncate">{job.selectedPalName || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleJobSelect(job)
                      }}
                      className="px-4 py-2 bg-[#f44708] hover:bg-[#d63a00] text-white rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </motion.button>

                    {job.selectedPalId && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenChat(job)
                        }}
                        className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 rounded-xl text-sm font-medium flex items-center space-x-1 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle size={14} />
                        <span>Chat</span>
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {filteredJobs.length > 0 && (
          <p className="text-center text-sm text-gray-600">
            Showing {filteredJobs.length} of {proxyJobs.length} deliveries
          </p>
        )}
      </div>
    </div>
  )
}
