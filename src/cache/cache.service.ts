import { Injectable } from '@nestjs/common';
import { db } from '../../firebase.admin'; // ✅ use standard export

export interface CachedPatient {
  patientId: string;
  name: string;
  phone: string;
}

@Injectable()
export class CacheService {
  private readonly db = db;

  /**
   * Creates or updates a patient record in the doctor's cache
   */
  async updateCachedPatient(
    doctorId: string,
    patient: CachedPatient,
  ): Promise<void> {
    const ref = this.db
      .collection('cache')
      .doc(`${doctorId}`)
      .collection('patients')
      .doc(patient.patientId);

    await ref.set(patient, { merge: true });
  }

  /**
   * Removes a patient from the doctor's cache
   */
  async deleteCachedPatient(
    doctorId: string,
    patientId: string,
  ): Promise<void> {
    const ref = this.db
      .collection('cache')
      .doc(`patients_${doctorId}`)
      .collection('patients')
      .doc(patientId);

    await ref.delete();
  }
}
