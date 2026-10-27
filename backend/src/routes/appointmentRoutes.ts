import { Router } from 'express'
import { appointmentController } from '../controllers/appointmentController.js'
import { validateId } from '../middlewares/validateId.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = Router()

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    appointmentController.getAllAppointments.bind(appointmentController),
)
router.get(
    '/patient/:patientId',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL', 'PATIENT']),
    validateId('patientId'),
    appointmentController.getAppointmentsByPatientId.bind(appointmentController),
)
router.get(
    '/professional/:professionalId',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId('professionalId'),
    appointmentController.getAppointmentsByProfessionalId.bind(
        appointmentController,
    ),
)
router.get(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL', 'PATIENT']),
    validateId(),
    appointmentController.getAppointmentById.bind(appointmentController),
)
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PATIENT']),
    appointmentController.createAppointment.bind(appointmentController),
)
router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId(),
    appointmentController.updateAppointment.bind(appointmentController),
)
router.patch(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PROFESSIONAL']),
    validateId(),
    appointmentController.updateAppointment.bind(appointmentController),
)
router.patch(
    '/:id/cancel',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PATIENT']),
    validateId(),
    appointmentController.cancelAppointment.bind(appointmentController),
)
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['ADMIN', 'PATIENT']),
    validateId(),
    appointmentController.deleteAppointment.bind(appointmentController),
)
router.delete(
    '/:id/force',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    validateId(),
    appointmentController.forceDeleteAppointment.bind(appointmentController),
)

export default router
