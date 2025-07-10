"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(0, firebase_mock_1.applyFirebaseMock)();
const testing_1 = require("@nestjs/testing");
const appointment_service_1 = require("../../src/appointments/appointment.service");
const appointment_factory_1 = require("../mocks/factories/appointment.factory");
const firebase_mock_1 = require("../mocks/firebase.mock");
describe('AppointmentService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [appointment_service_1.AppointmentService],
        }).compile();
        service = moduleRef.get(appointment_service_1.AppointmentService);
    });
    it('should create successfully', async () => {
        const input = (0, appointment_factory_1.CreateAppointmentMock)();
        const result = await service.create(input);
        expect(result).toBeDefined();
        expect(result).toHaveProperty('id', 'mock-id');
        expect(result).toMatchObject(input);
        expect(new Date(result.datetime).toISOString()).toBe(input.datetime.toISOString());
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledTimes(1);
        expect(firebase_mock_1.mockSet).toHaveBeenCalledWith(expect.objectContaining({ ...input, id: 'mock-id' }));
    });
    it('should throw if Firestore fails on create', async () => {
        const input = (0, appointment_factory_1.CreateAppointmentMock)();
        firebase_mock_1.mockSet.mockRejectedValueOnce(new Error('Firestore failure'));
        await expect(service.create(input)).rejects.toThrow('Firestore failure');
        expect(firebase_mock_1.mockSet).toHaveBeenCalledTimes(1);
    });
    it('should return an appointment by ID', async () => {
        const target = (0, appointment_factory_1.AppointmentMock)();
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({
            get: jest.fn().mockResolvedValue({
                exists: true,
                data: () => target,
            }),
        }));
        const result = await service.findOne(target.id);
        expect(result).toEqual(target);
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith(target.id);
    });
    it('should throw if appointment is not found', async () => {
        const mockGet = jest.fn().mockResolvedValue({ exists: false });
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({ get: mockGet }));
        await expect(service.findOne('not-found')).rejects.toThrow('Appointment not found');
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith('not-found');
    });
    it('should return all appointments', async () => {
        const appointments = [(0, appointment_factory_1.AppointmentMock)(), (0, appointment_factory_1.AppointmentMock)()];
        firebase_mock_1.mockCollection.get = jest.fn().mockResolvedValue({
            docs: appointments.map((a) => ({
                id: a.id,
                data: () => a,
            })),
        });
        const result = await service.findAll();
        expect(result).toEqual(appointments);
        expect(firebase_mock_1.mockCollection.get).toHaveBeenCalledTimes(1);
    });
    it('should throw if fetching appointments fails', async () => {
        const getMock = jest
            .fn()
            .mockRejectedValueOnce(new Error('Firestore error'));
        service.collection = { get: getMock };
        await expect(service.findAll()).rejects.toThrow('Firestore error');
        expect(getMock).toHaveBeenCalled();
    });
    it('should update an appointment successfully', async () => {
        const mockUpdate = jest.fn().mockResolvedValue(undefined);
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({ update: mockUpdate }));
        const dto = (0, appointment_factory_1.UpdateAppointmentMock)();
        await expect(service.update('some-id', dto)).resolves.toBeUndefined();
        expect(mockUpdate).toHaveBeenCalledWith(dto);
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith('some-id');
    });
    it('should throw if update fails', async () => {
        const mockUpdate = jest
            .fn()
            .mockRejectedValue(new Error('Firestore failure'));
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({ update: mockUpdate }));
        await expect(service.update('some-id', (0, appointment_factory_1.UpdateAppointmentMock)())).rejects.toThrow('Firestore failure');
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith('some-id');
    });
    it('should delete an appointment by ID', async () => {
        const mockDelete = jest.fn().mockResolvedValue(undefined);
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({ delete: mockDelete }));
        await expect(service.delete('123')).resolves.toBeUndefined();
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith('123');
        expect(mockDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw if delete fails', async () => {
        const mockDelete = jest.fn().mockRejectedValue(new Error('Delete failed'));
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({ delete: mockDelete }));
        await expect(service.delete('fail-id')).rejects.toThrow('Delete failed');
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith('fail-id');
    });
});
//# sourceMappingURL=appointment.spec.js.map