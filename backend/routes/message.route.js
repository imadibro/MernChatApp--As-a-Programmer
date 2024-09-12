import express from 'express'
import { sendMessage } from '../controllers/message.controller.js'
import protectRoute from '../middleware/protectRoute.js'
const router = express.Router()


router.post('/send/:id',protectRoute ,sendMessage)

// router.post('/login',login)

// router.post('/logout',logout)

export default router