import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { validateId } from '../middlewares/validateId.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = Router()

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    userController.getAllUsers.bind(userController),
)
router.get(
    '/email/:email',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    userController.getUserByEmail.bind(userController),
)
router.get(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    userController.getUserById.bind(userController),
)
router.put(
    '/:id',
    authMiddleware,
    validateId(),
    userController.updateUser.bind(userController),
)
router.patch(
    '/:id',
    authMiddleware,
    validateId(),
    userController.updateUser.bind(userController),
)
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    userController.deleteUser.bind(userController),
)
router.delete(
    '/:id/force',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    userController.forceDeleteUser.bind(userController),
)

export default router
