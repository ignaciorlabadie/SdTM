import type { NextFunction, Request, Response } from 'express'
import { patientService } from '../services/patientService.js'

export class PatientController {
    async getAllPatients(_req: Request, res: Response, next: NextFunction) {
        try {
            const patients = await patientService.getAllPatients()
            return res.status(200).json(patients)
        } catch (error) {
            return next(error)
        }
    }

    async getPatientById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const patient = await patientService.getPatientById(id)
            return res.status(200).json(patient)
        } catch (error) {
            return next(error)
        }
    }

    async getPatientByDni(req: Request, res: Response, next: NextFunction) {
        try {
            const dni = req.params.dni as string
            const patient = await patientService.getPatientByDni(dni)
            return res.status(200).json(patient)
        } catch (error) {
            return next(error)
        }
    }

    async getPatientByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId)
            const patient = await patientService.getPatientByUserId(userId)
            return res.status(200).json(patient)
        } catch (error) {
            return next(error)
        }
    }

    async updatePatientProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const patient = await patientService.updatePatientProfile(
                id,
                req.body,
            )
            return res.status(200).json(patient)
        } catch (error) {
            return next(error)
        }
    }

    async deletePatient(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const result = await patientService.deletePatient(id)
            return res.status(200).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

export const patientController = new PatientController()
