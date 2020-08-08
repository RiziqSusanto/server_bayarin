const Member = require('../models/Member')
const Transaksi = require('../models/Transaksi')
const Bank = require('../models/Bank');

module.exports = {
    bank: async (req, res) => {
        try {
            const bank = await Bank.find();
            res.status(200).json({
                bank,
            })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    home: async (req, res) => {

        const {
            transaksiDate,
            firstName,
            lastName,
            phoneNumber,
            nisnMurid,
            namaMurid,
            accountHolder,
            bankFrom,
        } = req.body;

        if (!req.file) {
            return res.status(404).json({ message: "Image not found" });
        }

        if (transaksiDate === undefined ||
            firstName === undefined ||
            lastName === undefined ||
            phoneNumber === undefined ||
            nisnMurid === undefined ||
            namaMurid === undefined ||
            accountHolder === undefined ||
            bankFrom === undefined) {
            res.status(404).json({ message: "Lengkapi semua field" });
        }

        const invoice = Math.floor(1000000 + Math.random() * 9000000);

        const member = await Member.create({
            firstName,
            lastName,
            phoneNumber
        });

        const newTransaksi = {
            invoice,
            transaksiDate,
            namaMurid,
            nisnMurid,
            memberId: member.id,
            payments: {
                proofPayment: `images/${req.file.filename}`,
                bankFrom: bankFrom,
                accountHolder: accountHolder
            }
        }

        const transaksi = await Transaksi.create(newTransaksi)

        res.status(201).json({ message: "Success Transaksi", transaksi });
    }
}