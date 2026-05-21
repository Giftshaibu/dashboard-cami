export type Provider = "Airtel Money" | "TNM Mpamba"

export type PaymentStatus =
  | "Successful"
  | "Pending"
  | "Failed"
  | "Expired"
  | "Refunded"
  | "Reversed"
  | "Settled"
  | "On Hold"
  | "Mismatch"

export type SettlementStatus =
  | "Unsettled"
  | "Settling"
  | "Settled"
  | "Held"
  | "Paid"
  | "Pending"
  | "Failed"
  | "On Hold"

export type Merchant = {
  id: string
  businessName: string
  tradingName: string
  registrationNumber: string
  taxNumber?: string
  businessType: string
  industry: string
  address: string
  city: string
  country: "Malawi"
  contactPerson: string
  phone: string
  email: string
  website: string
  expectedMonthlyVolume: number
  averageTransactionSize: number
  kycStatus: "Submitted" | "Under Review" | "Approved" | "Requires Update"
  riskLevel: "Low risk" | "Medium risk" | "High risk"
}

export type TransactionEvent = {
  time: string
  label: string
  detail: string
}

export type Transaction = {
  id: string
  providerReference: string
  merchantReference: string
  customerPhone: string
  provider: Provider
  amount: number
  fees: number
  netAmount: number
  status: PaymentStatus
  settlementStatus: SettlementStatus
  date: string
  description: string
  branch: string
  cashier: string
  callbackUrl: string
  webhookStatus: "Delivered" | "Retrying" | "Failed" | "Pending"
  settlementBatch?: string
  failureReason?: string
  timeline: TransactionEvent[]
}

export type Settlement = {
  id: string
  period: string
  grossAmount: number
  fees: number
  refundsAndReversals: number
  netSettlement: number
  destination: string
  status: SettlementStatus
  datePaid?: string
  transactionCount: number
}

export type Refund = {
  id: string
  transactionId: string
  customerPhone: string
  amount: number
  type: "Full" | "Partial"
  reason: string
  status: "Requested" | "Approved" | "Processing" | "Successful" | "Failed" | "Rejected"
  requestedBy: string
  reviewedBy?: string
  date: string
}

export type Dispute = {
  id: string
  transactionId: string
  customerPhone: string
  provider: Provider
  amount: number
  reason: string
  status:
    | "Open"
    | "Under Review"
    | "Waiting for Provider"
    | "Waiting for Merchant"
    | "Resolved"
    | "Escalated"
    | "Closed"
  assignedTo: string
  slaDeadline: string
  notes: string
}

export type Customer = {
  id: string
  phone: string
  totalPaid: number
  lastPayment: string
  successfulPayments: number
  failedPayments: number
  refunds: number
  disputeCount: number
  riskFlag: "None" | "Watchlist" | "High failure rate" | "Refund review"
}

export type WebhookEvent = {
  id: string
  event: string
  url: string
  status: "Delivered" | "Failed" | "Retrying"
  httpCode: number
  attempts: number
  lastAttempt: string
}

export type ApiKey = {
  id: string
  name: string
  environment: "Test" | "Live"
  prefix: string
  maskedValue: string
  scopes: string[]
  lastUsed: string
  status: "Active" | "Disabled"
}

export type Branch = {
  id: string
  name: string
  city: string
  manager: string
  cashiers: number
  grossCollections: number
  successfulPayments: number
  failedPayments: number
  status: "Active" | "On Hold"
}

export type TeamMember = {
  id: string
  name: string
  email: string
  role: "Owner" | "Admin" | "Finance Manager" | "Developer" | "Support Agent" | "Cashier" | "Viewer"
  branch?: string
  status: "Active" | "Invited" | "Suspended"
  lastActive: string
  permissions: string[]
}

export type KycDocument = {
  id: string
  name: string
  status: "Verified" | "Pending" | "Required" | "Rejected"
  updatedAt?: string
}

export type ReconciliationItem = {
  id: string
  provider: Provider
  providerReference: string
  gatewayReference?: string
  amount: number
  providerAmount?: number
  status:
    | "Matched"
    | "Missing in Provider"
    | "Missing in Gateway"
    | "Amount Mismatch"
    | "Duplicate References"
    | "Manually Resolved"
  date: string
  note: string
}

export type PaymentLink = {
  id: string
  name: string
  type: "Single-use" | "Reusable"
  amountMode: "Fixed amount" | "Customer-entered"
  amount?: number
  payments: number
  expiresAt: string
  status: "Active" | "Expired" | "Paused"
}

export type ReportCard = {
  title: string
  description: string
  cadence: string
  lastGenerated: string
}
