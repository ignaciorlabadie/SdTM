import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import {
    validateLogin,
    validatePatientAccount,
    validateProfessionalAccount,
    validateAdminAccount,
} from '../middlewares/validateBody.js'

const router = Router()

router.post('/login', validateLogin, authController.login.bind(authController))
router.post(
    '/patient',
    validatePatientAccount,
    authController.registerPatient.bind(authController),
)
router.post(
    '/professional',
    validateProfessionalAccount,
    authController.registerProfessional.bind(authController),
)
router.post(
    '/admin',
    validateAdminAccount,
    authController.registerAdmin.bind(authController),
)

export default router
