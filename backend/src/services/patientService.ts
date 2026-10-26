import User from '../models/UserModel.js'
import Patient from '../models/PatientModel.js'
import { UserAttributes as userAttributes } from '../types/user/UserAttributes.js'
import type { CreatePatient } from '../types/patient/CreatePatient.js'
import type { UpdatePatient } from '../types/patient/UpdatePatient.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'

export class PatientService {
    async getAllPatients() {
        const patients = await Patient.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
            order: [['id', 'ASC']],
        })

        return patients
    }

    async getPatientById(id: number) {
        const patient = await Patient.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
        })

        if (!patient) {
            throw new AppError(404, MESSAGES.PACIENTE_NO_ENCONTRADO)
        }

        return patient
    }

    async getPatientByDni(patientDni: string | number) {
        const patient = await Patient.findOne({
            where: { dni: String(patientDni) },
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
        })

        if (!patient) {
            throw new AppError(404, MESSAGES.PACIENTE_NO_ENCONTRADO)
        }
        return patient
    }

    async getPatientByUserId(userId: number) {
        const patient = await Patient.findOne({
            where: { userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    ...userAttributes,
                },
            ],
        })

        if (!patient) {
            throw new AppError(404, MESSAGES.PACIENTE_NO_ENCONTRADO)
        }
        return patient
    }

    async createPatientForUser(userId: number, data: CreatePatient) {
        const existingDni = await Patient.findOne({ where: { dni: data.dni } })
        if (existingDni) {
            throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
        }

        const patient = await Patient.create({
            userId,
            name: data.name,
            lastname: data.lastname,
            dni: data.dni,
            cellphone: data.cellphone,
            birthDate: data.birthDate,
            address: data.address,
        })

        return await this.getPatientById(patient.id)
    }

    async updatePatientProfile(id: number, data: Partial<UpdatePatient>) {
        const patient = await Patient.findByPk(id)
        if (!patient) {
            throw new AppError(404, MESSAGES.PACIENTE_NO_ENCONTRADO)
        }

        if (data.dni && data.dni !== patient.dni) {
            const existingDni = await Patient.findOne({
                where: { dni: data.dni },
            })
            if (existingDni && existingDni.id !== id) {
                throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
            }
        }

        await patient.update(data)
        return await this.getPatientById(id)
    }

    async deletePatient(id: number) {
        const patient = await Patient.findByPk(id)
        if (!patient) {
            throw new AppError(404, MESSAGES.PACIENTE_NO_ENCONTRADO)
        }
        await patient.destroy()
        return { message: 'Paciente eliminado correctamente' }
    }
}

export const patientService = new PatientService()
