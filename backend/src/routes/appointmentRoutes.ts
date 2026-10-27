import { Router } from 'express'
import { appointmentController } from '../controllers/appointmentController.js'
import { validateId } from '../middlewares/validateId.js'

const router = Router()

router.get(
    '/',
    appointmentController.getAllAppointments.bind(appointmentController),
)
router.get(
    '/patient/:patientId',
    validateId('patientId'),
    appointmentController.getAppointmentsByPatientId.bind(appointmentController),
)
router.get(
    '/professional/:professionalId',
    validateId('professionalId'),
    appointmentController.getAppointmentsByProfessionalId.bind(
        appointmentController,
    ),
)
router.get(
    '/:id',
    validateId(),
    appointmentController.getAppointmentById.bind(appointmentController),
)
router.post('/', appointmentController.createAppointment.bind(appointmentController))
router.put(
    '/:id',
    validateId(),
    appointmentController.updateAppointment.bind(appointmentController),
)
router.patch(
    '/:id',
    validateId(),
    appointmentController.updateAppointment.bind(appointmentController),
)
router.patch(
    '/:id/cancel',
    validateId(),
    appointmentController.cancelAppointment.bind(appointmentController),
)
router.delete(
    '/:id',
    validateId(),
    appointmentController.deleteAppointment.bind(appointmentController),
)

export default router
