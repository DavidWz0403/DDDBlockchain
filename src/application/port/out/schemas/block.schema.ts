import * as mongoose from 'mongoose';

export const BlockSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    hash: {type: String, required: true},
    previousHash: {type: String, required: true},
    nonce: {type: Number, required: true},
    timestamp: {type: Date ,required: true},
    transactions: [],
    merkleHash: {type: String, required: true},
    transactionsMined: {type: Boolean},
    transactionHashes: []
})