const Jurusan = require('../models/Jurusan')
const Bank = require('../models/Bank')
const Kelas = require('../models/Kelas')
const Murid = require('../models/Murid')
const fs = require('fs-extra')
const path = require('path')

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', {
            title: "Bayarin | Dashboard"
        })
    },

    viewBank: async (req, res) => {
        const bank = await Bank.find()
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')
        const alert = { message: alertMessage, status: alertStatus }
        res.render('admin/bank/view_bank', {
            title: "Bayarin | Bank",
            alert,
            bank
        })
    },
    addBank: async (req, res) => {
        try {
            const { name, nameBank, nomorRekening } = req.body;
            await Bank.create({
                name,
                nameBank,
                nomorRekening,
                imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add Bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },
    editBank: async (req, res) => {
        try {
            const { id, name, nameBank, nomorRekening } = req.body;
            const bank = await Bank.findOne({ _id: id })
            if (req.file == undefined) {
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                await bank.save()
                req.flash('alertMessage', 'Success Update Bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank')
            } else {
                await fs.unlink(path.join(`public/${bank.imageUrl}`));
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                bank.imageUrl = `images/${req.file.filename}`
                await bank.save()
                req.flash('alertMessage', 'Success Update Bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },
    deleteBank: async (req, res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findOne({ _id: id });
            await fs.unlink(path.join(`public/${bank.imageUrl}`));
            await bank.remove();
            req.flash('alertMessage', 'Success Delete Bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },

    viewJurusan: async (req, res) => {
        try {
            const jurusan = await Jurusan.find();
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/jurusan/view_jurusan', {
                jurusan,
                alert,
                title: "Bayarin | Jurusan"
            })
        } catch (error) {
            res.redirect('/admin/jurusan')
        }
    },
    addJurusan: async (req, res) => {
        try {
            const { name } = req.body;
            await Jurusan.create({ name });
            req.flash('alertMessage', 'Success Add Jurusan')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/jurusan')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/jurusan')
        }
    },
    editJurusan: async (req, res) => {
        try {
            const { id, name } = req.body;
            const jurusan = await Jurusan.findOne({ _id: id });
            jurusan.name = name;
            await jurusan.save()
            req.flash('alertMessage', 'Success Update Jurusan')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/jurusan')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/jurusan')
        }
    },
    deleteJurusan: async (req, res) => {
        try {
            const { id } = req.params;
            const jurusan = await Jurusan.findOne({ _id: id });
            await jurusan.remove()
            req.flash('alertMessage', 'Success Delete Jurusan')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/jurusan')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/jurusan')
        }
    },

    viewKelas: async (req, res) => {
        try {
            const kelas = await Kelas.find()
                .populate({ path: 'jurusanId', select: 'id name' });
            const jurusan = await Jurusan.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/kelas/view_kelas', {
                title: "Bayarin | Kelas",
                alert,
                kelas,
                jurusan,
                action: 'view'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/kelas')
        }
    },
    addKelas: async (req, res) => {
        try {
            const { jurusanId, name } = req.body;
            const jurusan = await Jurusan.findOne({ _id: jurusanId });
            const newKelas = {
                jurusanId: jurusan._id,
                name
            }
            const kelas = await Kelas.create(newKelas)
            jurusan.kelasId.push({ _id: kelas._id })
            await jurusan.save();
            req.flash('alertMessage', 'Success Add Kelas')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/kelas')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/kelas')
        }
    },
    showEditKelas: async (req, res) => {
        try {
            const { id } = req.params;
            const kelas = await Kelas.findOne({ _id: id })
                .populate({ path: 'jurusanId', select: 'id name' });
            const jurusan = await Jurusan.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/kelas/view_kelas', {
                title: "Bayarin | Edit Kelas",
                alert,
                kelas,
                jurusan,
                action: 'edit'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/kelas')
        }
    },
    editKelas: async (req, res) => {
        try {
            const { id } = req.params;
            const { jurusanId, name } = req.body;
            const kelas = await Kelas.findOne({ _id: id })
                .populate({ path: 'jurusanId', select: 'id name' });
            kelas.name = name;
            kelas.jurusanId = jurusanId;
            await kelas.save();
            req.flash('alertMessage', 'Success Update Kelas')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/kelas')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/kelas')
        }
    },
    deleteKelas: async (req, res) => {
        try {
            const { id } = req.params;
            const kelas = await Kelas.findOne({ _id: id });
            await kelas.remove();
            req.flash('alertMessage', 'Success Delete Kelas')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/kelas')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/kelas')
        }
    },

    viewKelasMurid: async (req, res) => {
        const { kelasId } = req.params
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            const murid = await Murid.find({ kelasId: kelasId });
            res.render('admin/kelas/murid/view_murid', {
                title: "Bayarin | Murid",
                alert,
                kelasId,
                murid
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`)
        }
    },
    addMurid: async (req, res) => {
        const { nisn, name, jenisKelamin, noTelepon, alamat, kelasId } = req.body;
        try {
            const kelas = await Kelas.findOne({ _id: kelasId });
            const newMurid = {
                nisn,
                name,
                jenisKelamin,
                noTelepon,
                alamat,
                kelasId: kelas._id,
            }
            const murid = await Murid.create(newMurid);
            kelas.muridId.push({ _id: murid._id })
            await kelas.save();
            req.flash('alertMessage', 'Success Add Murid')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`)
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`)
        }
    },
    editMurid: async (req, res) => {
        const { id, nisn, name, jenisKelamin, noTelepon, alamat, kelasId } = req.body;
        try {
            const murid = await Murid.findOne({ _id: id })
            murid.nisn = nisn;
            murid.name = name;
            murid.jenisKelamin = jenisKelamin;
            murid.noTelepon = noTelepon;
            murid.alamat = alamat;
            await murid.save()
            req.flash('alertMessage', 'Success Update Murid')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`)
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`)
        }
    },
    deleteMurid: async (req, res) => {
        const { id, kelasId } = req.params;
        try {
            const murid = await Murid.findOne({ _id: id });
            const kelas = await (await Kelas.findOne({ _id: kelasId })).populate('muridId');
            for (let i = 0; i < kelas.muridId.length; i++) {
                if (kelas.muridId[i]._id.toString() === murid._id.toString()) {
                    kelas.muridId.pull({ _id: murid._id });
                    await kelas.save()
                }
            }
            await murid.remove();
            req.flash('alertMessage', 'Success Delete Murid')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`)
        } catch (error) {
            console.log(error)
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`)
        }
    },

    viewTransaksi: (req, res) => {
        res.render('admin/transaksi/view_transaksi', {
            title: "Bayarin | Transaksi"
        })
    },
}