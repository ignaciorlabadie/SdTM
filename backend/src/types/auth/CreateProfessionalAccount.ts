import type { CreateAccount } from '../user/CreateAccount.js'
import type { CreateProfessional } from '../professional/CreateProfessional.js'

export interface CreateProfessionalAccount
    extends CreateAccount, CreateProfessional {}
