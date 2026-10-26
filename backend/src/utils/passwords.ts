import bcrypt from 'bcryptjs'

const DEFAULT_SALT_ROUNDS = 10

function getSaltRounds(): number {
    const configurated = Number(process.env.BCRYPT_SALT_ROUNDS)

    if (
        !Number.isInteger(configurated) ||
        configurated < 4 ||
        configurated > 15
    ) {
        return DEFAULT_SALT_ROUNDS
    }

    return configurated
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, getSaltRounds())
}

export async function checkPassword(
    password: string,
    hash: string,
): Promise<boolean> {
    return bcrypt.compare(password, hash)
}
