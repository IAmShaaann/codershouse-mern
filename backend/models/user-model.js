const mongoose = require('mongoose'); //importing mongoose. 
const Schema = mongoose.Schema; //creating schema(collection blueprint)


const userSchema = new Schema( //describing the fields in the collection.
    {
        phone: { type: String, required: true },
        activated: { type: Boolean, required: false, default: false }

    },
    { 
        timestamps: true //creates timestamp for the creation of new users. 
    }
)

module.exports = mongoose.model('User', userSchema, 'users');