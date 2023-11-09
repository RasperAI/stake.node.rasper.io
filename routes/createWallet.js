import {ethers, JsonRpcProvider} from "ethers";
import walletModel from "../models/walletModel.js";



export const createWallet = async (req, res) => {

    //GET PROVIDER
    // const provider = new JsonRpcProvider(process.env.RPC_PROVIDER);

    //CREATE HD WALLET
    // const hdNode = ethers.HDNodeWallet.createRandom().connect(provider);
    // console.log("hdNode -> ",hdNode);

    //GET NODE HD WALLET
    // const hdNode = ethers.HDNodeWallet.fromPhrase(process.env.HD_WALLET_PHRASE);
    // console.log("hdNode -> ",hdNode);

    //GET XPUB OF HD WALLET
    // const xpub = hdNode.derivePath(hdNode.path).neuter().extendedKey;
    // const xpriv = hdNode.extendedKey;
    // console.log("xpub -> ",xpub);
    // console.log("xpriv -> ",xpriv);



    const { id } = req.body;
    const rootKey = ethers.HDNodeWallet.fromExtendedKey(process.env.XPUB_ADDRESS);
    const childNode = rootKey.deriveChild(id);
    console.log("addressNode 1 -> ",childNode);
    try{
        const response = await walletModel.create({user_id:id,wallet_address:childNode.address})
        if(response){
            res.status(200).json({address: childNode.address});
        }
    }catch (e){
        console.log(e);
        res.status(500).json({message: "duplicate address found"});
    }



}