import {createWallet} from "./createWallet.js";
import express from "express";
import {createHdWallet} from "./createHdWallet.js";
export const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).json({name:'hello world'});
})
router.post('/',createWallet);
router.post('/hd-wallet',createHdWallet);
