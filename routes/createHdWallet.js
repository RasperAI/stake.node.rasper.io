import {ethers, JsonRpcProvider} from "ethers";
import walletModel from "../models/walletModel.js";



export const createHdWallet = async (req, res) => {

    //GET PROVIDER
    const provider = new JsonRpcProvider(process.env.RPC_PROVIDER);

    //CREATE HD WALLET
    const hdNode = ethers.HDNodeWallet.createRandom().connect(provider);
    console.log("hdNode -> ",hdNode);

    //GET NODE HD WALLET
    // const hdNode = ethers.HDNodeWallet.fromPhrase(process.env.HD_WALLET_PHRASE);
    // console.log("hdNode -> ",hdNode);

    //GET XPUB OF HD WALLET
    const xpub = hdNode.derivePath(hdNode.path).neuter().extendedKey;
    const xpriv = hdNode.extendedKey;
    console.log("xpub -> ",xpub);
    console.log("xpriv -> ",xpriv);
    res.status(200).json({message: "hd wallet created"});
}