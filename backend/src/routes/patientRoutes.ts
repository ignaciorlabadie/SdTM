import { Router } from 'express'
import { patientController } from '../controllers/patientController.js'
import { validateId } from '../middlewares/validateId.js'

const router = Router()

router.get('/', patientController.getAllPatients.bind(patientController))
router.get('/dni/:dni', patientController.getPatientByDni.bind(patientController))
router.get(
    '/user/:userId',
    validateId('userId'),
    patientController.getPatientByUserId.bind(patientController),
)
router.get(
    '/:id',
    validateId(),
    patientController.getPatientById.bind(patientController),
)
router.put(
    '/:id',
    validateId(),
    patientController.updatePatientProfile.bind(patientController),
)
router.patch(
    '/:id',
    validateId(),
    patientController.updatePatientProfile.bind(patientController),
)
router.delete(
    '/:id',
    validateId(),
    patientController.deletePatient.bind(patientController),
)

export default router
