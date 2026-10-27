# Contexto del Proyecto SdTM

## Información General
- **Nombre**: Sistema de Turnos Médicos (SdTM)
- **Stack**: Node.js + Express + TypeScript + Sequelize + PostgreSQL
- **Estructura**: Backend en `backend/`

## Arquitectura
Sigue patrón **Service Layer**: Controllers (futuros) -> Services -> Models (Sequelize) -> PostgreSQL

### Carpetas principales
```
backend/src/
├── app.ts              # Configuración Express
├── server.ts           # Inicio del servidor + conexión DB
├── config/database.ts  # Configuración Sequelize
├── models/             # Modelos Sequelize
├── services/           # Lógica de negocio
├── types/              # Tipos TypeScript
├── errors/             # AppError + mensajes
└── utils/              # Utilidades (passwords, validation)
```

## Modelos y Relaciones
- **User**: Usuario base con auth (email, password, active, role)
- **Patient**: Perfil paciente, relacionado con User (1:1)
- **Professional**: Perfil profesional, relacionado con User (1:1)
- **Admin**: Perfil admin, relacionado con User (1:1)
- **Schedule**: Horarios de profesionales (día, hora inicio/fin, duración, activo)
- **Appointment**: Turnos (paciente, profesional, horario, fecha, hora, estado, motivo)

Relaciones en `models/index.ts`:
- User hasOne Patient/Professional/Admin
- Patient/Professional hasMany Appointment
- Schedule hasMany Appointment, belongsTo Professional
- Appointment belongsTo Patient/Professional/Schedule

## Servicios existentes
- `userService.ts` - CRUD usuarios
- `patientService.ts` - CRUD pacientes + búsqueda por DNI/userId
- `professionalService.ts` - CRUD profesionales
- `adminService.ts` - CRUD admins
- `scheduleService.ts` - CRUD horarios + validaciones
- `appointmentService.ts` - CRUD turnos + validaciones de negocio
- `patientAccountService.ts`, `professionalAccountService.ts`, `adminAccountService.ts` - Crear User + perfil asociado

## Tipos importantes
- `AppointmentStatus`: 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO' | 'COMPLETADO'
- `WeekDay`: 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES' | 'SABADO' | 'DOMINGO'
- Roles en User: manejo vía relaciones con Patient/Professional/Admin

## Errores
- `AppError` con statusCode + message
- Todos los mensajes centralizados en `errors/messages.ts`

## Validaciones
- Utils: `passwords.ts` (hash/check), `validation.ts` (email, password, dni, phone, date, etc.)
- Las validaciones de negocio van en los **services**

## Estado actual
- **Sin controllers ni rutas** - Solo services, models, types
- **app.ts**: Tiene endpoints `/` y `/health` únicamente
- **Sin middlewares** (auth, error handler) visibles aún
- **Sin carpetas controllers/routes**

## Convenciones del proyecto
- Usar ES modules (`"type": "module"`)
- Imports con extensión `.js` en archivos TS
- Try/catch + `next(error)` en controllers (cuando existan)
- Los services lanzan `AppError`, no retornan errores
- Usar `await` en todas las operaciones async
- Seguir patrón de los services existentes

## Próximos pasos
Crear controllers y rutas siguiendo el orden: User -> Patient -> Professional -> Admin -> Schedule -> Appointment
También considerar los *AccountServices* para flujos de registro/alta.
