const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle } = require('../middlewares/multer')

router.get('/dashboard', adminController.viewDashboard);

// Endpoint Bank
router.get('/bank', adminController.viewBank);
router.post('/bank', uploadSingle, adminController.addBank);
router.put('/bank', uploadSingle, adminController.editBank);
router.delete('/bank/:id', adminController.deleteBank);

// Endpoint Jurusan
router.get('/jurusan', adminController.viewJurusan);
router.post('/jurusan', adminController.addJurusan);
router.put('/jurusan', adminController.editJurusan);
router.delete('/jurusan/:id', adminController.deleteJurusan);

router.get('/kelas', adminController.viewKelas);
router.post('/kelas', adminController.addKelas);
router.get('/kelas/:id', adminController.showEditKelas);
router.put('/kelas/:id', adminController.editKelas);
router.delete('/kelas/:id/delete', adminController.deleteKelas);

router.get('/transaksi', adminController.viewTransaksi);

module.exports = router