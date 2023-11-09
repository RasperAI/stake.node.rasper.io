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
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());


const main = async () => {

    const provider = new JsonRpcProvider(process.env.RPC_PROVIDER);
    const contract = new ethers.Contract(process.env.USDT_MAINNET_CONTRACT_ADDRESS, abi, provider);

    await contract.on('Transfer', async function (from, to, value, event) {
        console.log(from, to, value, event.log.transactionHash);

        const wallet = await walletModel.findOne({wallet_address: to});
        if (wallet) {
            console.log("db wallet ", wallet);
            provider.waitForTransaction(event.log.transactionHash).then(async (receipt) => {
                console.log('Transaction Mined: ' + receipt.hash);
                console.log(receipt);

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

            });
        }

    })

}
main();
if (process.env.NODE_ENV == 'production') {
    // http.createServer(function (request, response) {
    //     response.writeHead(200, {"Content-Type": "text/plain"});
    //     response.end("Hello World\n");
    // }).listen(process.env.PORT);
    const httpServer = http.createServer();
    httpServer.on("request",app);
    httpServer.listen(process.env.PORT);

} else {
    app.use('/', router);
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
}