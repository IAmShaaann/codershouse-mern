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

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false
        });

        //cookie

        await tokenService.storeRefreshToken(refreshToken, user._id); //store thr refresh token inside the database. 

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, //valid for 30 days.
            httpOnly: true,
        })

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, //valid for 30 days.
            httpOnly: true,
        })

        const userDto = new UserDto(user); //for tranforming the object. 
        res.json({ user: userDto, auth: true });

    }

    async refresh(req, res) {
        // get refresh token from cookie
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        // check if token is valid
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(
                refreshTokenFromCookie
            );
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        // Check if token is in db
        try {
            const token = await tokenService.findRefreshToken(
                userData._id,
                refreshTokenFromCookie
            );
            if (!token) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // check if valid user
        const user = await userService.findUser({ _id: userData._id });
        if (!user) {
            return res.status(404).json({ message: 'No user' });
        }
        // Generate new tokens
        const { refreshToken, accessToken } = tokenService.generateTokens({
            _id: userData._id,
        });

        // Update refresh token
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            return res.status(500).json({ message: 'Internal error' });
        }
        // put in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        // response
        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

    async logout(req, res){ 
        const { refreshToken } = req.cookies;
        // Remove the refresh Token from DB.
        await tokenService.removeToken(refreshToken);
        // remove cookies.
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({user: null, auth : false});

    }
}

module.exports = new AuthController();

/*
    Steps in refresh function:
    1. get the existing refresh token from the cookie. 
    2. check if the token is valid or not. 
    3. check if the token is in the DB. 
    4. Generate new tokens. 
    5. put the new tokens in cookie. 
    6. send the response.
*/