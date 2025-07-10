applyFirebaseMock(); // Must come first before any Firebase-using imports

import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from '../../src/doctor/doctor.service';
import { CreateDoctorDto } from '../../src/doctor/dto/doctor-dto';
import {
  CreateDoctorMock,
  DoctorMock,
  UpdateDoctorMock,
} from '../mocks/factories/doctor.factory';
import {
  applyFirebaseMock,
  mockCollection,
  mockSet,
} from '../mocks/firebase.mock';

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [DoctorService],
    }).compile();

    service = moduleRef.get<DoctorService>(DoctorService);
  });

  // CREATE (success)
  it('should create successfully', async () => {
    const input: CreateDoctorDto = CreateDoctorMock();
    const result = await service.create(input);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id', 'mock-id');
    expect(result).toMatchObject(input);
    expect(new Date(result.datetime).toISOString()).toBe(
      input.datetime.toISOString(),
    );

    expect(mockCollection.doc).toHaveBeenCalledTimes(1);
    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({ ...input, id: 'mock-id' }),
    );
  });

  // CREATE (fail)
  it('should throw if Firestore fails on create', async () => {
    const input: CreateDoctorDto = CreateDoctorMock();
    mockSet.mockRejectedValueOnce(new Error('Firestore failure'));

    await expect(service.create(input)).rejects.toThrow('Firestore failure');
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  // FIND ONE (success)
  it('should return an doctor by ID', async () => {
    const target = DoctorMock();

    (mockCollection.doc as any) = jest.fn(() => ({
      get: jest.fn().mockResolvedValue({
        exists: true,
        data: () => target,
      }),
    }));

    const result = await service.findOne(target.id);
    expect(result).toEqual(target);
    expect(mockCollection.doc).toHaveBeenCalledWith(target.id);
  });

  // FIND ONE (fail)
  it('should throw if doctor is not found', async () => {
    const mockGet = jest.fn().mockResolvedValue({ exists: false });
    (mockCollection.doc as any) = jest.fn(() => ({ get: mockGet }));

    await expect(service.findOne('not-found')).rejects.toThrow(
      'Doctor not found',
    );
    expect(mockCollection.doc).toHaveBeenCalledWith('not-found');
  });

  // FIND ALL (success)
  it('should return all doctors', async () => {
    const doctors = [DoctorMock(), DoctorMock()];

    (mockCollection as any).get = jest.fn().mockResolvedValue({
      docs: doctors.map((a) => ({
        id: a.id,
        data: () => a,
      })),
    });

    const result = await service.findAll();
    expect(result).toEqual(doctors);
    expect(mockCollection.get).toHaveBeenCalledTimes(1);
  });

  // FIND ALL (fail)
  it('should throw if fetching doctors fails', async () => {
    const getMock = jest
      .fn()
      .mockRejectedValueOnce(new Error('Firestore error'));
    (service as any).collection = { get: getMock };

    await expect(service.findAll()).rejects.toThrow('Firestore error');
    expect(getMock).toHaveBeenCalled();
  });

  it('should throw if fetching doctors fails', async () => {
    (service.findAll as jest.Mock).mockRejectedValueOnce(
      new Error('fetch failed'),
    );
    await expect(controller.findAll()).rejects.toThrow('fetch failed');
  });

  // UPDATE (success)
  it('should update an doctor successfully', async () => {
    const mockUpdate = jest.fn().mockResolvedValue(undefined);
    (mockCollection.doc as any) = jest.fn(() => ({ update: mockUpdate }));

    const dto = UpdateDoctorMock();
    await expect(service.update('some-id', dto)).resolves.toBeUndefined();
    expect(mockUpdate).toHaveBeenCalledWith(dto);
    expect(mockCollection.doc).toHaveBeenCalledWith('some-id');
  });

  // UPDATE (fail)
  it('should throw if update fails', async () => {
    const mockUpdate = jest
      .fn()
      .mockRejectedValue(new Error('Firestore failure'));
    (mockCollection.doc as any) = jest.fn(() => ({ update: mockUpdate }));

    await expect(service.update('some-id', UpdateDoctorMock())).rejects.toThrow(
      'Firestore failure',
    );
    expect(mockCollection.doc).toHaveBeenCalledWith('some-id');
  });

  // DELETE (success)
  it('should delete an doctor by ID', async () => {
    const mockDelete = jest.fn().mockResolvedValue(undefined);
    (mockCollection.doc as any) = jest.fn(() => ({ delete: mockDelete }));

    await expect(service.delete('123')).resolves.toBeUndefined();
    expect(mockCollection.doc).toHaveBeenCalledWith('123');
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  // DELETE (fail)
  it('should throw if delete fails', async () => {
    const mockDelete = jest.fn().mockRejectedValue(new Error('Delete failed'));
    (mockCollection.doc as any) = jest.fn(() => ({ delete: mockDelete }));

    await expect(service.delete('fail-id')).rejects.toThrow('Delete failed');
    expect(mockCollection.doc).toHaveBeenCalledWith('fail-id');
  });
});
