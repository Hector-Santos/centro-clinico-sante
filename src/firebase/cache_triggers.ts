import * as functions from 'firebase-functions';
import { createNestApp } from '../bootstrap';
import { CacheService } from '../cache/cache.service';

/**
 * Trigger: when a patient document is created
 * Action: add the patient to the doctor's cached patient list
 */
export const onPatientCreate = functions.firestore
  .document('patients/{patientId}')
  .onCreate(async (snap) => {
    const app = await createNestApp();
    try {
      const cacheService = app.get(CacheService);
      const data = snap.data();
      const doctorId = data.doctorId;

      await cacheService.updateCachedPatient(doctorId, {
        patientId: snap.id,
        name: data.name,
        phone: data.phone,
      });

      console.log(
        `✅ Patient ${snap.id} added to cache for doctor ${doctorId}`,
      );
    } catch (error) {
      console.error(`[onPatientCreate] ❌ Error:`, error);
    } finally {
      await app.close();
    }
  });

/**
 * Trigger: when a patient document is updated
 * Action: update the patient info in the doctor's cache
 */
export const onPatientUpdate = functions.firestore
  .document('patients/{patientId}')
  .onUpdate(async (change) => {
    const app = await createNestApp();
    try {
      const cacheService = app.get(CacheService);
      const newData = change.after.data();
      const doctorId = newData.doctorId;

      await cacheService.updateCachedPatient(doctorId, {
        patientId: change.after.id,
        name: newData.name,
        phone: newData.phone,
      });

      console.log(
        `♻️ Patient ${change.after.id} updated in cache for doctor ${doctorId}`,
      );
    } catch (error) {
      console.error(`[onPatientUpdate] ❌ Error:`, error);
    } finally {
      await app.close();
    }
  });

/**
 * Trigger: when a patient document is deleted
 * Action: remove the patient from the doctor's cached patient list
 */
export const onPatientDelete = functions.firestore
  .document('patients/{patientId}')
  .onDelete(async (snap) => {
    const app = await createNestApp();
    try {
      const cacheService = app.get(CacheService);
      const data = snap.data();
      const doctorId = data.doctorId;

      await cacheService.deleteCachedPatient(doctorId, snap.id);

      console.log(
        `❌ Patient ${snap.id} removed from cache for doctor ${doctorId}`,
      );
    } catch (error) {
      console.error(`[onPatientDelete] ❌ Error:`, error);
    } finally {
      await app.close();
    }
  });
