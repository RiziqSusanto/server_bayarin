const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jurusanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  kelasId: [{
    type: ObjectId,
    ref: 'Kelas'
  }]
});

module.exports = mongoose.model("Jurusan", jurusanSchema);
