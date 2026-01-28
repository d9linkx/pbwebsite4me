import { UserRole } from '../types';

export interface Transaction {
  id: string;
  userId: string;
  type: 'earning' | 'escrow_payment' | 'withdrawal' | 'bonus' | 'fee' | 'refund' | 'tip_payment' | 'wallet_topup' | 'storage_fee' | 'equipment_fee';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  jobId?: string;
  timestamp: string;
  paymentMethod: 'wallet' | 'card' | 'bank_transfer';
  reference: string;
}

// 🔥 GENERATE SIMULATED TRANSACTIONS FOR USER ROLES
export const generateSimulatedTransactions = (role: UserRole, userId: string): Transaction[] => {
  const now = new Date();
  const transactions: Transaction[] = [];

  if (role === 'pal') {
    // Pal transactions: Earnings from deliveries, withdrawals, fees
    transactions.push(
      {
        id: 'txn-pal-1',
        userId,
        type: 'earning',
        amount: 15000,
        status: 'completed',
        description: 'Delivery earnings - Electronics Package',
        jobId: '7',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'EARN-7-001'
      },
      {
        id: 'txn-pal-2',
        userId,
        type: 'earning',
        amount: 12000,
        status: 'completed',
        description: 'Delivery earnings - Anniversary Gift Box',
        jobId: '4',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'EARN-4-001'
      },
      {
        id: 'txn-pal-3',
        userId,
        type: 'withdrawal',
        amount: -20000,
        status: 'completed',
        description: 'Bank withdrawal to GTBank',
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'bank_transfer',
        reference: 'WTH-PAL-001'
      },
      {
        id: 'txn-pal-4',
        userId,
        type: 'earning',
        amount: 8500,
        status: 'pending',
        description: 'Delivery earnings - Wedding Dress Package',
        jobId: '2',
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'EARN-2-001'
      },
      {
        id: 'txn-pal-5',
        userId,
        type: 'bonus',
        amount: 5000,
        status: 'completed',
        description: 'Weekly performance bonus',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'BONUS-WEEK-12'
      },
      {
        id: 'txn-pal-6',
        userId,
        type: 'fee',
        amount: -500,
        status: 'completed',
        description: 'Platform service fee',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'FEE-SERVICE-001'
      }
    );
  } else if (role === 'sender') {
    // Sender transactions: Escrow payments, refunds, fees
    transactions.push(
      {
        id: 'txn-send-1',
        userId,
        type: 'escrow_payment',
        amount: -458500, // Job value + pal fee
        status: 'completed',
        description: 'Escrow payment - Wedding Dress Package',
        jobId: '2',
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'card',
        reference: 'ESC-2-001'
      },
      {
        id: 'txn-send-2',
        userId,
        type: 'escrow_payment',
        amount: -31500, // Job value + pal fee
        status: 'completed',
        description: 'Escrow payment - Medical Documents',
        jobId: '3',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'ESC-3-001'
      },
      {
        id: 'txn-send-3',
        userId,
        type: 'wallet_topup',
        amount: 50000,
        status: 'completed',
        description: 'Wallet top-up via bank transfer',
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'bank_transfer',
        reference: 'TOP-SEND-001'
      },
      {
        id: 'txn-send-4',
        userId,
        type: 'refund',
        amount: 25000,
        status: 'completed',
        description: 'Refund - Cancelled delivery',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'REF-CANCEL-001'
      },
      {
        id: 'txn-send-5',
        userId,
        type: 'fee',
        amount: -2500,
        status: 'completed',
        description: 'Service fee - Delivery processing',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'FEE-PROC-001'
      }
    );
  } else if (role === 'receiver') {
    // Receiver transactions: Tips, refunds for damaged items
    transactions.push(
      {
        id: 'txn-recv-1',
        userId,
        type: 'tip_payment',
        amount: -2000,
        status: 'completed',
        description: 'Tip to Pal - Excellent service',
        jobId: '8',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'TIP-8-001'
      },
      {
        id: 'txn-recv-2',
        userId,
        type: 'refund',
        amount: 15000,
        status: 'completed',
        description: 'Compensation - Damaged item received',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'COMP-DAM-001'
      },
      {
        id: 'txn-recv-3',
        userId,
        type: 'wallet_topup',
        amount: 10000,
        status: 'completed',
        description: 'Wallet top-up for tips',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'card',
        reference: 'TOP-RECV-001'
      }
    );
  } else if (role === 'proxy') {
    // Proxy transactions: Storage fees earned, business expenses
    transactions.push(
      {
        id: 'txn-prox-1',
        userId,
        type: 'storage_fee',
        amount: 1500,
        status: 'completed',
        description: 'Storage fee - Electronics package (3 days)',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'STOR-ELEC-001'
      },
      {
        id: 'txn-prox-2',
        userId,
        type: 'storage_fee',
        amount: 1000,
        status: 'completed',
        description: 'Storage fee - Document envelope (2 days)',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'STOR-DOC-001'
      },
      {
        id: 'txn-prox-3',
        userId,
        type: 'storage_fee',
        amount: 2000,
        status: 'completed',
        description: 'Storage fee - Jewelry package (4 days)',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'STOR-JEW-001'
      },
      {
        id: 'txn-prox-4',
        userId,
        type: 'withdrawal',
        amount: -15000,
        status: 'completed',
        description: 'Business account withdrawal',
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'bank_transfer',
        reference: 'WTH-BIZ-001'
      },
      {
        id: 'txn-prox-5',
        userId,
        type: 'equipment_fee',
        amount: -3000,
        status: 'completed',
        description: 'Storage equipment maintenance',
        timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'wallet',
        reference: 'MAINT-EQ-001'
      }
    );
  }

  console.log(`🔥 Generated ${transactions.length} transactions for ${role}:`, transactions);
  return transactions;
};