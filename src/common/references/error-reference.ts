/* Auto-generated error reference file */

export const INVALID_PATIENT_NAME_FORMAT = {
  code: 'INVALID_PATIENT_NAME_FORMAT',
  dto: 'PatientDto',
  field: 'name',
  validator: 'isString',
  message: 'Patient name must be a string.',
};

export const INVALID_DOCTOR_NAME_FORMAT = {
  code: 'INVALID_DOCTOR_NAME_FORMAT',
  dto: 'DoctorDto',
  field: 'name',
  validator: 'isString',
  message: 'Doctor name must be a string.',
};

export const INVALID_REFERENCE_MONTH_FORMAT = {
  code: 'INVALID_REFERENCE_MONTH_FORMAT',
  dto: 'InvoiceDto',
  field: 'referenceMonth',
  validator: 'matches',
  message: 'Reference month must follow YYYY-MM format.',
};

export const INVALID_STATUS_DATA = {
  code: 'INVALID_STATUS_DATA',
  dto: 'AppointmentDto',
  field: 'status',
  validator: 'isEnum',
  message:
    'Status must be one of: pending, confirmed, cancelled, completed, absence.',
};

export const INVALID_PRICE_FORMAT = {
  code: 'INVALID_PRICE_FORMAT',
  dto: 'AppointmentDto',
  field: 'price',
  validator: 'isNumber',
  message: 'Price must be a valid number.',
};

export const INVALID_QRCODE_FORMAT = {
  code: 'INVALID_QRCODE_FORMAT',
  dto: 'InvoiceDto',
  field: 'qrCode',
  validator: 'isString',
  message: 'QR code must be a string.',
};

export const INVALID_DOCTOR_PHONE_FORMAT = {
  code: 'INVALID_DOCTOR_PHONE_FORMAT',
  dto: 'DoctorDto',
  field: 'phone',
  validator: 'isString',
  message: 'Doctor phone must be a string.',
};

export const INVALID_PATIENT_PHONE_FORMAT = {
  code: 'INVALID_PATIENT_PHONE_FORMAT',
  dto: 'PatientDto',
  field: 'phone',
  validator: 'isString',
  message: 'Patient phone must be a string.',
};
