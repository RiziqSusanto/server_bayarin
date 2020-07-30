const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const siswaSchema = new mongoose.Schema({
  nisn: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  jenisKelamin: {
    type: String,
    enum: ["Laki-Laki", "Perempuan"],
    required: true,
  },
  noTelepon: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  kelasId: {
    type: ObjectId,
    ref: "Kelas",
  },
  jurusanId: {
    type: ObjectId,
    ref: "Jurusan",
  },
});

module.exports = mongoose.model("Siswa", siswaSchema);
