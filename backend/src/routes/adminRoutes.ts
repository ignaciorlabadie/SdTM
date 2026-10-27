import { Router } from 'express'
import { adminController } from '../controllers/adminController.js'
import { validateId } from '../middlewares/validateId.js'

const router = Router()

router.get('/', adminController.getAllAdmins.bind(adminController))
router.get(
    '/user/:userId',
    validateId('userId'),
    adminController.getAdminByUserId.bind(adminController),
)
router.get('/:id', validateId(), adminController.getAdminById.bind(adminController))
router.put(
    '/:id',
    validateId(),
    adminController.updateAdminProfile.bind(adminController),
)
router.patch(
    '/:id',
    validateId(),
    adminController.updateAdminProfile.bind(adminController),
)
router.delete(
    '/:id',
    validateId(),
    adminController.deleteAdmin.bind(adminController),
)

export default router
