import express from "express";
import ctrl from "../controllers/GroupsContoller";
import jwtMidleware from '../middleware/validateToken';
const router = express.Router()

router.post('/create', [jwtMidleware.verifyToken], ctrl.create);
router.post('/findAll', [jwtMidleware.verifyToken], ctrl.findAll);

export default router;