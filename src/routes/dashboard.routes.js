import { Router } from 'express';
const router = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js"
router.use(verifyJWT);



// router.route("/stats").get(getChannelStats);
// router.route("/videos").get(getChannelVideos);