'use client'

import React, { useState } from 'react'
import { TrendingUp, Info, AlertCircle } from 'lucide-react'
import { PricingSuggestion } from '@/types'
import { formatPrice, getPriceBreakdown } from '@/utils/pricing/calculate'
import { motion, AnimatePresence } from 'framer-motion'

interface PricingSuggestionCardProps {
  pricing: PricingSuggestion
  onPriceChange?: (price: number) => void
  allowManualOverride?: boolean
}

export function PricingSuggestionCard({
  pricing,
  onPriceChange,
  allowManualOverride = true
}: PricingSuggestionCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [customPrice, setCustomPrice] = useState<number | null>(null)

  const breakdown = getPriceBreakdown(pricing)
  const activePrice = customPrice || pricing.suggestedPrice

  const handlePriceChange = (newPrice: number) => {
    setCustomPrice(newPrice)
    onPriceChange?.(newPrice)
  }

  const isPriceTooLow = activePrice < pricing.priceRange.min
  const isPriceTooHigh = activePrice > pricing.priceRange.max

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Suggested Price</h3>
          <p className="text-sm text-gray-600">Based on distance, size, and demand</p>
        </div>
        <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-gradient-to-br from-primary to-primary-hover rounded-xl p-6 text-white">
        <div className="space-y-2">
          <p className="text-sm opacity-90">Recommended Amount</p>
          <div className="flex items-end space-x-3">
            <h2 className="text-4xl font-bold">{formatPrice(activePrice)}</h2>
            {customPrice && (
              <span className="text-sm opacity-90 pb-2">
                (was {formatPrice(pricing.suggestedPrice)})
              </span>
            )}
          </div>
          <div className="flex items-center justify-between pt-2 text-sm opacity-90">
            <span>Range: {formatPrice(pricing.priceRange.min)} - {formatPrice(pricing.priceRange.max)}</span>
            <span>Market Avg: {formatPrice(pricing.marketAverage)}</span>
          </div>
        </div>
      </div>

      {/* Price Warning */}
      <AnimatePresence>
        {(isPriceTooLow || isPriceTooHigh) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`flex items-start space-x-2 p-3 rounded-lg ${
              isPriceTooLow ? 'bg-yellow-50 text-yellow-800' : 'bg-blue-50 text-blue-800'
            }`}
          >
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              {isPriceTooLow && 'This price is below the recommended range and may not attract many bids.'}
              {isPriceTooHigh && 'This price is above the recommended range. You may get fewer bids.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Price Override */}
      {allowManualOverride && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Set Maximum Price (Optional)</label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              value={customPrice || pricing.suggestedPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={`e.g., ${pricing.suggestedPrice}`}
              min={pricing.priceRange.min}
            />
            {customPrice && (
              <button
                onClick={() => {
                  setCustomPrice(null)
                  onPriceChange?.(pricing.suggestedPrice)
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}

      {/* Price Breakdown Toggle */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Info size={16} />
        <span>{showBreakdown ? 'Hide' : 'Show'} Price Breakdown</span>
      </button>

      {/* Breakdown Details */}
      <AnimatePresence>
        {showBreakdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 pt-2 border-t border-gray-200"
          >
            {breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <span className="font-semibold text-gray-900">{formatPrice(item.amount)}</span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200 flex items-center justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(pricing.suggestedPrice)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Competitive Bid Hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">💡 Pro Tip:</span> To attract bids quickly, consider setting your max price at {formatPrice(pricing.competitiveBid)} (10% below market average)
        </p>
      </div>
    </div>
  )
}
