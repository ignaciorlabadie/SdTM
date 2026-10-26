import User from '../models/UserModel.js'
import type { CreateAccount } from '../types/user/CreateAccount.js'
import type { UpdateAccount } from '../types/user/UpdateAccount.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'
import { hashPassword } from '../utils/passwords.js'
import { normalizeEmail } from '../utils/validation.js'
import { UserAttributes as userAttributes } from '../types/user/UserAttributes.js'

export class UserService {
    async getAllUsers() {
        return await User.findAll({
            ...userAttributes,
        })
    }

    async getUserById(userId: number) {
        const user = await User.findByPk(userId, { ...userAttributes })
        if (!user) {
            throw new AppError(404, MESSAGES.USUARIO_NO_ENCONTRADO)
        }
        return user
    }

    async getUserbyEmail(email: string) {
        const userEmail = normalizeEmail(email)
        if (!userEmail) {
            throw new AppError(400, 'Email inválido')
        }
        const user = await User.findOne({
            where: { email: userEmail },
            ...userAttributes,
        })
        if (!user) {
            throw new AppError(404, MESSAGES.USUARIO_NO_ENCONTRADO)
        }
        return user
    }

    async createUser(datos: CreateAccount) {
        const email = normalizeEmail(datos.email)
        if (!email) {
            throw new AppError(400, 'Email inválido')
        }
        const existentUser = await User.findOne({
            where: { email },
        })
        if (existentUser) {
            throw new AppError(409, MESSAGES.EMAIL_YA_REGISTRADO)
        }
        const hashedPassword = await hashPassword(datos.password)
        const user = await User.create({
            email,
            password: hashedPassword,
            active: datos.active ?? true,
        })
        const { password, ...userWithoutPassword } = user.toJSON()
        return userWithoutPassword
    }

    async updateUser(userId: number, datos: UpdateAccount) {
        const user = await User.findByPk(userId)
        if (!user) {
            throw new AppError(404, MESSAGES.USUARIO_NO_ENCONTRADO)
        }
        if (datos.email) {
            const email = normalizeEmail(datos.email)
            if (!email) {
                throw new AppError(400, 'Email inválido')
            }
            const existent = await User.findOne({ where: { email } })
            if (existent && existent.id !== userId) {
                throw new AppError(409, MESSAGES.EMAIL_YA_REGISTRADO)
            }
            user.email = email
        }
        if (datos.password) {
            user.password = await hashPassword(datos.password)
        }
        if (typeof datos.active === 'boolean') {
            user.active = datos.active
        }
        await user.save()
        const { password, ...rest } = user.toJSON()
        return rest
    }

    async deleteUser(userId: number) {
        const user = await User.findByPk(userId)
        if (!user) {
            throw new AppError(404, MESSAGES.USUARIO_NO_ENCONTRADO)
        }
        await user.destroy()
        return { message: 'Usuario eliminado correctamente' }
    }
}

export const userService = new UserService()
