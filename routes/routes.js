import {createWallet} from "./createWallet.js";
import express from "express";
export const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).json({name:'hello world'});
})
router.post('/',createWallet);
