import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersState = new Schema({
    store: {
        name: {
            user: String,
            favorites: String,
        }
    },
    favorites: {
        type: String,
        required: false
    },
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    colorSchema: {
        type: String,
        required: false
    }
})

const Users = mongoose.model('User', usersState)

module.exports = Users