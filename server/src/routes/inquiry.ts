import { Router } from "express";
import { handleCreateInquiry } from "../controllers/inquiryController.js";

export const inquiryRouter = Router();

inquiryRouter.post("/", handleCreateInquiry);