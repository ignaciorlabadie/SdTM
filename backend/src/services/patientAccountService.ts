import sequelize from '../config/database.js'
import { userService } from './userService.js'
import { patientService } from './patientService.js'
import type { CreatePatientAccount } from '../types/auth/CreatePatientAccount.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'
import Patient from '../models/PatientModel.js'

export class PatientAccountService {
    async createPatientAccount(datos: CreatePatientAccount) {
        const t = await sequelize.transaction()
        try {
            const existingUser = await patientService.getPatientByUserId
                ? null
                : null

            const existingDni = await Patient.findOne({ where: { dni: datos.dni }, transaction: t })
            if (existingDni) {
                throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
            }

            const user = await userService.createUser({
                email: datos.email,
                password: datos.password,
                active: datos.active ?? true,
            })

            const patient = await patientService.createPatientForUser(user.id, {
                name: datos.name,
                lastname: datos.lastname,
                dni: datos.dni,
                cellphone: datos.cellphone,
                birthDate: datos.birthDate,
                address: datos.address,
            })

            await t.commit()
            return { user, patient }
        } catch (error) {
            await t.rollback()
            throw error
        }
    }
}

export const patientAccountService = new PatientAccountService()
