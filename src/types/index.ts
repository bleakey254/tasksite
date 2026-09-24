export type ScreenId =
  | 'home'
  | 'find-tasks'
  | 'task-workspace'
  | 'earnings'
  | 'worker-disputes'
  | 'admin-approval'
  | 'admin-analytics'
  | 'admin-disputes';

export interface TaskClient {
  name: string;
  verified?: boolean;
  rating: number;
  reviewsCount?: number;
  avatarText?: string;
  completedTasks?: number;
}

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  categoryBadge?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert' | 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  deadline?: string;
  reward: number;
  unlockFee: number;
  client?: TaskClient;
  clientName?: string;
  clientRating?: number;
  description: string;
  tags: string[];
  slotsTotal?: number;
  slotsRemaining?: number;
  slotsUnlocked?: number;
  capacity?: number;
  completedCount?: number;
  isUnlocked?: boolean;
}

export interface TransactionItem {
  id: string;
  timestamp?: string;
  dateStr?: string;
  date?: string;
  description: string;
  subDescription?: string;
  taskTitle?: string;
  type: 'Task Bounty' | 'Micro-Unlock' | 'Payout Rail' | 'Dispute Escrow' | 'earnings' | 'unlock' | 'withdrawal';
  rail?: string;
  amount: number;
  isCredit?: boolean;
  status: 'Settled' | 'Processed' | 'Disbursed' | 'Arbitrating' | 'Claimed' | 'completed' | 'pending' | 'failed';
  auditRef?: string;
  escrowId?: string;
  category?: 'all' | 'earnings' | 'disputes' | 'unlocks' | 'withdrawals';
}

export interface DisputeParty {
  name: string;
  id?: string;
  email?: string;
  tier?: string;
  successRate?: number;
  completedTasks?: number;
  disputesCount?: number;
  totalEscrowPaid?: string;
  rating?: number;
  rejectionRate?: number;
}

export interface DisputeCase {
  id: string;
  linkedTaskId?: string;
  taskTitle: string;
  urgency?: 'High Urgency' | 'Pending Client' | 'Escrow Hold' | 'Security Flagged';
  slaRemaining?: string;
  escrowAmount?: number;
  amount?: number;
  unlockFeeClaim?: number;
  worker?: DisputeParty;
  workerName?: string;
  client?: DisputeParty;
  clientName?: string;
  clientReason?: string;
  clientTimestamp?: string;
  workerRebuttal?: string;
  workerTimestamp?: string;
  dateOpened?: string;
  automatedIoU?: number;
  thresholdIoU?: number;
  status: 'Under Review' | 'Resolved' | 'Settled' | 'Resolved - Favored Worker' | 'Resolved - Favored Client' | 'Resolved - 50/50 Split' | string;
  assignedArbitrator?: string;
  auditTrailNotes?: string;
}

export interface PayoutReceiptData {
  id?: string;
  taskTitle?: string;
  amount?: number;
  date?: string;
  escrowId?: string;
  protocol?: string;
  networkFee?: number;
  amountUSD?: number;
  amountKES?: number;
  phone?: string;
  receiptCode?: string;
  timestamp?: string;
}
