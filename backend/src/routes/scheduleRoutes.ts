import { Router } from 'express'
import { scheduleController } from '../controllers/scheduleController.js'
import { validateId } from '../middlewares/validateId.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = Router()

router.get(
    '/',
    authMiddleware,
    scheduleController.getAllSchedules.bind(scheduleController),
)
router.get(
    '/professional/:professionalId',
    authMiddleware,
    validateId('professionalId'),
    scheduleController.getSchedulesByProfessionalId.bind(scheduleController),
)
router.get(
    '/:id',
    authMiddleware,
    validateId(),
    scheduleController.getScheduleById.bind(scheduleController),
)
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    scheduleController.createSchedule.bind(scheduleController),
)
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId(),
    scheduleController.updateSchedule.bind(scheduleController),
)
router.patch(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId(),
    scheduleController.updateSchedule.bind(scheduleController),
)
router.patch(
    '/:id/toggle',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId(),
    scheduleController.toggleScheduleActive.bind(scheduleController),
)
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId(),
    scheduleController.deleteSchedule.bind(scheduleController),
)

export default router
