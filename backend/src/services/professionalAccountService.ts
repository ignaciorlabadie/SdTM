import sequelize from '../config/database.js'
import { userService } from './userService.js'
import { professionalService } from './professionalService.js'
import type { CreateProfessionalAccount } from '../types/auth/CreateProfessionalAccount.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'
import Professional from '../models/ProfessionalModel.js'

export class ProfessionalAccountService {
    async createProfessionalAccount(datos: CreateProfessionalAccount) {
        const t = await sequelize.transaction()
        try {
            const existingDni = await Professional.findOne({ where: { dni: datos.dni }, transaction: t })
            if (existingDni) {
                throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
            }

            const existingMatricula = await Professional.findOne({ where: { licenseNumber: datos.licenseNumber }, transaction: t })
            if (existingMatricula) {
                throw new AppError(409, MESSAGES.MATRICULA_YA_REGISTRADA)
            }

            const user = await userService.createUser({
                email: datos.email,
                password: datos.password,
                active: datos.active ?? true,
            })

            const professional = await professionalService.createProfessionalForUser(user.id, {
                name: datos.name,
                lastname: datos.lastname,
                dni: datos.dni,
                cellphone: datos.cellphone,
                specialty: datos.specialty,
                licenseNumber: datos.licenseNumber,
            })

            await t.commit()
            return { user, professional }
        } catch (error) {
            await t.rollback()
            throw error
        }
    }
}

export const professionalAccountService = new ProfessionalAccountService()
