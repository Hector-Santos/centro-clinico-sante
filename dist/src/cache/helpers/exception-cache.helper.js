"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionCacheHelper = void 0;
const firebase_admin_1 = require("../../../firebase.admin");
class ExceptionCacheHelper {
    static async getStructuredSortedExceptions(doctorId, direction = 'desc') {
        const ref = firebase_admin_1.db
            .collection('cache')
            .doc(`${doctorId}`)
            .collection('exceptions');
        const snapshot = await ref.get();
        const exceptions = snapshot.docs.map((doc) => {
            const data = doc.data();
            data.createdAt = new Date(data.createdAt);
            return data;
        });
        const sortFn = (a, b) => direction === 'asc'
            ? a.createdAt.getTime() - b.createdAt.getTime()
            : b.createdAt.getTime() - a.createdAt.getTime();
        const mapped = exceptions.map((ex) => {
            if (ex.patientId && ex.originalBooking) {
                return {
                    type: 'booked',
                    original: ex.originalBooking,
                    updated: ex.newBooking || null,
                    full: ex,
                };
            }
            else if (ex.originalDays?.length) {
                return {
                    type: 'day',
                    original: ex.originalDays,
                    updated: ex.NewDays || null,
                    full: ex,
                };
            }
            else if (ex.originalHours?.length) {
                return {
                    type: 'hour',
                    original: ex.originalHours,
                    updated: ex.newHours || null,
                    full: ex,
                };
            }
            else {
                throw new Error(`Unrecognized exception format for ID: ${ex.id}`);
            }
        });
        const byType = {
            booked: [],
            day: [],
            hour: [],
        };
        for (const item of mapped) {
            byType[item.type].push(item);
        }
        Object.values(byType).forEach((group) => group.sort((a, b) => sortFn(a.full, b.full)));
        return [...byType.booked, ...byType.day, ...byType.hour];
    }
}
exports.ExceptionCacheHelper = ExceptionCacheHelper;
//# sourceMappingURL=exception-cache.helper.js.map