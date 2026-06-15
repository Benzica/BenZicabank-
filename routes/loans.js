const express = require('express');
const { body, validationResult } = require('express-validator');
const LoanApplication = require('../models/LoanApplication');
const Account = require('../models/Account');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Create loan application
router.post('/', authMiddleware, [
  body('loanType').isIn(['PERSONAL', 'MORTGAGE', 'AUTO', 'STUDENT', 'BUSINESS']),
  body('loanAmount').isFloat({ min: 100 }).withMessage('Minimum loan amount is $100'),
  body('loanTerm').isInt({ min: 1 }).withMessage('Valid loan term required'),
  body('purpose').notEmpty().withMessage('Purpose required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { loanType, loanAmount, loanTerm, purpose, accountId } = req.body;

    const loanApp = new LoanApplication({
      userId: req.userId,
      accountId,
      loanType,
      loanAmount,
      loanTerm,
      purpose,
      status: 'SUBMITTED'
    });

    await loanApp.save();

    res.status(201).json({
      success: true,
      message: 'Loan application submitted',
      loanApplication: loanApp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get loan applications
router.get('/', authMiddleware, async (req, res) => {
  try {
    const loans = await LoanApplication.find({ userId: req.userId })
      .populate('accountId')
      .sort({ createdAt: -1 });

    res.json({ success: true, loans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get loan application details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const loan = await LoanApplication.findById(req.params.id)
      .populate('accountId')
      .populate('reviewedBy', 'firstName lastName email');

    if (!loan || loan.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Upload loan document
router.post('/:id/upload-document', authMiddleware, async (req, res) => {
  try {
    const { documentType, fileName, fileUrl } = req.body;

    const loan = await LoanApplication.findById(req.params.id);

    if (!loan || loan.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    loan.documents.push({
      documentType,
      fileName,
      fileUrl,
      uploadedAt: new Date()
    });

    await loan.save();

    res.json({ success: true, message: 'Document uploaded', loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get payment schedule
router.get('/:id/payment-schedule', authMiddleware, async (req, res) => {
  try {
    const loan = await LoanApplication.findById(req.params.id);

    if (!loan || loan.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({
      success: true,
      paymentSchedule: loan.paymentSchedule,
      nextPaymentDue: loan.nextPaymentDue,
      remainingBalance: loan.remainingBalance
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Make loan payment
router.post('/:id/payment', authMiddleware, async (req, res) => {
  try {
    const loan = await LoanApplication.findById(req.params.id);

    if (!loan || loan.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const nextPayment = loan.paymentSchedule.find(p => p.status === 'PENDING');

    if (!nextPayment) {
      return res.status(400).json({ success: false, message: 'No pending payments' });
    }

    nextPayment.status = 'COMPLETED';
    nextPayment.paidDate = new Date();
    loan.totalPaid += nextPayment.amount;
    loan.remainingBalance -= nextPayment.principal;

    await loan.save();

    res.json({
      success: true,
      message: 'Loan payment processed',
      payment: nextPayment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
