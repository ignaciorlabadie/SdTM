import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import { AppError } from '../errors/AppError.js'
import { MESSAGES } from '../errors/messages.js'
import { checkPassword } from '../utils/passwords.js'
import { normalizeEmail } from '../utils/validation.js'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d'

export class AuthService {
    async login(email: string, password: string) {
        const normalizedEmail = normalizeEmail(email)

        const user = await User.findOne({
            where: { email: normalizedEmail },
        })

        if (!user) {
            throw new AppError(401, MESSAGES.CREDENCIALES_INVALIDAS)
        }

        if (!user.active) {
            throw new AppError(403, MESSAGES.USUARIO_INACTIVO)
        }

        const isValid = await checkPassword(password, user.password)
        if (!isValid) {
            throw new AppError(401, MESSAGES.CREDENCIALES_INVALIDAS)
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN,
            } as jwt.SignOptions,
        )

        const { password: _password, ...userWithoutPassword } = user.toJSON()

        return {
            user: userWithoutPassword,
            token,
        }
    }
}

export const authService = new AuthService()
