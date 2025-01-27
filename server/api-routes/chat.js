import express from "express";
import { getAllMessages, saveMessage } from "../controller/chat.js";

const router = express.Router();

// /api/books
// router.get("/", getAllMessages);

router.get("/:room", getAllMessages);

router.post(
  "/",
  // body("title").notEmpty().withMessage("ERROR"),
  // body("description").notEmpty().withMessage("ERROR"),
  // body("comment").notEmpty().withMessage("ERROR"),
  // body("rating").notEmpty().isInt({ min: 1, max: 5 }).withMessage("ERROR"),
  saveMessage
);

export default router;
