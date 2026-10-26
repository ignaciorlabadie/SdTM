import type { CreateAccount } from '../user/CreateAccount.js'
import type { CreatePatient } from '../patient/CreatePatient.js'

export interface CreatePatientAccount extends CreateAccount, CreatePatient {}
