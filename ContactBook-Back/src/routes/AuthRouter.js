import express from "express";
import ctrl from "../controllers/AuthController";
import jwtMidleware from '../middleware/validateToken';
const router = express.Router()

router.post('/login', ctrl.login);
router.get('/findData/:user_id', [jwtMidleware.verifyToken], ctrl.findData);
router.post('/logout', [jwtMidleware.verifyToken], ctrl.logout);

export default router;