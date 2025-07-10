import { CreateDoctorDto, DoctorDto, UpdateDoctorDto } from './dto/doctor-dto';
export declare class DoctorService {
    private collection;
    create(data: CreateDoctorDto): Promise<DoctorDto>;
    findAll(): Promise<DoctorDto[]>;
    findOne(id: string): Promise<DoctorDto>;
    update(id: string, doctor: UpdateDoctorDto): Promise<void>;
    delete(id: string): Promise<void>;
}
