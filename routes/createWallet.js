import {ethers, JsonRpcProvider} from "ethers";



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

    db.query(`update users set deposit_address='${childNode.address}' where id=${id}`,(err,result,fields)=>{
        if (err) throw err;
        console.log(result);
    })


    res.status(200).json({name: 'hello'});
}