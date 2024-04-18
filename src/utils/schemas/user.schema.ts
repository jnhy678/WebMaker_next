// import mongoose from 'mongoose'

// const UserSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: [true, 'Please provide a name for this pet.'],
//     maxlength: [20, 'Name cannot be more than 60 characters'],
//   },
//   username: {
//     type: String,
//     required: [true, 'Please provide a name for this pet.'],
//     maxlength: [20, 'Name cannot be more than 60 characters'],
//   },
//   password: {
//     type: String,
//     // required: [true, "Please provide the pet owner's name"],
//     maxlength: [20, "Owner's Name cannot be more than 60 characters"],
//   },
//   address: {
//     type: String,
//     maxlength: [50, 'Species specified cannot be more than 40 characters'],
//   },
//   age: {
//     type: Number,
//   },
//   // image_url: {
//   //   type: String,
//   // },
// })

// const User = mongoose.models.User || mongoose.model('User', UserSchema)
// export default User

import mysql from 'mysql2'
import mongoose from 'mongoose';
import {getDB} from '../connectDB'
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_LOCAL_URI!);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel()
};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        id: {
          type: String,
          required: [true, 'Please provide a name for this pet.'],
          maxlength: [20, 'Name cannot be more than 60 characters'],
        },
        username: {
          type: String,
          required: [true, 'Please provide a name for this pet.'],
          maxlength: [20, 'Name cannot be more than 60 characters'],
        },
        password: {
          type: String,
          // required: [true, "Please provide the pet owner's name"],
          maxlength: [20, "Owner's Name cannot be more than 60 characters"],
        },
        address: {
          type: String,
          maxlength: [50, 'Species specified cannot be more than 40 characters'],
        },
        age: {
          type: Number,
        },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}