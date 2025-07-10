import { CreatePatientDto } from './dto/patient-dto';
import { UpdatePatientDto } from './dto/patient-dto';
import { PatientDto } from './dto/patient-dto';
import { PatientService } from './patient.service';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(patient: CreatePatientDto): Promise<PatientDto>;
    findAllPatients(): Promise<PatientDto[]>;
    findPatientById(id: string): Promise<PatientDto>;
    updatePatient(id: string, patient: UpdatePatientDto): Promise<void>;
    deletePatient(id: string): Promise<void>;
}
