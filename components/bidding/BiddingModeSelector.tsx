'use client'

import React from 'react'
import { Clock, Zap, UserCheck } from 'lucide-react'
import { BiddingMode } from '@/types'

interface BiddingModeSelectorProps {
  selectedMode: BiddingMode
  onModeChange: (mode: BiddingMode) => void
  biddingDuration: number // in minutes
  onDurationChange: (duration: number) => void
}

const BIDDING_MODES = [
  {
    id: 'open' as BiddingMode,
    icon: Clock,
    title: 'Open Bidding',
    description: 'Let multiple Pals compete with bids. Choose the best offer.',
    benefits: ['Get competitive prices', 'Choose from multiple Pals', 'See Pal ratings & reviews'],
    recommended: true
  },
  {
    id: 'quick_accept' as BiddingMode,
    icon: Zap,
    title: 'Quick Accept',
    description: 'First qualified Pal to bid at your target price gets the job.',
    benefits: ['Fastest assignment', 'Auto-accept first match', 'Set your price limit'],
    recommended: false
  },
  {
    id: 'direct_assign' as BiddingMode,
    icon: UserCheck,
    title: 'Direct Assign',
    description: 'Assign directly to a preferred Pal without bidding.',
    benefits: ['Use trusted Pals', 'Skip bidding process', 'Faster for repeat deliveries'],
    recommended: false
  }
]

const DURATION_OPTIONS = [
  { value: 5, label: '5 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' }
]

export function BiddingModeSelector({
  selectedMode,
  onModeChange,
  biddingDuration,
  onDurationChange
}: BiddingModeSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bidding Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BIDDING_MODES.map((mode) => {
            const Icon = mode.icon
            const isSelected = selectedMode === mode.id

            return (
              <button
                key={mode.id}
                onClick={() => onModeChange(mode.id)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* Recommended Badge */}
                {mode.recommended && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Recommended
                  </div>
                )}

                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon size={20} />
                </div>

                {/* Title */}
                <h4 className="font-semibold text-gray-900 mb-2">{mode.title}</h4>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3">{mode.description}</p>

                {/* Benefits */}
                <ul className="space-y-1">
                  {mode.benefits.map((benefit, index) => (
                    <li key={index} className="text-xs text-gray-500 flex items-start">
                      <span className="text-green-500 mr-1">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Duration Selection (only for open bidding) */}
      {selectedMode === 'open' && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Bidding Duration</h3>
          <p className="text-sm text-gray-600">How long should Pals have to submit bids?</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DURATION_OPTIONS.map((option) => {
              const isSelected = biddingDuration === option.value

              return (
                <button
                  key={option.value}
                  onClick={() => onDurationChange(option.value)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    isSelected
                      ? 'border-primary bg-orange-50 text-primary'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
          <p className="text-xs text-gray-500">
            ⏱️ Shorter durations get faster results, but longer durations may attract more competitive bids
          </p>
        </div>
      )}

      {/* Mode-specific info */}
      {selectedMode === 'quick_accept' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-900">
            <span className="font-semibold">⚡ Quick Accept Mode:</span> The first Pal who bids at or below your maximum price will automatically get the job. Make sure your price is competitive!
          </p>
        </div>
      )}

      {selectedMode === 'direct_assign' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">👤 Direct Assignment:</span> You&apos;ll be able to select a preferred Pal from your previous deliveries in the next step.
          </p>
        </div>
      )}
    </div>
  )
}
