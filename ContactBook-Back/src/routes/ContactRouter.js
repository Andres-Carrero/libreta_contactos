import express from "express";
import ctrl from "../controllers/ContactController";
import jwtMidleware from '../middleware/validateToken';

const router = express.Router()

router.post('/create', [jwtMidleware.verifyToken], ctrl.create);
router.get('/findAll/:user_id', [jwtMidleware.verifyToken], ctrl.findAll);
router.get('/findOne/:uuid', [jwtMidleware.verifyToken], ctrl.findOne);
router.put('/update/:uuid', [jwtMidleware.verifyToken], ctrl.update);
router.delete('/delete/:uuid', [jwtMidleware.verifyToken], ctrl.deletes);

export default router;