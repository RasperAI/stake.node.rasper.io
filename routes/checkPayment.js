import {ethers, JsonRpcProvider} from "ethers";
import simpleabi from "../config/simpleabi.js";

const contractAddress = `0x64457f0670413C770DC60c9439e94Dfd9c472424`;
const provider = new JsonRpcProvider(`https://goerli.infura.io/v3/3b90039d7f03491ab278b5c0c665c4fe`);

export const createWallet = async (req, res) => {
    const contract = new ethers.Contract(contractAddress, simpleabi, provider);
    const contractName = await contract.name();
    console.log(contractName);
    // res.send(contractName);
    // await createWallet.store(200);
    // let privateKey = "0x0123456789012345678901234567890123456789012345678901234567890111";

    let wallet = await ethers.Wallet.createRandom();
    console.log("random wallet", wallet);
    console.log("string wallet", wallet.address, wallet.publicKey);

    db.query(`insert into crypto_accounts(user_id,wallet_address,wallet_key,amount,created_at,wallet_fingerprint,wallet_mnemonic,wallet_chaincode) values(1,'${wallet.address}','${wallet.publicKey}',100,now(),'${wallet.fingerprint}','${wallet.mnemonic.phrase}','${wallet.chainCode}')`, (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    res.status(200).json({name: contractName});

}