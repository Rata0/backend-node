import { Router } from 'express'
import userController from '../controllers/userController'
import { authMiddleware } from '../middleware/jwtAuthMiddleware'

const router = Router()

router.post('/auth/create', userController.create)
router.post('/auth/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

export default router
