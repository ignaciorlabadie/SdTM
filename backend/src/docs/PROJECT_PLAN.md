# Planificación del Proyecto SdTM

## Objetivo
Implementar controllers, routes y middlewares para completar la API REST siguiendo el patrón Service Layer ya establecido en el proyecto.

## Reglas de Negocio
- **NO se pueden crear usuarios sueltos**: La creación de `User` únicamente puede realizarse a través de los `*AccountService` que crean User + perfil asociado en transacción.
- **Rutas de alta centralizadas en `/auth/`**: `POST /auth/patient`, `POST /auth/professional`, `POST /auth/admin`
- **`userService.createUser()` debe mantenerse intacto**: Es utilizado por los AccountServices.
- **UserController NO debe tener POST para crear usuario**: Solo GET, PUT/PATCH, DELETE.

## Arquitectura
- **Patrón**: Service Layer (Controllers -> Services -> Models)
- **Framework**: Express + TypeScript + Sequelize + PostgreSQL
- **Módulos**: ES Modules (`"type": "module"`)
- **Imports**: Con extensión `.js` en archivos TypeScript
- **Errores**: Usar `AppError` desde `errors/AppError.ts`
- **Manejo**: `try/catch` + `next(error)` en controllers

## Estructura a crear

### Middlewares
```
backend/src/middlewares/
├── errorHandler.ts
└── validateId.ts
```

### Routes
```
backend/src/routes/
├── index.ts          # Router central que app.ts consumirá
├── authRoutes.ts
├── userRoutes.ts
├── patientRoutes.ts
├── professionalRoutes.ts
├── adminRoutes.ts
├── scheduleRoutes.ts
└── appointmentRoutes.ts
```

### Controllers
```
backend/src/controllers/
├── authController.ts
├── userController.ts
├── patientController.ts
├── professionalController.ts
├── adminController.ts
├── scheduleController.ts
└── appointmentController.ts
```

## Endpoints Propuestos

### Auth (`/auth`)
| Método | Ruta | Servicio | Descripción |
|---|---|---|---|
| POST | `/auth/patient` | `patientAccountService.createPatientAccount` | Crear User + Patient |
| POST | `/auth/professional` | `professionalAccountService.createProfessionalAccount` | Crear User + Professional |
| POST | `/auth/admin` | `adminAccountService.createAdminAccount` | Crear User + Admin |

### Users (`/users`) - SIN POST
| Método | Ruta | Servicio | Descripción |
|---|---|---|---|
| GET | `/users` | `userService.getAllUsers` | Listar usuarios |
| GET | `/users/:id` | `userService.getUserById` | Obtener usuario por ID |
| GET | `/users/email/:email` | `userService.getUserbyEmail` | Obtener usuario por email |
| PUT/PATCH | `/users/:id` | `userService.updateUser` | Actualizar usuario |
| DELETE | `/users/:id` | `userService.deleteUser` | Eliminar usuario |

### Patients (`/patients`)
| Método | Ruta | Servicio | Descripción |
|---|---|---|---|
| GET | `/patients` | `patientService.getAllPatients` | Listar pacientes |
| GET | `/patients/:id` | `patientService.getPatientById` | Obtener paciente por ID |
| GET | `/patients/dni/:dni` | `patientService.getPatientByDni` | Obtener paciente por DNI |
| GET | `/patients/user/:userId` | `patientService.getPatientByUserId` | Obtener paciente por userId |
| PUT/PATCH | `/patients/:id` | `patientService.updatePatientProfile` | Actualizar perfil |
| DELETE | `/patients/:id` | `patientService.deletePatient` | Eliminar paciente |

### Professionals (`/professionals`)
| Método | Ruta | Servicio | Descripción |
|---|---|---|---|
| GET | `/professionals` | `professionalService.getAllProfessionals` | Listar profesionales |
| GET | `/professionals/:id` | `professionalService.getProfessionalById` | Obtener profesional por ID |
| GET | `/professionals/matricula/:matricula` | `professionalService.getProfessionalByMatricula` | Obtener por matrícula |
| GET | `/professionals/user/:userId` | `professionalService.getProfessionalByUserId` | Obtener por userId |
| PUT/PATCH | `/professionals/:id` | `professionalService.updateProfessionalProfile` | Actualizar perfil |
| DELETE | `/professionals/:id` | `professionalService.deleteProfessional` | Eliminar profesional |

### Admins (`/admins`)
| Método | Ruta | Servicio | Descripción |
|---|---|---|---|
| GET | `/admins` | `adminService.getAllAdmins` | Listar admins |
| GET | `/admins/:id` | `adminService.getAdminById` | Obtener admin por ID |
| GET | `/admins/user/:userId` | `adminService.getAdminByUserId` | Obtener por userId |
| PUT/PATCH | `/admins/:id` | `adminService.updateAdminProfile` | Actualizar perfil |
| DELETE | `/admins/:id` | `adminService.deleteAdmin` | Eliminar admin |

### Schedules (`/schedules`)
| Método | Ruta | Servicio | Descripción |
|---|---|---|---|
| GET | `/schedules` | `scheduleService.getAllSchedules` | Listar horarios |
| GET | `/schedules/:id` | `scheduleService.getScheduleById` | Obtener horario por ID |
| GET | `/schedules/professional/:professionalId` | `scheduleService.getSchedulesByProfessionalId` | Horarios por profesional |
| POST | `/schedules` | `scheduleService.createSchedule` | Crear horario |
| PUT/PATCH | `/schedules/:id` | `scheduleService.updateSchedule` | Actualizar horario |
| PATCH | `/schedules/:id/toggle` | `scheduleService.toggleScheduleActive` | Activar/desactivar |
| DELETE | `/schedules/:id` | `scheduleService.deleteSchedule` | Eliminar horario |

### Appointments (`/appointments`)
| Método | Ruta | Servicio | Descripción |
|---|---|---|---|
| GET | `/appointments` | `appointmentService.getAllAppointmments` | Listar turnos |
| GET | `/appointments/:id` | `appointmentService.getAppointmentById` | Obtener turno por ID |
| GET | `/appointments/patient/:patientId` | `appointmentService.getAppointmentsByPatientId` | Turnos por paciente |
| GET | `/appointments/professional/:professionalId` | `appointmentService.getAppointmentsByProfessionalId` | Turnos por profesional |
| POST | `/appointments` | `appointmentService.createAppointment` | Crear turno |
| PUT/PATCH | `/appointments/:id` | `appointmentService.updateAppointment` | Actualizar turno |
| PATCH | `/appointments/:id/cancel` | `appointmentService.cancelAppointment` | Cancelar (mín 24h) |
| DELETE | `/appointments/:id` | `appointmentService.deleteAppointment` | Eliminar (mín 24h) |

## Integración
- `app.ts` importará `routes/index.ts` y hará `app.use(routes)`
- Error handler se montará al final de `app.ts`

## Checklist
- [ ] Crear documentación
- [ ] Crear middlewares (errorHandler, validateId)
- [ ] Crear routes/index.ts y rutas por entidad
- [ ] Crear controllers
- [ ] Integrar en app.ts
- [ ] Verificar con TypeScript
