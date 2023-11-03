import express from "express";
import {router} from "./routes/routes.js";
import con from './config/db.js';
import * as dotenv from 'dotenv';
import {ethers, formatUnits, JsonRpcProvider} from "ethers";
import abi from "./config/abi.js";

dotenv.config();

const app = express();
const port = 3000;

global.db = con;

app.use(express.json());
app.use('/', router);


const main = async () => {

    const provider = new JsonRpcProvider(process.env.RPC_PROVIDER);
    const contract = new ethers.Contract(process.env.USDT_MAINNET_CONTRACT_ADDRESS, abi, provider);

    await contract.on('Transfer', function (from, to, value, event) {
        console.log(from, to, value, event.log.transactionHash);

        db.query(`select id from users where deposit_address='${to}'`, (err, result, fields) => {

            if (err) throw err;
            if (result.length > 0) {
                console.log("Transaction matched of id -> ", result[0].id);
                console.log(result);
                provider.waitForTransaction(event.log.transactionHash).then((receipt) => {
                    console.log('Transaction Mined: ' + receipt.hash);
                    console.log(receipt);


                    db.query(`insert into deposits (user_id,transaction_hash,amount,created_at) values(${result[0].id},'${event.log.transactionHash}',${formatUnits(value)},now())`);

                    db.query(`insert into wallets (user_id,wallet_type,income_type,description,credit,created_at)VALUES (${result[0].id},1,'deposit','Automatic deposit successful',${formatUnits(value)},now())`, (err, data) => {
                        if (err) throw err;
                        console.log(data);
                    });
                });
            }

        });
    })

}
main();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

