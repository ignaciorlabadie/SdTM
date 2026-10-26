import sequelize from '../config/database.js'
import { userService } from './userService.js'
import { adminService } from './adminService.js'
import type { CreateAdminAccount } from '../types/auth/CreateAdminAccount.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'
import Admin from '../models/AdminModel.js'

export class AdminAccountService {
    async createAdminAccount(datos: CreateAdminAccount) {
        const t = await sequelize.transaction()
        try {
            const existingDni = await Admin.findOne({ where: { dni: datos.dni }, transaction: t })
            if (existingDni) {
                throw new AppError(409, MESSAGES.DNI_YA_REGISTRADO)
            }

            const user = await userService.createUser({
                email: datos.email,
                password: datos.password,
                active: datos.active ?? true,
            })

            const admin = await adminService.createAdminForUser(user.id, {
                name: datos.name,
                lastname: datos.lastname,
                dni: datos.dni,
                cellphone: datos.cellphone,
            })

            await t.commit()
            return { user, admin }
        } catch (error) {
            await t.rollback()
            throw error
        }
    }
}

export const adminAccountService = new AdminAccountService()
