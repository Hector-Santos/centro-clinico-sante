import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/patient-dto';
import { UpdatePatientDto } from './dto/patient-dto';
import { PatientDto } from './dto/patient-dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(data: CreatePatientDto): Promise<PatientDto>;
    findAllPatients(): Promise<PatientDto[]>;
    findPatientById(id: string): Promise<PatientDto | null>;
    updatePatient(id: string, data: UpdatePatientDto): Promise<PatientDto | null>;
    deletePatient(id: string): Promise<boolean>;
}
