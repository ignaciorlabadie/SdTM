import Schedule from '../models/ScheduleModel.js'
import Professional from '../models/ProfessionalModel.js'
import type { CreateSchedule } from '../types/schedule/CreateSchedule.js'
import type { UpdateSchedule } from '../types/schedule/UpdateSchedule.js'
import type { WeekDay } from '../types/schedule/WeekDayType.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'

export class ScheduleService {
    async getAllSchedules() {
        const schedules = await Schedule.findAll({
            include: [
                {
                    model: Professional,
                    as: 'professional',
                },
            ],
            order: [['id', 'ASC']],
        })
        return schedules
    }

    async getScheduleById(id: number) {
        const schedule = await Schedule.findByPk(id, {
            include: [
                {
                    model: Professional,
                    as: 'professional',
                },
            ],
        })
        if (!schedule) {
            throw new AppError(404, 'Horario no encontrado')
        }
        return schedule
    }

    async getSchedulesByProfessionalId(professionalId: number) {
        const schedules = await Schedule.findAll({
            where: { professionalId },
            include: [
                {
                    model: Professional,
                    as: 'professional',
                },
            ],
            order: [
                ['weekDay', 'ASC'],
                ['startTime', 'ASC'],
            ],
        })
        return schedules
    }

    async getScheduleByProfessionalAndWeekDay(
        professionalId: number,
        weekDay: WeekDay,
    ) {
        return await Schedule.findOne({
            where: { professionalId, weekDay },
            include: [
                {
                    model: Professional,
                    as: 'professional',
                },
            ],
        })
    }

    async createSchedule(data: CreateSchedule) {
        const professional = await Professional.findByPk(data.professionalId)
        if (!professional) {
            throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
        }

        const existingSchedule = await Schedule.findOne({
            where: {
                professionalId: data.professionalId,
                weekDay: data.weekDay,
            },
        })
        if (existingSchedule) {
            throw new AppError(
                409,
                'Ya existe un horario para este profesional en ese día',
            )
        }

        if (data.startTime >= data.endTime) {
            throw new AppError(
                400,
                'La hora de inicio debe ser anterior a la hora de fin',
            )
        }

        const schedule = await Schedule.create(data)
        return await this.getScheduleById(schedule.id)
    }

    async updateSchedule(id: number, data: Partial<UpdateSchedule>) {
        const schedule = await Schedule.findByPk(id)
        if (!schedule) {
            throw new AppError(404, 'Horario no encontrado')
        }

        if (
            data.professionalId &&
            data.professionalId !== schedule.professionalId
        ) {
            const professional = await Professional.findByPk(
                data.professionalId,
            )
            if (!professional) {
                throw new AppError(404, MESSAGES.PROFESIONAL_NO_ENCONTRADO)
            }
        }

        const newProfessionalId = data.professionalId ?? schedule.professionalId
        const newWeekDay = data.weekDay ?? schedule.weekDay

        if (data.weekDay || data.professionalId) {
            const existingSchedule = await Schedule.findOne({
                where: {
                    professionalId: newProfessionalId,
                    weekDay: newWeekDay,
                },
            })
            if (existingSchedule && existingSchedule.id !== id) {
                throw new AppError(
                    409,
                    'Ya existe un horario para este profesional en ese día',
                )
            }
        }

        const startTime = data.startTime ?? schedule.startTime
        const endTime = data.endTime ?? schedule.endTime
        if (startTime >= endTime) {
            throw new AppError(
                400,
                'La hora de inicio debe ser anterior a la hora de fin',
            )
        }

        await schedule.update(data)
        return await this.getScheduleById(id)
    }

    async toggleScheduleActive(id: number, active: boolean) {
        const schedule = await Schedule.findByPk(id)
        if (!schedule) {
            throw new AppError(404, 'Horario no encontrado')
        }
        schedule.active = active
        await schedule.save()
        return await this.getScheduleById(id)
    }

    async deleteSchedule(id: number) {
        const schedule = await Schedule.findByPk(id)
        if (!schedule) {
            throw new AppError(404, 'Horario no encontrado')
        }
        await schedule.destroy()
        return { message: 'Horario eliminado correctamente' }
    }
}

export const scheduleService = new ScheduleService()
