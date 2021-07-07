import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
    walletName: {type: String, required: true},
    publicKey: {type: String, required: true},
    privateKey: {type: String, required: true},
    balance: {type: Number, required: true},

})