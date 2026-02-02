import { DeliveryJob, User, DisputeResolution, CommunicationMessage, EvidenceFile, DisputeResolutionMetrics } from '../types';

export interface SupportContext {
  job: DeliveryJob | null;
  user: User | null;
  dispute: DisputeResolution | null;
}

export class SupportHandlers {
  private context: SupportContext;

  constructor(context: SupportContext) {
    this.context = context;
  }

  updateContext(context: Partial<SupportContext>) {
    this.context = { ...this.context, ...context };
  }

  // Enhanced dispute creation
  createDispute(
    reason: string,
    description: string,
    evidenceFiles?: File[]
  ): DisputeResolution | null {
    if (!this.context.job || !this.context.user) {
      console.error('❌ SupportHandler: Cannot create dispute without job and user');
      return null;
    }

    const dispute: DisputeResolution = {
      id: Date.now().toString(),
      jobId: this.context.job.id,
      palId: this.context.job.selectedPalId || '',
      senderId: this.context.job.senderId,
      reason,
      description,
      reportedBy: this.context.user._id,
      reportedAt: new Date().toISOString(),
      timestamp: new Date().toISOString(),
      timeoutAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
      status: 'pending',
      involvedParties: [this.context.user._id, this.context.job.selectedPalId || '', this.context.job.senderId],
      evidence: evidenceFiles ? this.processEvidenceFiles(evidenceFiles) : undefined
    };

    console.log('🚨 SupportHandler: Dispute created -', dispute.id, reason);
    return dispute;
  }

  // Enhanced evidence processing
  private processEvidenceFiles(files: File[]): EvidenceFile[] {
    return files.map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      url: URL.createObjectURL(file) // In production, this would be uploaded to storage
    }));
  }

  // Enhanced item mismatch handler
  handleItemMismatch(
    mismatchDetails: {
      expectedItem: string;
      actualItem: string;
      photos?: File[];
      notes?: string;
    }
  ): DisputeResolution | null {
    const description = `Item mismatch reported:
Expected: ${mismatchDetails.expectedItem}
Actual: ${mismatchDetails.actualItem}
${mismatchDetails.notes ? `Notes: ${mismatchDetails.notes}` : ''}`;

    return this.createDispute('Item mismatch', description, mismatchDetails.photos);
  }

  // Enhanced damage report handler
  handleDamageReport(
    damageDetails: {
      damageType: 'minor' | 'major' | 'total';
      description: string;
      photos?: File[];
      estimatedValue?: number;
    }
  ): DisputeResolution | null {
    const description = `Damage reported:
Type: ${damageDetails.damageType}
Description: ${damageDetails.description}
${damageDetails.estimatedValue ? `Estimated damage value: ₦${damageDetails.estimatedValue.toLocaleString()}` : ''}`;

    return this.createDispute('Item damage', description, damageDetails.photos);
  }

  // Enhanced delivery delay handler
  handleDeliveryDelay(
    delayDetails: {
      originalTime: string;
      newEstimatedTime: string;
      reason: string;
    }
  ): void {
    if (!this.context.job) return;

    console.log('⏰ SupportHandler: Delivery delay reported -', {
      jobId: this.context.job.id,
      originalTime: delayDetails.originalTime,
      newEstimatedTime: delayDetails.newEstimatedTime,
      reason: delayDetails.reason
    });

    // In a real app, this would notify relevant parties
    // and update the job's estimated delivery time
  }

  // Enhanced communication handler
  createCommunicationMessage(
    recipient: 'sender' | 'pal' | 'receiver' | 'support',
    message: string,
    urgency: 'low' | 'medium' | 'high' = 'medium'
  ): CommunicationMessage {
    if (!this.context.user) return {} as CommunicationMessage;

    const communicationMessage = {
      id: Date.now().toString(),
      from: this.context.user._id,
      fromRole: this.context.user.role,
      to: recipient,
      message,
      urgency,
      timestamp: new Date().toISOString(),
      jobId: this.context.job?.id,
      read: false
    };

    console.log('💬 SupportHandler: Communication created -', {
      recipient,
      urgency,
      jobId: this.context.job?.id
    });

    return communicationMessage;
  }

  // Enhanced timeout calculation
  calculateDisputeTimeout(urgency: 'low' | 'medium' | 'high' = 'medium'): number {
    const timeouts = {
      low: 24 * 60 * 60 * 1000,    // 24 hours
      medium: 10 * 60 * 1000,      // 10 minutes (for demo)
      high: 5 * 60 * 1000          // 5 minutes
    };

    return timeouts[urgency];
  }

  // Enhanced compensation calculation
  calculateCompensation(
    disputeType: string,
    jobValue: number,
    palCompletionRate: number = 0.95
  ): {
    palCompensation: number;
    senderRefund: number;
    platformFee: number;
  } {
    let palPercentage = 0;
    let senderPercentage = 0;
    const platformPercentage = 0.1; // 10% platform fee

    switch (disputeType) {
      case 'Item mismatch':
        palPercentage = 0.4; // 40% compensation for pal's time
        senderPercentage = 0.5; // 50% refund for sender
        break;
      case 'Item damage':
        palPercentage = 0.2; // 20% if pal was at fault
        senderPercentage = 0.7; // 70% refund for sender
        break;
      case 'Delivery delay':
        palPercentage = 0.6; // 60% if delay was justified
        senderPercentage = 0.3; // 30% refund for inconvenience
        break;
      default:
        palPercentage = 0.4;
        senderPercentage = 0.5;
    }

    // Adjust based on pal's completion rate
    if (palCompletionRate > 0.98) {
      palPercentage += 0.1; // Bonus for excellent pals
      senderPercentage -= 0.1;
    }

    const palCompensation = Math.floor(jobValue * palPercentage);
    const senderRefund = Math.floor(jobValue * senderPercentage);
    const platformFee = Math.floor(jobValue * platformPercentage);

    console.log('💰 SupportHandler: Compensation calculated -', {
      jobValue,
      palCompensation,
      senderRefund,
      platformFee,
      disputeType
    });

    return {
      palCompensation,
      senderRefund,
      platformFee
    };
  }

  // Enhanced escalation handler
  shouldEscalateDispute(
    dispute: DisputeResolution,
    timeElapsed: number,
    responses: number
  ): boolean {
    const escalationCriteria = {
      timeThreshold: 2 * 60 * 60 * 1000, // 2 hours
      responseThreshold: 3, // 3 back-and-forth messages
      highValueThreshold: 100000 // ₦100,000
    };

    const jobValue = this.context.job?.value || 0;

    return (
      timeElapsed > escalationCriteria.timeThreshold ||
      responses >= escalationCriteria.responseThreshold ||
      jobValue > escalationCriteria.highValueThreshold
    );
  }

  // Enhanced resolution tracking
  trackResolutionMetrics(dispute: DisputeResolution): DisputeResolutionMetrics {
    const resolutionTime = new Date().getTime() - new Date(dispute.timestamp).getTime();
    const metrics: DisputeResolutionMetrics = {
      disputeId: dispute.id,
      resolutionTimeMs: resolutionTime,
      resolutionTimeHours: resolutionTime / (1000 * 60 * 60),
      disputeType: dispute.reason,
      jobValue: this.context.job?.value || 0,
      automaticResolution: dispute.status === 'timeout',
      timestamp: new Date().toISOString()
    };

    console.log('📊 SupportHandler: Resolution metrics -', metrics);
    return metrics;
  }
}

// Utility functions for support operations
export const supportUtils = {
  // Format dispute timeline
  formatDisputeTimeline: (dispute: DisputeResolution): string[] => {
    const timeline = [];
    timeline.push(`Created: ${new Date(dispute.timestamp).toLocaleString()}`);
    
    if (dispute.timeoutAt) {
      timeline.push(`Timeout: ${new Date(dispute.timeoutAt).toLocaleString()}`);
    }
    
    return timeline;
  },

  // Generate dispute reference number
  generateDisputeReference: (dispute: DisputeResolution): string => {
    const date = new Date(dispute.timestamp);
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    return `DSP-${dateStr}-${dispute.id.slice(-6).toUpperCase()}`;
  },

  // Calculate time remaining for dispute
  calculateTimeRemaining: (timeoutAt: string): number => {
    return Math.max(0, new Date(timeoutAt).getTime() - new Date().getTime());
  },

  // Format time remaining as human readable
  formatTimeRemaining: (ms: number): string => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
};