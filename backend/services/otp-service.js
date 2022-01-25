const crypto = require('crypto');
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true
})

const hashService = require('../services/hash-service')


class OtpService {
    async generateOtp() { //function to generate Otp. 
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }
    async sendBySms(phone, otp) {
        
        const result =  await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your codershouse OTP is ${otp}`,
        });
        console.log("otp send");
        return result;
        
    }

    verifyOtp(hashedOtp, data) { //Verify the entered Otp.

        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();
