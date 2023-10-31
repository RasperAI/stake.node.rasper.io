import {createWallet} from "./createWallet.js";
import express from "express";
export const router = express.Router();

router.get('/',createWallet);