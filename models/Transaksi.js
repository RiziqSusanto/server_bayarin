const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const transaksiSchema = new mongoose.Schema({
  transaksiDate: {
    type: Date,
    required: true
  },
  invoice: {
    type: String,
    required: true
  },
  namaMurid: {
    type: String,
    required: true,
  },
  nisnMurid: {
    type: String,
    required: true,
  },
  memberId: {
    type: ObjectId,
    ref: "Member",
  },
  payments: {
    proofPayment: {
      type: String,
      required: true,
    },
    bankFrom: {
      type: String,
      required: true,
    },
    accountHolder: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Proses",
    },
  },
});

module.exports = mongoose.model("Transaksi", transaksiSchema);
