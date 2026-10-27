import Appointment from '../models/AppointmentModel.js'
import Patient from '../models/PatientModel.js'
import Professional from '../models/ProfessionalModel.js'
import Schedule from '../models/ScheduleModel.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'

export class AppointmentService {
    async getAllAppointmments() {
        const appointments = Appointment.findAll({
            include: [
                {
                    model: Patient,
                    as: 'patient',
                },
                {
                    model: Professional,
                    as: 'professional',
                },
                {
                    model: Schedule,
                    as: 'schedule',
                },
            ],
            order: [['id', 'ASC']],
        })
        return appointments
    }

    async getAppointmentById(id: number) {
        const appointment = Appointment.findByPk(id, {
            include: [
                {
                    model: Patient,
                    as: 'patient',
                },
                {
                    model: Professional,
                    as: 'professional',
                },
                {
                    model: Schedule,
                    as: 'schedule',
                },
            ],
        })
        if (!appointment) {
            return new AppError(404, MESSAGES.APPOINTMENT_NOT_FOUND)
        }
        return appointment
    }
}
