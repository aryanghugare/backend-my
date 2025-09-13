import { Router } from 'express';

import { verifyJWT } from "../middlewares/auth.middleware.js"
import { toggleSubscription, getUserChannelSubscribers } from '../controllers/subscription.controller.js';

const router = Router()

router.use(verifyJWT) // Applying verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .post(toggleSubscription);

router.route("/u/:subscriberId").get(getUserChannelSubscribers);

export default router
