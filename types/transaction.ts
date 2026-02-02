export interface Transaction {
  _id: string;
  type:
    | "deposit"
    | "withdrawal"
    | "escrow_lock"
    | "escrow_release"
    | "commission"
    | "refund";
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed";
  balanceAfter?: number;
  description: string;
  createdAt: string | Date;
  metadata?: {
    paymentId?: string;
    reference?: string;
    provider?: string;
    providerReference?: string;
  };
}

export interface AccountResponse {
  accountBalance: number;
  totalEscrowAmount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}