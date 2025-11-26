const mongoose = require('mongoose');
require('dotenv').config();

// Payment model (simplified version)
const paymentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  amountPaid: Number,
  completed: Boolean,
  currencyCode: String,
  customerEmail: String,
  customerName: String,
  paymentReference: String,
  paymentStatus: String,
  transactionReference: String,
  rawMonnifyResponse: Object,
  createdOn: Date,
  completedOn: Date
});

const Payment = mongoose.model('Payment', paymentSchema);

async function updatePayment() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prawnbox');
    
    // Update the specific payment using the payment reference
    const result = await Payment.updateOne(
      { paymentReference: '1764162319023' },
      {
        $set: {
          paymentStatus: 'PAID',
          completed: true,
          amountPaid: 100000,
          completedOn: new Date(),
          'rawMonnifyResponse.webhookData': {
            paymentStatus: 'PAID',
            amountPaid: 100000,
            paymentMethod: 'Card',
            paymentReference: '1764162319023',
            transactionReference: 'MNFY|79|20251126140521|000684'
          },
          'rawMonnifyResponse.webhookProcessedAt': new Date(),
          'rawMonnifyResponse.manuallyUpdated': true
        }
      }
    );
    
    console.log('Update result:', result);
    
    if (result.matchedCount > 0) {
      console.log('✅ Payment successfully updated to PAID status');
    } else {
      console.log('❌ Payment not found with reference: 1764162319023');
    }
    
  } catch (error) {
    console.error('Error updating payment:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updatePayment();
