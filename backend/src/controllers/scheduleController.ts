import type { NextFunction, Request, Response } from 'express'
import { scheduleService } from '../services/scheduleService.js'

export class ScheduleController {
    async getAllSchedules(_req: Request, res: Response, next: NextFunction) {
        try {
            const schedules = await scheduleService.getAllSchedules()
            return res.status(200).json(schedules)
        } catch (error) {
            return next(error)
        }
    }

    async getScheduleById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const schedule = await scheduleService.getScheduleById(id)
            return res.status(200).json(schedule)
        } catch (error) {
            return next(error)
        }
    }

    async getSchedulesByProfessionalId(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const professionalId = Number(req.params.professionalId)
            const schedules =
                await scheduleService.getSchedulesByProfessionalId(professionalId)
            return res.status(200).json(schedules)
        } catch (error) {
            return next(error)
        }
    }

    async createSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const schedule = await scheduleService.createSchedule(req.body)
            return res.status(201).json(schedule)
        } catch (error) {
            return next(error)
        }
    }

    async updateSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const schedule = await scheduleService.updateSchedule(id, req.body)
            return res.status(200).json(schedule)
        } catch (error) {
            return next(error)
        }
    }

    async toggleScheduleActive(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const active = Boolean(req.body.active)
            const schedule = await scheduleService.toggleScheduleActive(
                id,
                active,
            )
            return res.status(200).json(schedule)
        } catch (error) {
            return next(error)
        }
    }

    async deleteSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const result = await scheduleService.deleteSchedule(id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

export const scheduleController = new ScheduleController()
