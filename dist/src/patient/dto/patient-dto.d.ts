export declare class PatientDto {
    id: string;
    name: string;
    phone: string;
    doctorId: string;
}
declare const CreatePatientDto_base: import("@nestjs/mapped-types").MappedType<Omit<PatientDto, "id">>;
export declare class CreatePatientDto extends CreatePatientDto_base {
}
declare const UpdatePatientDto_base: import("@nestjs/mapped-types").MappedType<Partial<PatientDto>>;
export declare class UpdatePatientDto extends UpdatePatientDto_base {
}
export {};
