const UserModel = require('../models/user-model'); //importing the user model.

class UserService{ 
    async findUser(filter){ //function to check is the user already exists.
        const user = await UserModel.findOne(filter);
        return user;
    }
 
    async createUser(data){ //function to create a new user. 
        const user = await UserModel.create(data);
        return user;
    }
}

module.exports = new UserService();