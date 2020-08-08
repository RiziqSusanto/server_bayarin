const router = require('express').Router();
const apiController = require('../controllers/apiController');
const { uploadSingle } = require('../middlewares/multer')

router.post('/home', uploadSingle, apiController.home);
router.get('/bank', apiController.bank);

module.exports = router