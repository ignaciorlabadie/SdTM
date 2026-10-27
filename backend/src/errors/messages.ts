export const MESSAGES = {
    AUTENTICACION_REQUERIDA: 'Autenticación requerida',
    SIN_PERMISOS: 'No tenés permisos para realizar esta acción',
    EMAIL_YA_REGISTRADO: 'El email ya está registrado',
    DNI_YA_REGISTRADO: 'El DNI ya está registrado',
    ALTA_PACIENTE_EN_PACIENTES:
        'El alta de pacientes se realiza en POST /pacientes (crea el usuario y su perfil)',
    USUARIO_NO_ENCONTRADO: 'Usuario no encontrado',
    PACIENTE_NO_ENCONTRADO: 'Paciente no encontrado',
    NO_HAY_PACIENTES: 'No hay pacientes',
    PROFESIONAL_NO_ENCONTRADO: 'Profesional no encontrado',
    ROL_PROFESIONAL_REQUERIDO: 'La cuenta debe tener el rol PROFESIONAL',
    MATRICULA_YA_REGISTRADA: 'La matrícula ya está registrada',
    PERFIL_YA_ASIGNADO: 'La cuenta ya tiene un perfil profesional asignado',
    APPOINTMENT_NOT_FOUND: 'El turno no fue encontrado',
    SCHEDULE_NOT_FOUND: 'La agenda no fue encontrada',
    APPOINTMENT_ALREADY_EXISTS:
        'Ya existe un turno para ese horario, fecha y hora',
    APPOINTMENT_SCHEDULE_MISMATCH: 'El horario no pertenece al profesional',
    APPOINTMENT_SCHEDULE_INACTIVE: 'El horario no se encuentra activo',
    APPOINTMENT_CANNOT_CANCEL_TOO_LATE:
        'No se puede cancelar el turno con menos de 24 horas de anticipación',
    APPOINTMENT_CANNOT_DELETE_TOO_LATE:
        'No se puede eliminar el turno con menos de 24 horas de anticipación',
    APPOINTMENT_CANNOT_MODIFY_COMPLETED:
        'No se puede modificar un turno ya completado',
    APPOINTMENT_CANNOT_MODIFY_CANCELLED:
        'No se puede modificar un turno ya cancelado',
    APPOINTMENT_TIME_OUTSIDE_SCHEDULE:
        'La hora del turno se encuentra fuera del horario del profesional',
    APPOINTMENT_INVALID_DAY: 'El día de la fecha no corresponde al día de la agenda',
    CREDENCIALES_INVALIDAS: 'Credenciales inválidas',
    USUARIO_INACTIVO: 'Usuario inactivo',
} as const
