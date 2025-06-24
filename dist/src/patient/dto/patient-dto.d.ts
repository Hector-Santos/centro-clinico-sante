export declare class PatientDto {
    id: string;
    name: string;
    phone: string;
    doctorId: string;
}
export declare class CreatePatientDto {
    name: string;
    phone: string;
}
declare const UpdatePatientDto_base: import("@nestjs/mapped-types").MappedType<Partial<PatientDto>>;
export declare class UpdatePatientDto extends UpdatePatientDto_base {
}
export {};
