# Estado actual del Backend SdTM

## Completado
- [x] Modelos Sequelize con relaciones
- [x] Servicios (user, patient, professional, admin, schedule, appointment, account services)
- [x] Auth: registro por /auth (patient/professional/admin) usando AccountServices
- [x] Auth: login con JWT (/auth/login)
- [x] Middlewares: errorHandler, validateId, authMiddleware, roleMiddleware, validateBody
- [x] Validación de body para auth (login, registro paciente/profesional/admin)
- [x] Variables JWT en .env
- [x] Controllers para todas las entidades
- [x] Routes organizadas por entidad con protección por auth/roles
- [x] Router central en src/routes/index.ts montado desde app.ts
- [x] Error handler global
- [x] Validaciones de negocio en services
- [x] Passwords hasheados y nunca expuestos en respuestas
- [x] **Soft deletes** en User, Patient, Professional, Admin, Appointment (paranoid)
- [x] **Hard delete** solo para ADMIN via `DELETE /:id/force`
- [x] TypeScript compila sin errores

## Pendiente / Recomendado
- [ ] **Tests** - hay vitest configurado pero sin tests
- [ ] **Migraciones/seeders** - estructura mencionada en package.json pero no se ven archivos
- [ ] **Documentación API** - swagger/openapi o README con endpoints
- [ ] **Lógica adicional** - transiciones de estado válidas, dependencias antes de eliminar, validación de propietario
- [ ] **Logging** - mejorar manejo de logs

## Notas
- No se pueden crear usuarios sueltos. Creación solo via /auth/*
- userService.createUser() se mantiene intacto (usado por AccountServices)
- Las 24hs para cancelar/eliminar turno están implementadas
- Se valida pertenencia schedule-profesional, horarios, duplicados, etc.
- Rutas protegidas con JWT + roles (ADMIN/PROFESSIONAL/PATIENT)
- Delete normal = soft delete (paranoid). Force delete = hard delete (solo ADMIN)
