import type { CreateAccount } from '../user/CreateAccount.js'
import type { CreateAdmin } from '../admin/CreateAdmin.js'

export interface CreateAdminAccount extends CreateAccount, CreateAdmin {}
