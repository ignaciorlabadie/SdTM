import type { NextFunction, Request, Response } from 'express'
import { patientAccountService } from '../services/patientAccountService.js'
import { professionalAccountService } from '../services/professionalAccountService.js'
import { adminAccountService } from '../services/adminAccountService.js'
import { authService } from '../services/authService.js'

export class AuthController {
    async registerPatient(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await patientAccountService.createPatientAccount(
                req.body,
            )
            return res.status(201).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async registerProfessional(req: Request, res: Response, next: NextFunction) {
        try {
            const result =
                await professionalAccountService.createProfessionalAccount(
                    req.body,
                )
            return res.status(201).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async registerAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await adminAccountService.createAdminAccount(req.body)
            return res.status(201).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const result = await authService.login(email, password)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

export const authController = new AuthController()
