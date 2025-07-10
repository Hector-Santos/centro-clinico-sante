export interface CachedPatient {
    patientId: string;
    name: string;
    phone: string;
}
export declare class CacheService {
    private readonly db;
    updateCachedPatient(doctorId: string, patient: CachedPatient): Promise<void>;
    deleteCachedPatient(doctorId: string, patientId: string): Promise<void>;
}
