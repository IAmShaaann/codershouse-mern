const jwt = require('jsonwebtoken');  //generating tokens using jwt library.
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET; //secret key for access token.
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET; //secret key for refresh token.
const refreshModel = require('../models/refresh-model')

class TokenService {
    generateTokens(payload) { //generating token. 
        const accessToken = jwt.sign(payload, accessTokenSecret, { 
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y'
        });
        return { accessToken, refreshToken };

    }

    async storeRefreshToken(token, userId){
        try{
            await refreshModel.create({
                token,
                userId
            })
        }catch(err){ 
            console.log(err.message);

        }

    }

    async verifyAccessToken(token){
        return jwt.verify(token, accessTokenSecret);
    }
}
module.exports = new TokenService();
//tokens: Tokens, certifys user identity. basically a key, if the user is authenticated. the server provides you with a key that lets you access the services. 
//JWT: It is basically a standard that allows you to transmit information peer-to-peer.and the information can be trusted and verified because it is digitally signed. 
// Payload : The data using which the token will be generated. 
// signing tokens: veryfing the authenticity of the user identity.