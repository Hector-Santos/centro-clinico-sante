export declare class DoctorDto {
    id: string;
    name: string;
    phone: string;
}
export declare class CreateDoctorDto {
    name: string;
    phone: string;
}
declare const UpdateDoctorDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDoctorDto>>;
export declare class UpdateDoctorDto extends UpdateDoctorDto_base {
}
export {};
