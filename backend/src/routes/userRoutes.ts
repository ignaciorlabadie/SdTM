import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { validateId } from '../middlewares/validateId.js'

const router = Router()

router.get('/', userController.getAllUsers.bind(userController))
router.get('/email/:email', userController.getUserByEmail.bind(userController))
router.get('/:id', validateId(), userController.getUserById.bind(userController))
router.put('/:id', validateId(), userController.updateUser.bind(userController))
router.patch(
    '/:id',
    validateId(),
    userController.updateUser.bind(userController),
)
router.delete(
    '/:id',
    validateId(),
    userController.deleteUser.bind(userController),
)

export default router
