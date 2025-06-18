export type TimeSwap = {
  from: string;
  to: string;
};

export type WeeklySchedule = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export type ScheduleException = {
  id: string;
  doctorId: string;
  originalDate: Date;
  newDate?: Date;
  newTimes?: string[] | TimeSwap[];
};

export type Doctor = {
  id: string;
  name: string;
  phone: string;
  weeklySchedule: WeeklySchedule;
};

export type Patient = {
  id: string;
  name: string;
  phone: string;
};

export type appointment = {
  id: string;
  doctorId: string;
  patientId: string;
  datetime: Date;
  status: 'pending' | 'confirmed' |'cancelled' | 'completed';
  price: number;
};

export type Invoice = {
  id: string;
  patientId: string;
  status: 'pending' | 'paid' | 'overdue';
  createdAt: Date;
  dueDate: Date;
  txid: string;
  qrCode: string;
  paidAt: Date | null;
};
