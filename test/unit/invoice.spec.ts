import { TestingModule, Test } from '@nestjs/testing';
import { CreateInvoiceDto } from '../../src/invoice/dto/invoice.dto';
import { InvoiceService } from '../../src/invoice/invoice.service';
import {
  CreateInvoiceMock,
  InvoiceMock,
  UpdateInvoiceMock,
} from '../mocks/factories/invoice.factory';
import { mockCollection, mockSet } from '../mocks/firebase.mock';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [InvoiceService],
    }).compile();

    service = moduleRef.get<InvoiceService>(InvoiceService);
  });

  // CREATE (success)
  it('should create successfully', async () => {
    const input: CreateInvoiceDto = CreateInvoiceMock();
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
    const input: CreateInvoiceDto = CreateInvoiceMock();
    mockSet.mockRejectedValueOnce(new Error('Firestore failure'));

    await expect(service.create(input)).rejects.toThrow('Firestore failure');
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  // FIND ONE (success)
  it('should return an invoice by ID', async () => {
    const target = InvoiceMock();

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
  it('should throw if invoice is not found', async () => {
    const mockGet = jest.fn().mockResolvedValue({ exists: false });
    (mockCollection.doc as any) = jest.fn(() => ({ get: mockGet }));

    await expect(service.findOne('not-found')).rejects.toThrow(
      'Invoice not found',
    );
    expect(mockCollection.doc).toHaveBeenCalledWith('not-found');
  });

  // FIND ALL (success)
  it('should return all invoices', async () => {
    const invoices = [InvoiceMock(), InvoiceMock()];

    (mockCollection as any).get = jest.fn().mockResolvedValue({
      docs: invoices.map((a) => ({
        id: a.id,
        data: () => a,
      })),
    });

    const result = await service.findAll();
    expect(result).toEqual(invoices);
    expect(mockCollection.get).toHaveBeenCalledTimes(1);
  });

  // FIND ALL (fail)
  it('should throw if fetching invoices fails', async () => {
    const getMock = jest
      .fn()
      .mockRejectedValueOnce(new Error('Firestore error'));
    (service as any).collection = { get: getMock };

    await expect(service.findAll()).rejects.toThrow('Firestore error');
    expect(getMock).toHaveBeenCalled();
  });

  // UPDATE (success)
  it('should update an invoice successfully', async () => {
    const mockUpdate = jest.fn().mockResolvedValue(undefined);
    (mockCollection.doc as any) = jest.fn(() => ({ update: mockUpdate }));

    const dto = UpdateInvoiceMock();
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

    await expect(
      service.update('some-id', UpdateInvoiceMock()),
    ).rejects.toThrow('Firestore failure');
    expect(mockCollection.doc).toHaveBeenCalledWith('some-id');
  });

  // DELETE (success)
  it('should delete an invoice by ID', async () => {
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
