let mongoose = require('mongoose')

let Schema = mongoose.Schema

const commentSchema = new Schema({
    hotelId: {
        type: String,
        // ref: 'Hotel',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    },
      {
        timestamps: true,
        // _id:false,
    }
    );
       
    module.exports = commentSchema;