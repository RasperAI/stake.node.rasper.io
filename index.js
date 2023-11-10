import express from "express";
import {router} from "./routes/routes.js";
import * as dotenv from 'dotenv';
import {ethers, formatUnits, JsonRpcProvider} from "ethers";
import abi from "./config/abi.js";
import mongoose from "mongoose";
import walletModel from "./models/walletModel.js";
import http from "http";

dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use('/', router);

const main = async () => {
    console.log("HD Wallet ->",process.env.XPUB_ADDRESS);
    const provider = new JsonRpcProvider(process.env.RPC_PROVIDER);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

    console.log("Transfer event watching");
    await contract.on('Transfer', async function (from, to, value, event) {
        // console.log(from, to, value, event.log.transactionHash);

        try {
            const wallet = await walletModel.findOne({wallet_address: to});
            if (wallet) {
                console.log("db wallet ", wallet);
                provider.waitForTransaction(event.log.transactionHash).then(async (receipt) => {
                    console.log('Transaction Mined: ' + receipt.hash);
                    console.log(receipt);
                    try {
                        const response = await fetch(process.env.MLM_URL, {
                            method: 'POST',
                            body: JSON.stringify({
                                user_id: wallet.user_id,
                                transaction_hash: event.log.transactionHash,
                                amount: formatUnits(value)
                            })
                        })
                        const data = await response.json();
                        if (data) {
                            console.log("mlm response ->", data.message);
                        }
                    }catch (e){
                        console.log(e);
                    }
                });
            }
        }catch (e){
            console.log(e);
        }
    })

}
main();
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT);