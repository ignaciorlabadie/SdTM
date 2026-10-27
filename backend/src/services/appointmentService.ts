import Appointment from '../models/AppointmentModel.js'
import Patient from '../models/PatientModel.js'
import Professional from '../models/ProfessionalModel.js'
import Schedule from '../models/ScheduleModel.js'
import type { CreateAppointment } from '../types/appointment/CreateAppointment.js'
import type { UpdateAppointment } from '../types/appointment/UpdateAppointment.js'
import type { WeekDay } from '../types/schedule/WeekDayType.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'

const WEEKDAY_TO_JS: Record<WeekDay, number> = {
    DOMINGO: 0,
    LUNES: 1,
    MARTES: 2,
    MIERCOLES: 3,
    JUEVES: 4,
    VIERNES: 5,
    SABADO: 6,
}

function getWeekDayFromDate(dateString: string): WeekDay {
    const date = new Date(`${dateString}T00:00:00`)
    const jsDay = date.getDay()
    const entry = Object.entries(WEEKDAY_TO_JS).find(([, value]) => value === jsDay)
    if (!entry) {
        throw new Error('Invalid date')
    }
    return entry[0] as WeekDay
}

function isTimeBetween(time: string, startTime: string, endTime: string): boolean {
    return time >= startTime && time <= endTime
}

function getAppointmentDateTime(appointment: Appointment): Date {
    const date = appointment.get('date') as string
    const time = appointment.get('time') as string
    return new Date(`${date}T${time}`)
}

export class AppointmentService {
    async getAllAppointmments() {
        const appointments = await Appointment.findAll({
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

    async getAppointmentsByPatientId(patientId: number) {
        const appointments = await Appointment.findAll({
            where: { patientId },
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
            order: [['date', 'ASC'], ['time', 'ASC']],
        })
        return appointments
    }

    async getAppointmentsByProfessionalId(professionalId: number) {
        const appointments = await Appointment.findAll({
            where: { professionalId },
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
            order: [['date', 'ASC'], ['time', 'ASC']],
        })
        return appointments
    }

    async getAppointmentById(id: number) {
        const appointment = await Appointment.findByPk(id, {
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
            throw new AppError(404, MESSAGES.APPOINTMENT_NOT_FOUND)
        }
        return appointment
    }

    async createAppointment(data: CreateAppointment) {
        const professional = await Professional.findByPk(data.professionalId)
        if (!professional) {
            throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
        }
        const patient = await Patient.findByPk(data.patientId)
        if (!patient) {
            throw new AppError(404, MESSAGES.PACIENTE_NO_ENCONTRADO)
        }
        const schedule = await Schedule.findByPk(data.scheduleId)
        if (!schedule) {
            throw new AppError(404, MESSAGES.SCHEDULE_NOT_FOUND)
        }

        if (schedule.get('professionalId') !== data.professionalId) {
            throw new AppError(400, MESSAGES.APPOINTMENT_SCHEDULE_MISMATCH)
        }

        if (schedule.get('active') === false) {
            throw new AppError(400, MESSAGES.APPOINTMENT_SCHEDULE_INACTIVE)
        }

        const scheduleWeekDay = schedule.get('weekDay') as WeekDay
        const appointmentWeekDay = getWeekDayFromDate(data.date)
        if (scheduleWeekDay !== appointmentWeekDay) {
            throw new AppError(400, MESSAGES.APPOINTMENT_INVALID_DAY)
        }

        const startTime = schedule.get('startTime') as string
        const endTime = schedule.get('endTime') as string
        if (!isTimeBetween(data.time, startTime, endTime)) {
            throw new AppError(400, MESSAGES.APPOINTMENT_TIME_OUTSIDE_SCHEDULE)
        }

        const existingAppointment = await Appointment.findOne({
            where: {
                scheduleId: data.scheduleId,
                date: data.date,
                time: data.time,
            },
        })
        if (existingAppointment) {
            throw new AppError(409, MESSAGES.APPOINTMENT_ALREADY_EXISTS)
        }

        const appointment = await Appointment.create(data)
        return await this.getAppointmentById(appointment.id)
    }

    async updateAppointment(id: number, data: Partial<UpdateAppointment>) {
        const appointment = await Appointment.findByPk(id)
        if (!appointment) {
            throw new AppError(404, MESSAGES.APPOINTMENT_NOT_FOUND)
        }

        if (appointment.get('status') === 'COMPLETADO') {
            throw new AppError(400, MESSAGES.APPOINTMENT_CANNOT_MODIFY_COMPLETED)
        }
        if (appointment.get('status') === 'CANCELADO') {
            throw new AppError(400, MESSAGES.APPOINTMENT_CANNOT_MODIFY_CANCELLED)
        }

        if (data.patientId) {
            const patient = await Patient.findByPk(data.patientId)
            if (!patient) {
                throw new AppError(404, MESSAGES.PACIENTE_NO_ENCONTRADO)
            }
        }

        if (data.professionalId) {
            const professional = await Professional.findByPk(data.professionalId)
            if (!professional) {
                throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
            }
        }

        const finalProfessionalId = data.professionalId ?? appointment.get('professionalId')
        const finalScheduleId = data.scheduleId ?? appointment.get('scheduleId')

        let schedule: Schedule | null = null
        if (data.scheduleId || data.professionalId) {
            schedule = await Schedule.findByPk(finalScheduleId)
            if (!schedule) {
                throw new AppError(404, MESSAGES.SCHEDULE_NOT_FOUND)
            }
            if (schedule.get('professionalId') !== finalProfessionalId) {
                throw new AppError(400, MESSAGES.APPOINTMENT_SCHEDULE_MISMATCH)
            }
            if (schedule.get('active') === false) {
                throw new AppError(400, MESSAGES.APPOINTMENT_SCHEDULE_INACTIVE)
            }
        } else if (data.date || data.time) {
            schedule = await Schedule.findByPk(finalScheduleId)
            if (!schedule) {
                throw new AppError(404, MESSAGES.SCHEDULE_NOT_FOUND)
            }
        }

        if ((data.date || data.time || data.scheduleId) && schedule) {
            const finalDate = data.date ?? appointment.get('date')
            const finalTime = data.time ?? appointment.get('time')

            const scheduleWeekDay = schedule.get('weekDay') as WeekDay
            const appointmentWeekDay = getWeekDayFromDate(finalDate)
            if (scheduleWeekDay !== appointmentWeekDay) {
                throw new AppError(400, MESSAGES.APPOINTMENT_INVALID_DAY)
            }

            const startTime = schedule.get('startTime') as string
            const endTime = schedule.get('endTime') as string
            if (!isTimeBetween(finalTime, startTime, endTime)) {
                throw new AppError(400, MESSAGES.APPOINTMENT_TIME_OUTSIDE_SCHEDULE)
            }

            const existingAppointment = await Appointment.findOne({
                where: {
                    scheduleId: finalScheduleId,
                    date: finalDate,
                    time: finalTime,
                },
            })
            if (existingAppointment && existingAppointment.id !== id) {
                throw new AppError(409, MESSAGES.APPOINTMENT_ALREADY_EXISTS)
            }
        }

        await appointment.update(data)
        return await this.getAppointmentById(id)
    }

    async cancelAppointment(id: number) {
        const appointment = await Appointment.findByPk(id)
        if (!appointment) {
            throw new AppError(404, MESSAGES.APPOINTMENT_NOT_FOUND)
        }

        if (appointment.get('status') === 'CANCELADO') {
            await appointment.update({ status: 'CANCELADO' })
            return await this.getAppointmentById(id)
        }
        if (appointment.get('status') === 'COMPLETADO') {
            throw new AppError(400, MESSAGES.APPOINTMENT_CANNOT_MODIFY_COMPLETED)
        }

        const appointmentDateTime = getAppointmentDateTime(appointment)
        const now = new Date()
        const diffMs = appointmentDateTime.getTime() - now.getTime()
        const diffHours = diffMs / (1000 * 60 * 60)

        if (diffHours < 24) {
            throw new AppError(400, MESSAGES.APPOINTMENT_CANNOT_CANCEL_TOO_LATE)
        }

        await appointment.update({ status: 'CANCELADO' })
        return await this.getAppointmentById(id)
    }

    async deleteAppointment(id: number) {
        const appointment = await Appointment.findByPk(id)
        if (!appointment) {
            throw new AppError(404, MESSAGES.APPOINTMENT_NOT_FOUND)
        }

        if (appointment.get('status') === 'COMPLETADO') {
            throw new AppError(400, MESSAGES.APPOINTMENT_CANNOT_MODIFY_COMPLETED)
        }

        const appointmentDateTime = getAppointmentDateTime(appointment)
        const now = new Date()
        const diffMs = appointmentDateTime.getTime() - now.getTime()
        const diffHours = diffMs / (1000 * 60 * 60)

        if (diffHours < 24) {
            throw new AppError(400, MESSAGES.APPOINTMENT_CANNOT_DELETE_TOO_LATE)
        }

        await appointment.destroy()
        return { message: 'Turno eliminado correctamente' }
    }
}

export const appointmentService = new AppointmentService()
