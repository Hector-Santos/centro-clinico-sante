"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPatientDelete = exports.onPatientUpdate = exports.onPatientCreate = void 0;
const functions = __importStar(require("firebase-functions"));
const bootstrap_1 = require("../bootstrap");
const cache_service_1 = require("../cache/cache.service");
exports.onPatientCreate = functions.firestore
    .document('patients/{patientId}')
    .onCreate(async (snap) => {
    const app = await (0, bootstrap_1.createNestApp)();
    try {
        const cacheService = app.get(cache_service_1.CacheService);
        const data = snap.data();
        const doctorId = data.doctorId;
        await cacheService.updateCachedPatient(doctorId, {
            patientId: snap.id,
            name: data.name,
            phone: data.phone,
        });
        console.log(`✅ Patient ${snap.id} added to cache for doctor ${doctorId}`);
    }
    catch (error) {
        console.error(`[onPatientCreate] ❌ Error:`, error);
    }
    finally {
        await app.close();
    }
});
exports.onPatientUpdate = functions.firestore
    .document('patients/{patientId}')
    .onUpdate(async (change) => {
    const app = await (0, bootstrap_1.createNestApp)();
    try {
        const cacheService = app.get(cache_service_1.CacheService);
        const newData = change.after.data();
        const doctorId = newData.doctorId;
        await cacheService.updateCachedPatient(doctorId, {
            patientId: change.after.id,
            name: newData.name,
            phone: newData.phone,
        });
        console.log(`♻️ Patient ${change.after.id} updated in cache for doctor ${doctorId}`);
    }
    catch (error) {
        console.error(`[onPatientUpdate] ❌ Error:`, error);
    }
    finally {
        await app.close();
    }
});
exports.onPatientDelete = functions.firestore
    .document('patients/{patientId}')
    .onDelete(async (snap) => {
    const app = await (0, bootstrap_1.createNestApp)();
    try {
        const cacheService = app.get(cache_service_1.CacheService);
        const data = snap.data();
        const doctorId = data.doctorId;
        await cacheService.deleteCachedPatient(doctorId, snap.id);
        console.log(`❌ Patient ${snap.id} removed from cache for doctor ${doctorId}`);
    }
    catch (error) {
        console.error(`[onPatientDelete] ❌ Error:`, error);
    }
    finally {
        await app.close();
    }
});
//# sourceMappingURL=cache_triggers.js.map