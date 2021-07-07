import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    
    fromAddress: {type: String, required: true},
    toAddress: {type: String, required: true},
    amount: {type: Number, required: true},
    transactionHash: {type: String, required: true},
    timestamp: {type: Date ,required: true},
})