import express from 'express'
import { showIndex } from '../controllers/index'

const router = express.Router()

router.get('/', showIndex)

export default router
