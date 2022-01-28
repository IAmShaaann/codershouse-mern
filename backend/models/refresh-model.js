// import { User } from './user-model';
const mongoose = require('mongoose'); //importing mongoose. 
const Schema = mongoose.Schema; //creating schema(collection blueprint)


const refreshSchema = new Schema( //describing the fields in the collection.
    {
        token: {type: String, required: true}, 
        userId: { type: Schema.Types.ObjectId, ref: 'User' },


    },
    { 
        timestamps: true //creates timestamp for the creation of new users. 
    }
)

module.exports = mongoose.model('Refresh', refreshSchema, 'tokens');