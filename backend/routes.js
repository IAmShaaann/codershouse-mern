const router = require('express').Router(); //importing router from express. 
const authController = require('./controllers/auth-controller')
const activateController = require('./controllers/activate-controller');
const authMiddleware = require('./middlewares/auth-middleware');

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp);
router.post('/api/activate', authMiddleware, activateController.activate);
router.get('/api/refresh', authController.refresh);
router.post('/api/logout', authMiddleware, authController.logout);

module.exports = router;

// the authMiddleware will ensure that all the actions that are being performed should be performed by an authenticated user.