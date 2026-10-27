import { Router } from 'express'
import { professionalController } from '../controllers/professionalController.js'
import { validateId } from '../middlewares/validateId.js'

const router = Router()

router.get(
    '/',
    professionalController.getAllProfessionals.bind(professionalController),
)
router.get(
    '/matricula/:matricula',
    professionalController.getProfessionalByMatricula.bind(professionalController),
)
router.get(
    '/user/:userId',
    validateId('userId'),
    professionalController.getProfessionalByUserId.bind(professionalController),
)
router.get(
    '/:id',
    validateId(),
    professionalController.getProfessionalById.bind(professionalController),
)
router.put(
    '/:id',
    validateId(),
    professionalController.updateProfessionalProfile.bind(professionalController),
)
router.patch(
    '/:id',
    validateId(),
    professionalController.updateProfessionalProfile.bind(professionalController),
)
router.delete(
    '/:id',
    validateId(),
    professionalController.deleteProfessional.bind(professionalController),
)

export default router
