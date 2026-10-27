import { Router } from 'express'
import { patientController } from '../controllers/patientController.js'
import { validateId } from '../middlewares/validateId.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = Router()

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    patientController.getAllPatients.bind(patientController),
)
router.get(
    '/dni/:dni',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    patientController.getPatientByDni.bind(patientController),
)
router.get(
    '/user/:userId',
    authMiddleware,
    validateId('userId'),
    patientController.getPatientByUserId.bind(patientController),
)
router.get(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL', 'PATIENT']),
    validateId(),
    patientController.getPatientById.bind(patientController),
)
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PATIENT']),
    validateId(),
    patientController.updatePatientProfile.bind(patientController),
)
router.patch(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PATIENT']),
    validateId(),
    patientController.updatePatientProfile.bind(patientController),
)
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    patientController.deletePatient.bind(patientController),
)
router.delete(
    '/:id/force',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    patientController.forceDeletePatient.bind(patientController),
)

export default router
