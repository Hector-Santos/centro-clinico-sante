"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleAvailabilityHelper = void 0;
const firebase_admin_1 = require("../../firebase.admin");
const date_fns_1 = require("date-fns");
class ScheduleAvailabilityHelper {
    static async getWeeklyAvailability(doctorId, targetDays) {
        const scheduleRef = firebase_admin_1.db.collection('schedules').doc(doctorId);
        const scheduleSnap = await scheduleRef.get();
        if (!scheduleSnap.exists)
            throw new Error('Schedule not found');
        const schedule = scheduleSnap.data();
        let weekly = schedule.weeklyAvailability || [];
        if (targetDays?.length) {
            const targetSet = new Set(targetDays);
            weekly = weekly.filter((d) => targetSet.has(d.day));
        }
        const exceptions = schedule.exceptions || [];
        const booked = schedule.booked || [];
        const excludedDays = new Set();
        const blockedHourMap = new Map();
        for (const ex of exceptions) {
            ex.originalDays?.forEach((d) => excludedDays.add(d.day));
            ex.originalHours?.forEach((h) => {
                const range = `${h.start}-${h.end}`;
                const set = blockedHourMap.get(h.day) || new Set();
                set.add(range);
                blockedHourMap.set(h.day, set);
            });
        }
        booked.forEach((b) => {
            const range = `${b.start}-${b.end}`;
            const set = blockedHourMap.get(b.day) || new Set();
            set.add(range);
            blockedHourMap.set(b.day, set);
        });
        const available = weekly
            .filter((w) => !excludedDays.has(w.day))
            .map((w) => {
            const blocked = blockedHourMap.get(w.day);
            if (!blocked)
                return w;
            const hourRanges = w.hourRanges.filter((hr) => {
                const key = `${hr.start}-${hr.end}`;
                return !blocked.has(key);
            });
            return { ...w, hourRanges };
        });
        return available;
    }
    static async getTodayAvailability(doctorId) {
        const today = (0, date_fns_1.getDay)(new Date());
        return this.getWeeklyAvailability(doctorId, [today]);
    }
    static async getSelectedDaysAvailability(doctorId, days) {
        return this.getWeeklyAvailability(doctorId, days);
    }
    static async getFullWeekAvailability(doctorId) {
        return this.getWeeklyAvailability(doctorId);
    }
}
exports.ScheduleAvailabilityHelper = ScheduleAvailabilityHelper;
//# sourceMappingURL=Schedule-availability.helper.js.map