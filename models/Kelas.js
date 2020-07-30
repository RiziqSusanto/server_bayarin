const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const kelasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  jurusanId: {
    type: ObjectId,
    ref: "Jurusan",
  },
});

module.exports = mongoose.model("Kelas", kelasSchema);
