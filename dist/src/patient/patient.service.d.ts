import { CreatePatientDto, PatientDto, UpdatePatientDto } from './dto/patient-dto';
export declare class PatientService {
    private collection;
    create(dto: CreatePatientDto): Promise<PatientDto>;
    findAll(): Promise<PatientDto[]>;
    findOne(id: string): Promise<PatientDto | null>;
    update(id: string, dto: UpdatePatientDto): Promise<PatientDto | null>;
    remove(id: string): Promise<boolean>;
}
