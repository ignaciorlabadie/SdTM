import type { NextFunction, Request, Response } from 'express'
import { professionalService } from '../services/professionalService.js'

export class ProfessionalController {
    async getAllProfessionals(_req: Request, res: Response, next: NextFunction) {
        try {
            const professionals = await professionalService.getAllProfessionals()
            return res.status(200).json(professionals)
        } catch (error) {
            return next(error)
        }
    }

    async getProfessionalById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const professional = await professionalService.getProfessionalById(id)
            return res.status(200).json(professional)
        } catch (error) {
            return next(error)
        }
    }

    async getProfessionalByMatricula(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const matricula = req.params.matricula as string
            const professional =
                await professionalService.getProfessionalByLicenseNumber(
                    matricula,
                )
            return res.status(200).json(professional)
        } catch (error) {
            return next(error)
        }
    }

    async getProfessionalByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId)
            const professional =
                await professionalService.getProfessionalByUserId(userId)
            return res.status(200).json(professional)
        } catch (error) {
            return next(error)
        }
    }

    async updateProfessionalProfile(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = Number(req.params.id)
            const professional =
                await professionalService.updateProfessionalProfile(id, req.body)
            return res.status(200).json(professional)
        } catch (error) {
            return next(error)
        }
    }

    async deleteProfessional(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const result = await professionalService.deleteProfessional(id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

export const professionalController = new ProfessionalController()
