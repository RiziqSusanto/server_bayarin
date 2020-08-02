const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { uploadSingle } = require('../middlewares/multer')
const auth = require('../middlewares/auth')

router.get('/signin', adminController.viewSignIn);
router.post('/signin', adminController.actionSignIn);
router.use(auth)
router.get('/logout', adminController.actionLogOut);

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

// Endpoint Kelas
router.get('/kelas', adminController.viewKelas);
router.post('/kelas', adminController.addKelas);
router.get('/kelas/:id', adminController.showEditKelas);
router.put('/kelas/:id', adminController.editKelas);
router.delete('/kelas/:id/delete', adminController.deleteKelas);

// Endpoint Murid
router.get('/kelas/show-kelas-murid/:kelasId', adminController.viewKelasMurid);
router.post('/kelas/add/murid', adminController.addMurid);
router.put('/kelas/update/murid', adminController.editMurid);
router.delete('/kelas/:kelasId/murid/:id', adminController.deleteMurid);

router.get('/transaksi', adminController.viewTransaksi);
router.get('/transaksi/:id', adminController.showDetailTransaksi);
router.delete('/transaksi/:id', adminController.deleteTransaksi);
router.put('/transaksi/:id/confirmation', adminController.actionConfirmation);
router.put('/transaksi/:id/reject', adminController.actionReject);

// Endpoint user
router.get('/user', adminController.viewUsers);
router.post('/user', adminController.addUsers);
router.put('/user', adminController.editUsers);
router.delete('/user/:id', adminController.deleteUsers);

module.exports = router