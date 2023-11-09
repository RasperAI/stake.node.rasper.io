import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    user_id: {type: String, required: true, trim: true, unique: true},
    wallet_address: {type: String, required: true, trim: true, unique: true},
});

const WalletModel = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);

export default WalletModel;
