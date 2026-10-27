import { Router } from 'express'
import { scheduleController } from '../controllers/scheduleController.js'
import { validateId } from '../middlewares/validateId.js'

const router = Router()

router.get('/', scheduleController.getAllSchedules.bind(scheduleController))
router.get(
    '/professional/:professionalId',
    validateId('professionalId'),
    scheduleController.getSchedulesByProfessionalId.bind(scheduleController),
)
router.get(
    '/:id',
    validateId(),
    scheduleController.getScheduleById.bind(scheduleController),
)
router.post('/', scheduleController.createSchedule.bind(scheduleController))
router.put(
    '/:id',
    validateId(),
    scheduleController.updateSchedule.bind(scheduleController),
)
router.patch(
    '/:id',
    validateId(),
    scheduleController.updateSchedule.bind(scheduleController),
)
router.patch(
    '/:id/toggle',
    validateId(),
    scheduleController.toggleScheduleActive.bind(scheduleController),
)
router.delete(
    '/:id',
    validateId(),
    scheduleController.deleteSchedule.bind(scheduleController),
)

export default router
