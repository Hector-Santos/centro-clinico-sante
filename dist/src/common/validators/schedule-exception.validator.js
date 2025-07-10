"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateScheduleException = validateScheduleException;
const common_1 = require("@nestjs/common");
function validateScheduleException(exception) {
    const { patientId, originalBooking, newBooking, originalDays, NewDays, originalHours, newHours, } = exception;
    const hasBookingGroup = !!(patientId && originalBooking && newBooking);
    const hasDaysGroup = !!(originalDays && NewDays);
    const hasHoursGroup = !!(originalHours && newHours);
    const selectedGroups = [hasBookingGroup, hasDaysGroup, hasHoursGroup].filter(Boolean).length;
    if (selectedGroups === 0) {
        throw new common_1.BadRequestException('You must provide exactly one exception group: either booking, days, or hours.');
    }
    if (selectedGroups > 1) {
        throw new common_1.BadRequestException('Only one exception group is allowed: do not mix booking, days, or hours.');
    }
    if ((patientId || originalBooking || newBooking) && !hasBookingGroup) {
        throw new common_1.BadRequestException('Booking exception must include all three: patientId, originalBooking, and newBooking.');
    }
    if ((originalDays && !NewDays) || (!originalDays && NewDays)) {
        throw new common_1.BadRequestException('Both originalDays and NewDays must be provided together.');
    }
    if ((originalHours && !newHours) || (!originalHours && newHours)) {
        throw new common_1.BadRequestException('Both originalHours and newHours must be provided together.');
    }
}
//# sourceMappingURL=schedule-exception.validator.js.map