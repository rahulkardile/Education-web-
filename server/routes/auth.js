import express from 'express'
import { register, allUser, login } from '../controllers/auth.js'

const router = express.Router();

router.post("/register", register);

router.get("/allUser", allUser);

router.post("/login", login)

export default router

