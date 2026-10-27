import { Router } from 'express'
import { adminController } from '../controllers/adminController.js'
import { validateId } from '../middlewares/validateId.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = Router()

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    adminController.getAllAdmins.bind(adminController),
)
router.get(
    '/user/:userId',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId('userId'),
    adminController.getAdminByUserId.bind(adminController),
)
router.get(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    adminController.getAdminById.bind(adminController),
)
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    adminController.updateAdminProfile.bind(adminController),
)
router.patch(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    adminController.updateAdminProfile.bind(adminController),
)
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    adminController.deleteAdmin.bind(adminController),
)
router.delete(
    '/:id/force',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    adminController.forceDeleteAdmin.bind(adminController),
)

export default router
