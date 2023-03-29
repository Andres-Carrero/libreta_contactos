import express from "express";
import ctrl from "../controllers/UserController";
import jwtMidleware from '../middleware/validateToken';
const router = express.Router()

router.post('/create', ctrl.create);

export default router;