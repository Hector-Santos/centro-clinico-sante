// src/schedule/validators/schedule-exception-consistency.ts

import { ScheduleExceptionDto } from 'src/schedule/dto/schedule.dto';
import { BadRequestException } from '@nestjs/common';

export function validateScheduleException(
  exception: ScheduleExceptionDto,
): void {
  const {
    patientId,
    originalBooking,
    newBooking,
    originalDays,
    NewDays,
    originalHours,
    newHours,
  } = exception;

  const hasBookingGroup = !!(patientId && originalBooking && newBooking);
  const hasDaysGroup = !!(originalDays && NewDays);
  const hasHoursGroup = !!(originalHours && newHours);

  const selectedGroups = [hasBookingGroup, hasDaysGroup, hasHoursGroup].filter(
    Boolean,
  ).length;

  if (selectedGroups === 0) {
    throw new BadRequestException(
      'You must provide exactly one exception group: either booking, days, or hours.',
    );
  }

  if (selectedGroups > 1) {
    throw new BadRequestException(
      'Only one exception group is allowed: do not mix booking, days, or hours.',
    );
  }

  if ((patientId || originalBooking || newBooking) && !hasBookingGroup) {
    throw new BadRequestException(
      'Booking exception must include all three: patientId, originalBooking, and newBooking.',
    );
  }

  if ((originalDays && !NewDays) || (!originalDays && NewDays)) {
    throw new BadRequestException(
      'Both originalDays and NewDays must be provided together.',
    );
  }

  if ((originalHours && !newHours) || (!originalHours && newHours)) {
    throw new BadRequestException(
      'Both originalHours and newHours must be provided together.',
    );
  }
}
