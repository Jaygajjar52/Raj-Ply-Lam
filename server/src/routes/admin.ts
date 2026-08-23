import { Router } from "express";
import {
  handleAdminInquiries,
  handleAdminLogin,
  handleAdminLogout,
  handleAdminMe,
} from "../controllers/adminController.js";

export const adminRouter = Router();

adminRouter.get("/me", handleAdminMe);
adminRouter.get("/inquiries", handleAdminInquiries);
adminRouter.post("/login", handleAdminLogin);
adminRouter.post("/logout", handleAdminLogout);
