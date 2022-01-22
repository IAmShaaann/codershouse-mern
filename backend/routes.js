const router = require('express').Router(); //importing router from express. 
const authController = require('./controllers/auth-controller')

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);

module.exports = router;