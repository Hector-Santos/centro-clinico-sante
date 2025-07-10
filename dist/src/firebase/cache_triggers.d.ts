import * as functions from 'firebase-functions';
export declare const onPatientCreate: functions.CloudFunction<functions.firestore.QueryDocumentSnapshot>;
export declare const onPatientUpdate: functions.CloudFunction<functions.Change<functions.firestore.QueryDocumentSnapshot>>;
export declare const onPatientDelete: functions.CloudFunction<functions.firestore.QueryDocumentSnapshot>;
