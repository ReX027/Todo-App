import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAcessToken,
  forgotpassword,
  resetpassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAcessToken);
router.route("/forgot-password").post(forgotpassword);
router.route("/reset-password/:id").post(verifyJWT, resetpassword);

export default router;
