/**
 * @file Ini adalah file Controller halaman admin pada project website Bayarin .
 *
 * @version 1.0
 * @author Muhammad Riziq Susanto
 * @copyright 2020
 *
 */

/**
 * Menggunakan package fs untuk file system
 */
const fs = require("fs-extra");
/**
 * Menggunakan package path untuk path file
 */
const path = require("path");
/**
 * Menggunakan package bcrypt untuk bcrypt password
 */
const bcrypt = require("bcryptjs");

/**
 * Memanggil semua model seperti, Jurusan, Kelas, Murid, Bank, Users, Member, Transaksi
 * @alias Model
 */
const Jurusan = require("../models/Jurusan");
const Bank = require("../models/Bank");
const Kelas = require("../models/Kelas");
const Murid = require("../models/Murid");
const Users = require("../models/Users");
const Member = require("../models/Member");
const Transaksi = require("../models/Transaksi");

/**
 * fungsi yang di export
 */
module.exports = {
  /**
   * Menampilkan halaman SignIn admin
   * @module viewSignIn
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          title: "Bayarin | Login",
          alert,
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },

  /**
   * Action untuk Sign in
   * @module actionSignIn
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  actionSignIn: async (req, res) => {
    try {
      /**
       * @member {String} Destructing username dan password yang diambil dari body
       */
      const { username, password } = req.body;
      const user = await Users.findOne({ username: username });
      if (!user) {
        req.flash("alertMessage", "User Yang Anda Masukan Tidak Ada");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "Password Yang Anda Masukan Tidak Cocok");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
      res.redirect("/admin/dashboard");
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },

  /**
   * Action untuk log out
   * @module actionLogOut
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  actionLogOut: async (req, res) => {
    /**
     * Destroy session yang ada
     * @method Destroy
     */
    req.session.destroy();
    res.redirect("/admin/signin");
  },

  /**
   * Menampilkan halaman Dashboard admin
   * @module viewDashboard
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  viewDashboard: async (req, res) => {
    try {
      /**
       * Method find untuk mencari seluruh koleksi yang sesuai
       * @method find
       */
      const member = await Member.find();
      const transaksi = await Transaksi.find();
      const jurusan = await Jurusan.find();
      const murid = await Murid.find();
      const kelas = await Kelas.find();
      res.render("admin/dashboard/view_dashboard", {
        title: "Bayarin | Dashboard",
        user: req.session.user,
        member,
        transaksi,
        jurusan,
        murid,
        kelas,
      });
    } catch (error) {}
  },

  /**
   * Menampilkan halaman Tabel Bank
   * @module viewBank
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  viewBank: async (req, res) => {
    /**
     * Method find untuk mencari koleksi bank
     * @method find
     */
    const bank = await Bank.find();
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("admin/bank/view_bank", {
      title: "Bayarin | Bank",
      alert,
      user: req.session.user,
      bank,
    });
  },
  /**
   * Menambah data bank
   * @module addBank
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  addBank: async (req, res) => {
    try {
      /**
       * @member {String} Destructing name, nameBank, dan nomorRekening yang diambil dari body
       */
      const { name, nameBank, nomorRekening } = req.body;
      /**
       * Method create untuk menambah data baru
       * @method create
       */
      await Bank.create({
        name,
        nameBank,
        nomorRekening,
        imageUrl: `images/${req.file.filename}`,
      });
      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  /**
   * Mengubah/Mengedit data bank
   * @module editBank
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  editBank: async (req, res) => {
    try {
      /**
       * @member {String} Destructing id, name, nameBank, dan nomorRekening yang diambil dari body
       */
      const { id, name, nameBank, nomorRekening } = req.body;
      /**
       * Method findOne untuk mencari 1 data dalam dokumen berdasarkan id
       * @method findOne
       */
      const bank = await Bank.findOne({ _id: id });
      /**
       * Method save untuk menyimpan data yang sudah diubah
       * @method save
       */
      // Jika tidak mengubah gambar bank
      if (req.file == undefined) {
        bank.name = name;
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        await bank.save();
        req.flash("alertMessage", "Success Update Bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      } else {
        // Jika mengubah gambar bank
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
        bank.name = name;
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        bank.imageUrl = `images/${req.file.filename}`;
        await bank.save();
        req.flash("alertMessage", "Success Update Bank");
        req.flash("alertStatus", "success");
        res.redirect("/admin/bank");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  /**
   * Menghapus data bank
   * @module deleteBank
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  deleteBank: async (req, res) => {
    try {
      /**
       * @member {String} Destructing id yang diambil dari parameter/url
       */
      const { id } = req.params;
      /**
       * Method findOne untuk mencari 1 data dalam dokumen berdasarkan id
       * @method findOne
       */
      const bank = await Bank.findOne({ _id: id });
      /**
       * Method unlink dari package fs untuk menghapus file
       * @method unlink
       */
      await fs.unlink(path.join(`public/${bank.imageUrl}`));
      /**
       * Method remove untuk menghapus data
       * @method remove
       */
      await bank.remove();
      req.flash("alertMessage", "Success Delete Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  /**
   * Menampilkan halaman tabel Jurusan
   * @module viewJurusan
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  viewJurusan: async (req, res) => {
    try {
      /**
       * Method find untuk mencari koleksi jurusan
       * @method find
       */
      const jurusan = await Jurusan.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/jurusan/view_jurusan", {
        jurusan,
        alert,
        title: "Bayarin | Jurusan",
        user: req.session.user,
      });
    } catch (error) {
      res.redirect("/admin/jurusan");
    }
  },
  /**
   * Menambah data jurusan
   * @module addJurusan
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  addJurusan: async (req, res) => {
    try {
      /**
       * @member {String} Destructing name yang diambil dari body
       */
      const { name } = req.body;
      /**
       * Method create untuk menambah data baru
       * @method create
       */
      await Jurusan.create({ name });
      req.flash("alertMessage", "Success Add Jurusan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jurusan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jurusan");
    }
  },
  /**
   * Mengubah/Mengedit data jurusan
   * @module editJurusan
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  editJurusan: async (req, res) => {
    try {
      /**
       * @member {String} Destructing id, dan name yang diambil dari body
       */
      const { id, name } = req.body;
      /**
       * Method findOne untuk mencari 1 data dalam dokumen berdasarkan id
       * @method findOne
       */
      const jurusan = await Jurusan.findOne({ _id: id });
      jurusan.name = name;
      /**
       * Method save untuk menyimpan data yang sudah diubah
       * @method save
       */
      await jurusan.save();
      req.flash("alertMessage", "Success Update Jurusan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jurusan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jurusan");
    }
  },
  /**
   * Menghapus data jurusan
   * @module deleteJurusan
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  deleteJurusan: async (req, res) => {
    try {
      /**
       * @member {String} Destructing id yang diambil dari parameter/url
       */
      const { id } = req.params;
      /**
       * Method findOne untuk mencari 1 data dalam dokumen berdasarkan id
       * @method findOne
       */
      const jurusan = await Jurusan.findOne({ _id: id });
      /**
       * Method remove untuk menghapus data
       * @method remove
       */
      await jurusan.remove();
      req.flash("alertMessage", "Success Delete Jurusan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jurusan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jurusan");
    }
  },

  /**
   * Menampilkan halaman tabel Kelas
   * @module viewKelas
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  viewKelas: async (req, res) => {
    try {
      /**
       * Method find untuk mencari koleksi kelas
       * @method find
       */
      /**
       * Method populate sebagai referensi dokemen yang dipilih ada di koleksi lain
       * @method populate
       * @param {String} path - kolom yang akan diisi
       * @param {String} select - kolom yang dipilih
       */
      const kelas = await Kelas.find().populate({
        path: "jurusanId",
        select: "id name",
      });
      /**
       * Method find untuk mencari koleksi jurusan
       * @method find
       */
      const jurusan = await Jurusan.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/kelas/view_kelas", {
        title: "Bayarin | Kelas",
        alert,
        kelas,
        jurusan,
        action: "view",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/kelas");
    }
  },
  /**
   * Menambah data kelas
   * @module addKelas
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  addKelas: async (req, res) => {
    try {
      /**
       * @member {String} Destructing jurusanId, dan name yang diambil dari body
       */
      const { jurusanId, name } = req.body;
      /**
       * Method findOne untuk mencari 1 data dalam dokumen berdasarkan id
       * @method findOne
       */
      const jurusan = await Jurusan.findOne({ _id: jurusanId });
      const newKelas = {
        jurusanId: jurusan._id,
        name,
      };
      /**
       * Method create untuk menambah data baru
       * @method create
       */
      const kelas = await Kelas.create(newKelas);
      jurusan.kelasId.push({ _id: kelas._id });
      await jurusan.save();
      req.flash("alertMessage", "Success Add Kelas");
      req.flash("alertStatus", "success");
      res.redirect("/admin/kelas");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/kelas");
    }
  },
  showEditKelas: async (req, res) => {
    try {
      const { id } = req.params;
      const kelas = await Kelas.findOne({ _id: id }).populate({
        path: "jurusanId",
        select: "id name",
      });
      const jurusan = await Jurusan.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/kelas/view_kelas", {
        title: "Bayarin | Edit Kelas",
        alert,
        kelas,
        jurusan,
        action: "edit",
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/kelas");
    }
  },
  editKelas: async (req, res) => {
    try {
      const { id } = req.params;
      const { jurusanId, name } = req.body;
      const kelas = await Kelas.findOne({ _id: id }).populate({
        path: "jurusanId",
        select: "id name",
      });
      kelas.name = name;
      kelas.jurusanId = jurusanId;
      await kelas.save();
      req.flash("alertMessage", "Success Update Kelas");
      req.flash("alertStatus", "success");
      res.redirect("/admin/kelas");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/kelas");
    }
  },
  deleteKelas: async (req, res) => {
    try {
      const { id } = req.params;
      const kelas = await Kelas.findOne({ _id: id });
      await kelas.remove();
      req.flash("alertMessage", "Success Delete Kelas");
      req.flash("alertStatus", "success");
      res.redirect("/admin/kelas");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/kelas");
    }
  },

  viewKelasMurid: async (req, res) => {
    const { kelasId } = req.params;
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const murid = await Murid.find({ kelasId: kelasId });
      res.render("admin/kelas/murid/view_murid", {
        title: "Bayarin | Murid",
        alert,
        kelasId,
        murid,
        user: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`);
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
      };
      const murid = await Murid.create(newMurid);
      kelas.muridId.push({ _id: murid._id });
      await kelas.save();
      req.flash("alertMessage", "Success Add Murid");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`);
    }
  },
  editMurid: async (req, res) => {
    const {
      id,
      nisn,
      name,
      jenisKelamin,
      noTelepon,
      alamat,
      status,
      kelasId,
    } = req.body;
    try {
      const murid = await Murid.findOne({ _id: id });
      murid.nisn = nisn;
      murid.name = name;
      murid.jenisKelamin = jenisKelamin;
      murid.noTelepon = noTelepon;
      murid.alamat = alamat;
      murid.status = status;
      await murid.save();
      req.flash("alertMessage", "Success Update Murid");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`);
    }
  },
  deleteMurid: async (req, res) => {
    const { id, kelasId } = req.params;
    try {
      const murid = await Murid.findOne({ _id: id });
      const kelas = await (await Kelas.findOne({ _id: kelasId })).populate(
        "muridId"
      );
      for (let i = 0; i < kelas.muridId.length; i++) {
        if (kelas.muridId[i]._id.toString() === murid._id.toString()) {
          kelas.muridId.pull({ _id: murid._id });
          await kelas.save();
        }
      }
      await murid.remove();
      req.flash("alertMessage", "Success Delete Murid");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`);
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/kelas/show-kelas-murid/${kelasId}`);
    }
  },

  viewTransaksi: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const transaksi = await Transaksi.find().populate("memberId");
      res.render("admin/transaksi/view_transaksi", {
        title: "Bayarin | Transaksi",
        alert,
        user: req.session.user,
        transaksi,
      });
    } catch (error) {
      res.redirect("/admin/transaksi");
    }
  },
  showDetailTransaksi: async (req, res) => {
    const { id } = req.params;
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const transaksi = await Transaksi.findOne({ _id: id }).populate(
        "memberId"
      );
      console.log(transaksi);
      res.render("admin/transaksi/show_detail_transaksi", {
        title: "Bayarin | Detail Transaksi",
        user: req.session.user,
        transaksi,
        alert,
      });
    } catch (error) {
      res.redirect("/admin/transaksi");
    }
  },
  deleteTransaksi: async (req, res) => {
    try {
      const { id } = req.params;
      const transaksi = await Transaksi.findOne({ _id: id });
      await transaksi.remove();
      req.flash("alertMessage", "Success Delete Transaksi");
      req.flash("alertStatus", "success");
      res.redirect("/admin/transaksi");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/transaksi");
    }
  },
  actionConfirmation: async (req, res) => {
    const { id } = req.params;
    try {
      const transaksi = await Transaksi.findOne({ _id: id });
      transaksi.payments.status = "ACCEPT";
      await transaksi.save();
      req.flash("alertMessage", "Success Konfirmasi Pembayaran");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/transaksi/${id}`);
    } catch (error) {
      res.redirect(`/admin/transaksi/${id}`);
    }
  },
  actionReject: async (req, res) => {
    const { id } = req.params;
    try {
      const transaksi = await Transaksi.findOne({ _id: id });
      transaksi.payments.status = "REJECT";
      await transaksi.save();
      req.flash("alertMessage", "Success Konfirmasi Pembayaran");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/transaksi/${id}`);
    } catch (error) {
      res.redirect(`/admin/transaksi/${id}`);
    }
  },

  viewUsers: async (req, res) => {
    const users = await Users.find();
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("admin/user/view_user", {
      title: "Bayarin | Bank",
      alert,
      user: req.session.user,
      users,
    });
  },
  addUsers: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      await Users.create({
        username,
        password,
        role,
      });
      req.flash("alertMessage", "Success Add Users");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/user`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/user`);
    }
  },
  editUsers: async (req, res) => {
    const { id, username, role } = req.body;
    try {
      const users = await Users.findOne({ _id: id });
      users.username = username;
      users.role = role;
      await users.save();
      req.flash("alertMessage", "Success Update Users");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/user`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/user`);
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await Users.findOne({ _id: id });
      await users.remove();
      req.flash("alertMessage", "Success Delete Users");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/user`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/user`);
    }
  },
};
