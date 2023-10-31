import {ethers, formatEther, formatUnits, JsonRpcProvider, parseEther} from "ethers";
import usdtAbi from "../config/usdtAbi.js";
import usdtMainnetAbi from "../config/usdtMainnetAbi.js";

const provider = new JsonRpcProvider(`https://mainnet.infura.io/v3/3b90039d7f03491ab278b5c0c665c4fe`);

export const createWallet = async (req, res) => {
    const contract = new ethers.Contract(process.env.USDT_MAINNET_CONTRACT_ADDRESS, usdtMainnetAbi, provider);
    // console.log(contract);
    // const totalSupply = await contract.totalSupply();
    // console.log(totalSupply);
    //
    // const myAddress = `0xe4Ecd1cE3094df398d02B1c59cf068fF103c6256`;
    // // const getBalance = await contract.balances(myAddress);
    // const getBalance = await provider.getBalance(myAddress);
    // console.log("sender balance", formatEther(getBalance));



    // const contractName = await contract.name();
    // const totalSupply = await contract._totalSupply();
    // console.log(totalSupply);
    // res.send(contractName);
    // await createWallet.store(200);
    let privateKey = "0x0123456789012345678901234567890123456789012345678901234567890111"; //mainet usdt $1 available
//fa68ee97ea4d1ac1da6c4b5a597bb446
    //let wallet = new ethers.Wallet(privateKey);
//     let wallet = await ethers.Wallet.createRandom();
    // const privateKey1 = 'aa7d55fbd5e8790e276b8ff4ca6b31b11c8d8b8f3d9ddf33c6377c5401d9bec1';

    // let wallet = new ethers.Wallet(privateKey, provider);
    // console.log("random wallet", wallet);
    // const balance = await provider.getBalance(wallet.address);
    // console.log("wallet balance", balance);
    // const usdtBalance = await contract.balanceOf(wallet.address);
    // console.log("USDT Contract Balance",formatUnits(usdtBalance,6));


    // console.log("string wallet", wallet.address, wallet.publicKey);
    //
    // db.query(`insert into crypto_accounts(user_id,wallet_address,wallet_key,amount,created_at,wallet_fingerprint,wallet_mnemonic,wallet_chaincode) values(1,'${wallet.address}','${wallet.publicKey}',100,now(),'${wallet.fingerprint}','${wallet.mnemonic.phrase}','${wallet.chainCode}')`, (err, data) => {
    //     if (err) throw err;
    //     console.log(data);
    // });
    // const receiverAddress = `0xe4Ecd1cE3094df398d02B1c59cf068fF103c6256`;
    // const tx = await wallet.sendTransaction({
    //     to: receiverAddress,
    //     value: parseEther("0.001")
    // });
    // await tx.wait();
    // console.log(tx);

    res.status(200).json({name: 'hello'});
//gasless meta transaction
}