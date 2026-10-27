import { Router } from 'express'
import { professionalController } from '../controllers/professionalController.js'
import { validateId } from '../middlewares/validateId.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = Router()

router.get(
    '/',
    authMiddleware,
    professionalController.getAllProfessionals.bind(professionalController),
)
router.get(
    '/matricula/:matricula',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    professionalController.getProfessionalByMatricula.bind(professionalController),
)
router.get(
    '/user/:userId',
    authMiddleware,
    validateId('userId'),
    professionalController.getProfessionalByUserId.bind(professionalController),
)
router.get(
    '/:id',
    authMiddleware,
    professionalController.getProfessionalById.bind(professionalController),
)
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId(),
    professionalController.updateProfessionalProfile.bind(professionalController),
)
router.patch(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId(),
    professionalController.updateProfessionalProfile.bind(professionalController),
)
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    professionalController.deleteProfessional.bind(professionalController),
)
router.delete(
    '/:id/force',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    professionalController.forceDeleteProfessional.bind(professionalController),
)

export default router
