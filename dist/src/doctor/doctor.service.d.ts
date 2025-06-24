import { CreateDoctorDto, DoctorDto, UpdateDoctorDto } from './dto/doctor-dto';
export declare class DoctorService {
    private collection;
    create(dto: CreateDoctorDto): Promise<DoctorDto>;
    findAll(): Promise<DoctorDto[]>;
    findOne(id: string): Promise<DoctorDto | null>;
    update(id: string, dto: UpdateDoctorDto): Promise<DoctorDto | null>;
    remove(id: string): Promise<boolean>;
}
