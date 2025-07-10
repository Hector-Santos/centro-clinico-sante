export declare class DoctorDto {
    id: string;
    name: string;
    phone: string;
}
declare const CreateDoctorDto_base: import("@nestjs/mapped-types").MappedType<Omit<DoctorDto, "id">>;
export declare class CreateDoctorDto extends CreateDoctorDto_base {
}
declare const UpdateDoctorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDoctorDto>>;
export declare class UpdateDoctorDto extends UpdateDoctorDto_base {
}
export {};
