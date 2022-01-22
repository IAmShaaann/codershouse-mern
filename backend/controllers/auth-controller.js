const otpService = require('../services/otp-service'); 
const hashService = require('../services/hash-service');


class AuthController{
    sendOtp(req, res) {
        phone  = req.body.phone; 
        username = req.body.username; 
        if (!phone) {
            res.status(400).json({ message: 'Phone field is required!' });
        }

        const otp = otpService.generateOtp();
        const ttl = 1000 * 60 * 2; // 2 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        try {
            otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                number,
                otp,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }

    verifyOtp(req, res){    
        const { otp,hash, phone } = req.body;
        console.log(otp, hash, phone);
        if(!otp || !hash || !phone){
            res.status(400).json({message: "All fields required."});
        }
        const [hashedOtp, expires] = hash.split('.');
        if(Date.now() > expires){
            res.status(400).json({message: "Otp Expired"});
        }

        const data = `${phone}.${otp}.${expires}`;

        const isValid = otpService.verifyOtp(hashedOtp, data);

        if(!isValid){
            res.status(400).json({message: "Invalid Otp."});
        }

        let user;
        let accessToken;
        let refreshToken;

        
    }
}

module.exports = new AuthController();