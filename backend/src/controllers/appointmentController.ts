import type { NextFunction, Request, Response } from 'express'
import { appointmentService } from '../services/appointmentService.js'

export class AppointmentController {
    async getAllAppointments(_req: Request, res: Response, next: NextFunction) {
        try {
            const appointments = await appointmentService.getAllAppointmments()
            return res.status(200).json(appointments)
        } catch (error) {
            return next(error)
        }
    }

    async getAppointmentById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const appointment = await appointmentService.getAppointmentById(id)
            return res.status(200).json(appointment)
        } catch (error) {
            return next(error)
        }
    }

    async getAppointmentsByPatientId(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const patientId = Number(req.params.patientId)
            const appointments =
                await appointmentService.getAppointmentsByPatientId(patientId)
            return res.status(200).json(appointments)
        } catch (error) {
            return next(error)
        }
    }

    async getAppointmentsByProfessionalId(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const professionalId = Number(req.params.professionalId)
            const appointments =
                await appointmentService.getAppointmentsByProfessionalId(
                    professionalId,
                )
            return res.status(200).json(appointments)
        } catch (error) {
            return next(error)
        }
    }

    async createAppointment(req: Request, res: Response, next: NextFunction) {
        try {
            const appointment = await appointmentService.createAppointment(
                req.body,
            )
            return res.status(201).json(appointment)
        } catch (error) {
            return next(error)
        }
    }

    async updateAppointment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const appointment = await appointmentService.updateAppointment(
                id,
                req.body,
            )
            return res.status(200).json(appointment)
        } catch (error) {
            return next(error)
        }
    }

    async cancelAppointment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const appointment = await appointmentService.cancelAppointment(id)
            return res.status(200).json(appointment)
        } catch (error) {
            return next(error)
        }
    }

    async deleteAppointment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const result = await appointmentService.deleteAppointment(id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async forceDeleteAppointment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const result = await appointmentService.forceDeleteAppointment(id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

export const appointmentController = new AppointmentController()
