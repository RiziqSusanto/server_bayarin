/**
 * @file Ini adalah file Controller API pada project website Bayarin .
 *
 * @version 1.0
 * @author Muhammad Riziq Susanto
 * @copyright 2020
 *
 */

/**
 * Memanggil model sepertiBank, Member, Transaksi
 * @alias Model
 */
const Member = require("../models/Member");
const Transaksi = require("../models/Transaksi");
const Bank = require("../models/Bank");

/**
 * fungsi yang di export
 */
module.exports = {
  /**
   * API Bank
   * @module bank
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  bank: async (req, res) => {
    try {
      /**
       * Method find untuk mencari koleksi bank
       * @method find
       */
      const bank = await Bank.find();
      /**
       * status() menetapkan status HTTP pada respons
       * @func status
       * @param {number} StatusCode - 200 Respon standar untuk permintaan HTTP yang berhasil
       */
      /**
       * json() Ini mem-parsing permintaan masuk dengan payload JSON dan didasarkan pada body-parser. Kirim data bank
       * @func json
       */
      res.status(200).json({
        bank,
      });
    } catch (error) {
      /**
       * status() menetapkan status HTTP pada respons
       * @func status
       * @param {number} StatusCode - 500 diberikan ketika kondisi yang tidak terduga ditemukan dan tidak ada pesan yang lebih spesifik yang cocok.
       */
      /**
       * json() Ini mem-parsing permintaan masuk dengan payload JSON dan didasarkan pada body-parser. Kirim pesan bahwa Internal Server Error
       * @func json
       */
      res.status(500).json({ message: "Internal server error" });
    }
  },
  /**
   * API home
   * @module home
   * @param  {Object} req - Akan berisi request dari router
   * @param  {Object} res - Akan berisi result/response dari request
   */
  home: async (req, res) => {
    /**
     * @member {String} Destructing transaksiDate, firstName, lastName, phoneNumber, nisnMurid, namaMurid, accountHolder, bankFrom yang diambil dari body
     */
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

    /**
     * status() menetapkan status HTTP pada respons
     * @func status
     * @param {number} StatusCode - 404 Sumber daya yang diminta tidak dapat ditemukan.
     */
    /**
     * Jika tidak ada file yang dikirim maka kirim pesan bahwa gambar tidak ditemukan
     * @func json
     */
    if (!req.file) {
      return res.status(404).json({ message: "Image not found" });
    }

    /**
     * status() menetapkan status HTTP pada respons
     * @func status
     * @param {number} StatusCode - 404 Sumber daya yang diminta tidak dapat ditemukan.
     */
    /**
     * Jika ada field yang kosong/tidak diisi, maka kirim pesan untuk lengkapi semua field
     * @func json
     */
    if (
      transaksiDate === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      phoneNumber === undefined ||
      nisnMurid === undefined ||
      namaMurid === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ) {
      res.status(404).json({ message: "Lengkapi semua field" });
    }
    /**
     * Fungsi Math.floor() mengembalikan bilangan bulat terbesar yang kurang dari atau sama dengan bilangan yang diberikan.
     * @func floor
     */
    /**
     * Fungsi Math.random() mengembalikan nomor acak.
     * @func random
     */
    const invoice = Math.floor(1000000 + Math.random() * 9000000);

    /**
     * Method create untuk menambah data baru untuk koleksi Member
     * @method create
     */
    const member = await Member.create({
      firstName,
      lastName,
      phoneNumber,
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
        accountHolder: accountHolder,
      },
    };
    /**
     * Method create untuk menambah data baru untuk koleksi Transaksi
     * @method create
     */
    const transaksi = await Transaksi.create(newTransaksi);

    /**
     * status() menetapkan status HTTP pada respons
     * @func status
     * @param {number} StatusCode - 201 kode respon status sukses menunjukkan bahwa permintaan telah berhasil dan telah menyebabkan pembuatan sumber daya.

     */
    /**
     * Kirimkan pesan Success Transaksi dan data transaksi
     * @func json
     */
    res.status(201).json({ message: "Success Transaksi", transaksi });
  },
};
