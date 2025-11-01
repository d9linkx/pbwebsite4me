/**
 * Payment Methods Page
 *
 * Manage saved bank accounts and payment cards.
 * Replaces the 'payment-methods' screen from the monolith.
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { PaymentMethodsScreen } from '@/components/PaymentMethodsScreen'
import { useAppStore } from '@/stores/appStore'
import type { Screen, BankAccount, PaymentCard, PaymentMethod } from '@/types/index'
import { toast } from 'sonner'

export default function PaymentMethodsPage() {
  const router = useRouter()

  const { user, updateUser } = useAppStore()

  const handleNavigate = (screen: Screen) => {
    const routeMap: Partial<Record<Screen, string>> = {
      'settings': '/settings',
      'dashboard': '/dashboard',
    }

    const route = routeMap[screen] || '/settings'
    router.push(route)
  }

  type PaymentMethodInput = Omit<PaymentMethod, 'id' | 'isDefault'> & { type: 'card' | 'bank' };

  const handleAddPaymentMethod = (input: PaymentMethodInput) => {
    if (!user) return;

    if (input.type === 'bank') {
      const { type, ...bankData } = input;
      const newBankAccount: BankAccount = {
        ...bankData as Omit<BankAccount, 'id' | 'isDefault'>,
        id: `bank-${Date.now()}`,
        isDefault: (user.bankAccounts?.length ?? 0) === 0
      };
      const newBankAccounts = [...(user.bankAccounts || []), newBankAccount];
      updateUser({ bankAccounts: newBankAccounts });
      toast.success('Bank account added successfully!');
    } else if (input.type === 'card') {
      const { type, ...cardData } = input;
      const newCard: PaymentCard = {
        ...cardData as Omit<PaymentCard, 'id' | 'isDefault'>,
        id: `card-${Date.now()}`,
        isDefault: (user.cards?.length ?? 0) === 0
      };
      const newCards = [...(user.cards || []), newCard];
      updateUser({ cards: newCards });
      toast.success('Card added successfully!');
    }
  }

  const handleRemovePaymentMethod = (methodId: string) => {
    if (!user) return

    // Remove from bank accounts or cards
    const newBankAccounts = (user.bankAccounts || []).filter(
      (acc) => acc.id !== methodId
    )
    const newCards = (user.cards || []).filter((card) => card.id !== methodId)

    updateUser({
      bankAccounts: newBankAccounts,
      cards: newCards,
    })

    toast.success('Payment method removed')
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PaymentMethodsScreen
        user={user}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onAddPaymentMethod={handleAddPaymentMethod}
        onRemovePaymentMethod={handleRemovePaymentMethod}
      />
    </div>
  )
}
