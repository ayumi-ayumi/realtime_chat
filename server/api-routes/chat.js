import express from "express";
import { getAllMessages, saveMessage } from "../controller/chat.js";

const router = express.Router();

router.get("/:room", getAllMessages);

router.post("/", saveMessage);

export default router;
