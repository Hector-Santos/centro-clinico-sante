export const INVALID_PATIENT_ID_ISSTRING = {
  code: 'INVALID_PATIENT_ID_ISSTRING',
  dto: 'PatientDto',
  field: 'id',
  validator: 'IsString',
  message: 'Id must be a string.',
};

export const INVALID_PATIENT_ID_ISNOTEMPTY = {
  code: 'INVALID_PATIENT_ID_ISNOTEMPTY',
  dto: 'PatientDto',
  field: 'id',
  validator: 'IsNotEmpty',
  message: 'Id is required.',
};

export const INVALID_PATIENT_NAME_ISSTRING = {
  code: 'INVALID_PATIENT_NAME_ISSTRING',
  dto: 'PatientDto',
  field: 'name',
  validator: 'IsString',
  message: 'Name must be a string.',
};

export const INVALID_PATIENT_NAME_ISNOTEMPTY = {
  code: 'INVALID_PATIENT_NAME_ISNOTEMPTY',
  dto: 'PatientDto',
  field: 'name',
  validator: 'IsNotEmpty',
  message: 'Name is required.',
};

export const INVALID_PATIENT_PHONE_ISSTRING = {
  code: 'INVALID_PATIENT_PHONE_ISSTRING',
  dto: 'PatientDto',
  field: 'phone',
  validator: 'IsString',
  message: 'Phone must be a string.',
};

export const INVALID_PATIENT_PHONE_ISNOTEMPTY = {
  code: 'INVALID_PATIENT_PHONE_ISNOTEMPTY',
  dto: 'PatientDto',
  field: 'phone',
  validator: 'IsNotEmpty',
  message: 'Phone is required.',
};

export const INVALID_PATIENT_DOCTORID_ISSTRING = {
  code: 'INVALID_PATIENT_DOCTORID_ISSTRING',
  dto: 'PatientDto',
  field: 'doctorId',
  validator: 'IsString',
  message: 'Doctor id must be a string.',
};

export const INVALID_PATIENT_DOCTORID_ISNOTEMPTY = {
  code: 'INVALID_PATIENT_DOCTORID_ISNOTEMPTY',
  dto: 'PatientDto',
  field: 'doctorId',
  validator: 'IsNotEmpty',
  message: 'Doctor id is required.',
};

export const INVALID_CREATEPATIENT_NAME_ISSTRING = {
  code: 'INVALID_CREATEPATIENT_NAME_ISSTRING',
  dto: 'CreatePatientDto',
  field: 'name',
  validator: 'IsString',
  message: 'Name must be a string.',
};

export const INVALID_CREATEPATIENT_NAME_ISNOTEMPTY = {
  code: 'INVALID_CREATEPATIENT_NAME_ISNOTEMPTY',
  dto: 'CreatePatientDto',
  field: 'name',
  validator: 'IsNotEmpty',
  message: 'Name is required.',
};

export const INVALID_CREATEPATIENT_PHONE_ISSTRING = {
  code: 'INVALID_CREATEPATIENT_PHONE_ISSTRING',
  dto: 'CreatePatientDto',
  field: 'phone',
  validator: 'IsString',
  message: 'Phone must be a string.',
};

export const INVALID_CREATEPATIENT_PHONE_ISNOTEMPTY = {
  code: 'INVALID_CREATEPATIENT_PHONE_ISNOTEMPTY',
  dto: 'CreatePatientDto',
  field: 'phone',
  validator: 'IsNotEmpty',
  message: 'Phone is required.',
};

export const INVALID_SCHEDULEEXCEPTION_ID = {
  code: 'INVALID_SCHEDULEEXCEPTION_ID',
  dto: 'ScheduleExceptionDto',
  field: 'id',
  validator: 'IsString',
  message: 'Id must be a string.',
};

export const INVALID_SCHEDULEEXCEPTION_ORIGINALDATE = {
  code: 'INVALID_SCHEDULEEXCEPTION_ORIGINALDATE',
  dto: 'ScheduleExceptionDto',
  field: 'originalDate',
  validator: 'IsFutureDate',
  message: 'Original date must be a future date.',
};

export const INVALID_CREATESCHEDULEEXCEPTION_ORIGINALDATE = {
  code: 'INVALID_CREATESCHEDULEEXCEPTION_ORIGINALDATE',
  dto: 'CreateScheduleExceptionDto',
  field: 'originalDate',
  validator: 'IsFutureDate',
  message: 'Original date must be a future date.',
};

export const INVALID_WEEKLYSCHEDULE_ID = {
  code: 'INVALID_WEEKLYSCHEDULE_ID',
  dto: 'WeeklyScheduleDto',
  field: 'id',
  validator: 'IsString',
  message: 'Id must be a string.',
};

export const INVALID_SCHEDULE_DOCTORID = {
  code: 'INVALID_SCHEDULE_DOCTORID',
  dto: 'ScheduleDto',
  field: 'doctorId',
  validator: 'IsString',
  message: 'Doctor id must be a string.',
};

export const INVALID_APPOINTMENT_ID = {
  code: 'INVALID_APPOINTMENT_ID',
  dto: 'AppointmentDto',
  field: 'id',
  validator: 'IsString',
  message: 'Id must be a string.',
};

export const INVALID_APPOINTMENT_DOCTORID = {
  code: 'INVALID_APPOINTMENT_DOCTORID',
  dto: 'AppointmentDto',
  field: 'doctorId',
  validator: 'IsString',
  message: 'Doctor id must be a string.',
};

export const INVALID_APPOINTMENT_PATIENTID = {
  code: 'INVALID_APPOINTMENT_PATIENTID',
  dto: 'AppointmentDto',
  field: 'patientId',
  validator: 'IsString',
  message: 'Patient id must be a string.',
};

export const INVALID_APPOINTMENT_STATUS = {
  code: 'INVALID_APPOINTMENT_STATUS',
  dto: 'AppointmentDto',
  field: 'status',
  validator: 'IsEnum',
  message:
    'Status must be one of: pending, confirmed, cancelled, completed, or absence.',
};

export const INVALID_APPOINTMENT_PRICE = {
  code: 'INVALID_APPOINTMENT_PRICE',
  dto: 'AppointmentDto',
  field: 'price',
  validator: 'IsNumber',
  message: 'Price must be a valid number.',
};

export const INVALID_INVOICE_ID_ISNOTEMPTY = {
  code: 'INVALID_INVOICE_ID_ISNOTEMPTY',
  dto: 'InvoiceDto',
  field: 'id',
  validator: 'IsNotEmpty',
  message: 'Id is required.',
};

export const INVALID_INVOICE_ID = {
  code: 'INVALID_INVOICE_ID',
  dto: 'InvoiceDto',
  field: 'id',
  validator: 'IsString',
  message: 'Invoice Id must be a string.',
};

export const INVALID_INVOICE_PATIENTID = {
  code: 'INVALID_INVOICE_PATIENTID',
  dto: 'InvoiceDto',
  field: 'patientId',
  validator: 'IsString',
  message: 'Patient id must be a string.',
};

export const INVALID_INVOICE_REFERENCEMONTH = {
  code: 'INVALID_INVOICE_REFERENCEMONTH',
  dto: 'InvoiceDto',
  field: 'referenceMonth',
  validator: 'matches',
  message: 'Reference month must follow YYYY-MM format.',
};

export const INVALID_INVOICE_STATUS = {
  code: 'INVALID_INVOICE_STATUS',
  dto: 'InvoiceDto',
  field: 'status',
  validator: 'IsEnum',
  message: 'Status must be one of: fuck you.',
};

export const INVALID_INVOICE_TXID = {
  code: 'INVALID_INVOICE_TXID',
  dto: 'InvoiceDto',
  field: 'txid',
  validator: 'IsString',
  message: 'Txid must be a string.',
};

export const INVALID_INVOICE_QRCODE = {
  code: 'INVALID_INVOICE_QRCODE',
  dto: 'InvoiceDto',
  field: 'qrCode',
  validator: 'IsString',
  message: 'Qr code must be a string.',
};

export const INVALID_DOCTOR_ID_ISSTRING = {
  code: 'INVALID_DOCTOR_ID_ISSTRING',
  dto: 'DoctorDto',
  field: 'id',
  validator: 'IsString',
  message: 'Id must be a string.',
};

export const INVALID_DOCTOR_ID_ISNOTEMPTY = {
  code: 'INVALID_DOCTOR_ID_ISNOTEMPTY',
  dto: 'DoctorDto',
  field: 'id',
  validator: 'IsNotEmpty',
  message: 'Id is required.',
};

export const INVALID_DOCTOR_NAME_ISSTRING = {
  code: 'INVALID_DOCTOR_NAME_ISSTRING',
  dto: 'DoctorDto',
  field: 'name',
  validator: 'IsString',
  message: 'Name must be a string.',
};

export const INVALID_DOCTOR_NAME_ISNOTEMPTY = {
  code: 'INVALID_DOCTOR_NAME_ISNOTEMPTY',
  dto: 'DoctorDto',
  field: 'name',
  validator: 'IsNotEmpty',
  message: 'Name is required.',
};

export const INVALID_DOCTOR_PHONE_ISSTRING = {
  code: 'INVALID_DOCTOR_PHONE_ISSTRING',
  dto: 'DoctorDto',
  field: 'phone',
  validator: 'IsString',
  message: 'Phone must be a string.',
};

export const INVALID_DOCTOR_PHONE_ISNOTEMPTY = {
  code: 'INVALID_DOCTOR_PHONE_ISNOTEMPTY',
  dto: 'DoctorDto',
  field: 'phone',
  validator: 'IsNotEmpty',
  message: 'Phone is required.',
};

export const INVALID_CREATEDOCTOR_NAME_ISSTRING = {
  code: 'INVALID_CREATEDOCTOR_NAME_ISSTRING',
  dto: 'CreateDoctorDto',
  field: 'name',
  validator: 'IsString',
  message: 'Name must be a string.',
};

export const INVALID_CREATEDOCTOR_NAME_ISNOTEMPTY = {
  code: 'INVALID_CREATEDOCTOR_NAME_ISNOTEMPTY',
  dto: 'CreateDoctorDto',
  field: 'name',
  validator: 'IsNotEmpty',
  message: 'Name is required.',
};

export const INVALID_CREATEDOCTOR_PHONE_ISSTRING = {
  code: 'INVALID_CREATEDOCTOR_PHONE_ISSTRING',
  dto: 'CreateDoctorDto',
  field: 'phone',
  validator: 'IsString',
  message: 'Phone must be a string.',
};

export const INVALID_CREATEDOCTOR_PHONE_ISNOTEMPTY = {
  code: 'INVALID_CREATEDOCTOR_PHONE_ISNOTEMPTY',
  dto: 'CreateDoctorDto',
  field: 'phone',
  validator: 'IsNotEmpty',
  message: 'Phone is required.',
};
