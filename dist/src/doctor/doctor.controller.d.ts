import { DoctorService } from './doctor.service';
import { CreateDoctorDto, DoctorDto, UpdateDoctorDto } from './dto/doctor-dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    create(doctor: CreateDoctorDto): Promise<DoctorDto>;
    findAll(): Promise<DoctorDto[]>;
    findOne(id: string): Promise<DoctorDto>;
    update(id: string, doctor: UpdateDoctorDto): Promise<void>;
    remove(id: string): Promise<void>;
}
