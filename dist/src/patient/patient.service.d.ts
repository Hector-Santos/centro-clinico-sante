import { CreatePatientDto, PatientDto, UpdatePatientDto } from './dto/patient-dto';
export declare class PatientService {
    private collection;
    create(patientData: CreatePatientDto): Promise<PatientDto>;
    findAll(): Promise<PatientDto[]>;
    findOne(id: string): Promise<PatientDto>;
    update(id: string, patient: UpdatePatientDto): Promise<void>;
    remove(id: string): Promise<void>;
}
