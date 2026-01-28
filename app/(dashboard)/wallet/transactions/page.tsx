/**
 * Transactions Page
 *
 * Shows wallet transaction history.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/appStore'

export default function TransactionsPage() {
  const router = useRouter()
  const { user } = useAppStore()

  const transactions = user?.transactions || []

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <button
        onClick={() => router.back()}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Transaction History
      </h1>

      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2 text-5xl">💳</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No transactions yet
          </h3>
          <p className="text-gray-600">
            Your wallet transactions will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">
                    {['earning', 'refund', 'bonus', 'tip_payment', 'wallet_topup'].includes(transaction.type) ? '↓ ' : '↑ '}
                    {transaction.description || 'Transaction'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      ['earning', 'refund', 'bonus', 'tip_payment', 'wallet_topup'].includes(transaction.type)
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {['earning', 'refund', 'bonus', 'tip_payment', 'wallet_topup'].includes(transaction.type) ? '+' : '-'}₦
                    {Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {transaction.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
