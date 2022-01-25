const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require("../dtos/user-dto");


class AuthController {
    async sendOtp(req, res) {

        const { phone } = req.body; //request destructured. 
        if (!phone) { //if phone number is not available, return error.
            res.status(400).json({ message: 'Phone field is required!' });
        } //else:

        const otp = await otpService.generateOtp(); //generate otp. 
        const ttl = 1000 * 60 * 2; // otpExpiresIn time. 
        const expires = Date.now() + ttl; //calculate when the otp will expire. 
        const data = `${phone}.${otp}.${expires}`;  //hash the otp with phonenumber and expirestime.
        const hash = hashService.hashOtp(data);

        try {
            // await otpService.sendBySms(phone, otp); //send otp using twilio. 
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            })
        }
        catch (err) { //catch errors, if occured.
            console.log(`Error while sending OTP:  ${err}`);
            res.status(500).json({ message: 'Message sending fail.', error: err });
        }
    }

    async verifyOtp(req, res) { //function to verify the otp.
        const { otp, hash, phone } = req.body; //request is destructured.
        if (!otp || !hash || !phone) { //checks for incomplete requests. 
            res.status(400).json({ message: "All fields required. " });
        }

        const [hashedOtp, expires] = hash.split('.');  //hash is splitted with otp expire time. 
        if (Date.now() > +expires) { //if otp is expired, return error.
            res.status(400).json({ message: "OTP Expired." });
        } //else:


        const data = `${phone}.${otp}.${expires}`; //otp is hashed. 

        const isValid = otpService.verifyOtp(hashedOtp, data);  //checking authenticity of otp.
        if (!isValid) { //if not, return error. 
            res.status(400).json({ message: "Invalid Otp" });
        } //else: Generate new user with access and refresh tokens. 
        let user;


        try {
            user = await userService.findUser({ phone }); //if user already exists in the Db.
            if (!user) { //create a user, if does not exist in db.
                user = await userService.createUser({ phone });
            }
        } catch (error) { //for any other errors.
            console.log(error);
            res.status(500).json({ message: 'Db error.' });
        }

        //Token

        const { accessToken, refreshToken } = tokenService.generateTokens({_id: user._id, 
        activated: false });

        //cookie

        res.cookie('refreshtoken', refreshToken,  {
            maxAge: 1000 * 60 * 60 * 24 * 30, //valid for 30 days.
            httpOnly: true,
        })

        const userDto = new UserDto(user); //for tranforming the object. 
        res.json({ accessToken, user: userDto});

    }
}

module.exports = new AuthController();