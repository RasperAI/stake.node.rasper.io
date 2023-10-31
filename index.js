import express from "express";
import {router} from "./routes/routes.js";
import con from './config/db.js';
import * as dotenv from 'dotenv';
import {ethers, formatUnits, JsonRpcProvider} from "ethers";
import usdtAbi from "./config/usdtAbi.js";
import usdtMainnetAbi from "./config/usdtMainnetAbi.js";
// const { Relayer } = require('defender-relay-client');
import {RelayClient, Relayer} from 'defender-relay-client';
import * as Process from "process";

dotenv.config();

const app = express();
const port = 3000;

global.db = con;

console.log(process.env.USDT_CONTRACT_ADDRESS);
app.use('/', router);


const main = async () => {
    // const provider = new JsonRpcProvider(`https://mainnet.infura.io/v3/3b90039d7f03491ab278b5c0c665c4fe`);
    // console.log(provider);
    // const contract = new ethers.Contract(process.env.USDT_MAINNET_CONTRACT_ADDRESS, usdtMainnetAbi, provider);
    // console.log(contract);
    // const totalSupply = await contract.totalSupply();
    // console.log(totalSupply);

//     const transferEvent = await contract.on('Transfer', function (from, to, value, event) {
//         console.log(from, to, value, event.log.transactionHash);
//         // const isTransactionMined = async () => {
//         //    await provider.waitForTransaction(event.log.transactionHash).then((receipt) => {
//         //         console.log('Transaction Mined: ' + receipt.hash);
//         //         console.log(receipt);
//         //     });
//         // }
//         // isTransactionMined();
//         // const receiverWallet = '0x20c3223c00306884df9993567f67bd627343271F';
//         db.query(`select * from crypto_accounts where wallet_address='${to}'`, (err, result, fields) => {
//
//             if (err) throw err;
//             if (result.length > 0) {
//                 console.log("Transaction Matched", result[0].wallet_address);
//                 console.log(result);
//                 provider.waitForTransaction(event.log.transactionHash).then((receipt) => {
//                     console.log('Transaction Mined: ' + receipt.hash);
//                     console.log(receipt);
//
// ///callback
//                     db.query(`insert into transaction (user_id,wallet_type,income_type,description,credit)VALUES (1,1,'crypto','Automatic transaction approve',${formatUnits(value,6)})`, (err, data) => {
//                         if (err) throw err;
//                         console.log(data);
//                     });
//                 });
//             }
//
//         });
//     })

    // const receiverWallet = '0x20c3223c00306884df9993567f67bd627343271F';
    // db.query(`select * from crypto_accounts where wallet_address='${receiverWallet}'`, (err, result, fields) => {
    //
    //     if (err) throw err;
    //     console.log(result);
    //     if(result.length > 0){
    //         console.log("Transaction Matched", result[0].wallet_address);
    //     }
    //
    // });
    // await provider.on('block',(block)=>{
    //     console.log(block);
    // })
    // const txHash = `0xca67e6b5bb0dbb015e585228bfb337d6fecb716d91d584cdc8c26a8a2d20e177`;
    // await provider.waitForTransaction(txHash).then((receipt) => {
    //     console.log('Transaction Mined: ' + receipt.hash);
    //     console.log(receipt);
    // });


    // const txHash = `0xbf94ef0adbe2c6f1157c2b977345c51f440123fc5db2b880e52ea0d09eafc41c`;
    // // const transaction = await provider.getTransaction(txHash);
    // const transaction = await provider.getTransactionReceipt(txHash);
    // console.log(transaction);

    // await provider.on("pending", (txHash) => {
    //     if (txHash) {
    //         console.log(`[${(new Date).toLocaleTimeString()}] Scanning transactions: ${txHash} \r`);
    //     }
    // });

}
// const main_old = async () => {
//
//
//     const credentials = {apiKey: process.env.RELAY_API_KEY, apiSecret: process.env.RELAY_API_SECRET}
//     const relayClient = new RelayClient(credentials);
//     const listClients =  await relayClient.list();
//     console.log(listClients);
//     const relayer = new Relayer(credentials);
//     console.log(relayer);
//     //https://api.defender.openzeppelin.com/autotasks/2659992b-5ee8-4c23-ba78-174b7125f312/runs/webhook/39f5358b-2898-4ab0-a61b-ac81df499e27/KpyozXzQh1QrEv18qYD7hc
//     //
//     const txRes = await relayer.sendTransaction({
//         to: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//         value: 0.0001,
//         speed: 'fast',
//         gasLimit: '21000',
//     });
//     //
//     console.log(txRes);
//     return txRes.hash;
//
//
//
// }
main();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

