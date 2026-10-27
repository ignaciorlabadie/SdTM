import type { NextFunction, Response } from 'express'
import type { AuthRequest } from './authMiddleware.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'
import Patient from '../models/PatientModel.js'
import Professional from '../models/ProfessionalModel.js'
import Admin from '../models/AdminModel.js'

type Role = 'ADMIN' | 'PROFESSIONAL' | 'PATIENT'

export function roleMiddleware(allowedRoles: Role[]) {
    return async (req: AuthRequest, _res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new AppError(401, MESSAGES.AUTENTICACION_REQUERIDA)
            }

            const [patient, professional, admin] = await Promise.all([
                Patient.findOne({ where: { userId: req.user.id } }),
                Professional.findOne({ where: { userId: req.user.id } }),
                Admin.findOne({ where: { userId: req.user.id } }),
            ])

            if (admin && allowedRoles.includes('ADMIN')) {
                return next()
            }
            if (professional && allowedRoles.includes('PROFESSIONAL')) {
                return next()
            }
            if (patient && allowedRoles.includes('PATIENT')) {
                return next()
            }

            throw new AppError(403, MESSAGES.SIN_PERMISOS)
        } catch (error) {
            return next(error)
        }
    }
}
