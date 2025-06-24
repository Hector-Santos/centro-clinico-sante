import { CreateDoctorDto, DoctorDto, UpdateDoctorDto } from './dto/doctor-dto';
import { DoctorService } from './doctor.service';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    create(dto: CreateDoctorDto): Promise<DoctorDto>;
    findAll(): Promise<DoctorDto[]>;
    findOne(id: string): Promise<DoctorDto>;
    update(id: string, dto: UpdateDoctorDto): Promise<DoctorDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
