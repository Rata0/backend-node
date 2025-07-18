import { Router } from 'express'
import userController from '../controllers/userController'

const router = Router()

router.post('/auth/create', userController.create)
router.post('/auth/login', userController.login)

export default router
