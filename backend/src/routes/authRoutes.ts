import { Router } from 'express'
import { authController } from '../controllers/authController.js'

const router = Router()

router.post('/login', authController.login.bind(authController))
router.post('/patient', authController.registerPatient.bind(authController))
router.post(
    '/professional',
    authController.registerProfessional.bind(authController),
)
router.post('/admin', authController.registerAdmin.bind(authController))

export default router
