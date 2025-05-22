import express from "express";
import { postSummary } from "../controllers/summarize.controller.js";

const router = express.Router();

router.post("/", postSummary);

export default router;
