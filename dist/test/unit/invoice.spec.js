"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const invoice_service_1 = require("../../src/invoice/invoice.service");
const invoice_factory_1 = require("../mocks/factories/invoice.factory");
const firebase_mock_1 = require("../mocks/firebase.mock");
describe('InvoiceService', () => {
    let service;
    beforeEach(async () => {
        jest.clearAllMocks();
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [invoice_service_1.InvoiceService],
        }).compile();
        service = moduleRef.get(invoice_service_1.InvoiceService);
    });
    it('should create successfully', async () => {
        const input = (0, invoice_factory_1.CreateInvoiceMock)();
        const result = await service.create(input);
        expect(result).toBeDefined();
        expect(result).toHaveProperty('id', 'mock-id');
        expect(result).toMatchObject(input);
        expect(new Date(result.datetime).toISOString()).toBe(input.datetime.toISOString());
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledTimes(1);
        expect(firebase_mock_1.mockSet).toHaveBeenCalledWith(expect.objectContaining({ ...input, id: 'mock-id' }));
    });
    it('should throw if Firestore fails on create', async () => {
        const input = (0, invoice_factory_1.CreateInvoiceMock)();
        firebase_mock_1.mockSet.mockRejectedValueOnce(new Error('Firestore failure'));
        await expect(service.create(input)).rejects.toThrow('Firestore failure');
        expect(firebase_mock_1.mockSet).toHaveBeenCalledTimes(1);
    });
    it('should return an invoice by ID', async () => {
        const target = (0, invoice_factory_1.InvoiceMock)();
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
    it('should throw if invoice is not found', async () => {
        const mockGet = jest.fn().mockResolvedValue({ exists: false });
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({ get: mockGet }));
        await expect(service.findOne('not-found')).rejects.toThrow('Invoice not found');
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith('not-found');
    });
    it('should return all invoices', async () => {
        const invoices = [(0, invoice_factory_1.InvoiceMock)(), (0, invoice_factory_1.InvoiceMock)()];
        firebase_mock_1.mockCollection.get = jest.fn().mockResolvedValue({
            docs: invoices.map((a) => ({
                id: a.id,
                data: () => a,
            })),
        });
        const result = await service.findAll();
        expect(result).toEqual(invoices);
        expect(firebase_mock_1.mockCollection.get).toHaveBeenCalledTimes(1);
    });
    it('should throw if fetching invoices fails', async () => {
        const getMock = jest
            .fn()
            .mockRejectedValueOnce(new Error('Firestore error'));
        service.collection = { get: getMock };
        await expect(service.findAll()).rejects.toThrow('Firestore error');
        expect(getMock).toHaveBeenCalled();
    });
    it('should update an invoice successfully', async () => {
        const mockUpdate = jest.fn().mockResolvedValue(undefined);
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({ update: mockUpdate }));
        const dto = (0, invoice_factory_1.UpdateInvoiceMock)();
        await expect(service.update('some-id', dto)).resolves.toBeUndefined();
        expect(mockUpdate).toHaveBeenCalledWith(dto);
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith('some-id');
    });
    it('should throw if update fails', async () => {
        const mockUpdate = jest
            .fn()
            .mockRejectedValue(new Error('Firestore failure'));
        firebase_mock_1.mockCollection.doc = jest.fn(() => ({ update: mockUpdate }));
        await expect(service.update('some-id', (0, invoice_factory_1.UpdateInvoiceMock)())).rejects.toThrow('Firestore failure');
        expect(firebase_mock_1.mockCollection.doc).toHaveBeenCalledWith('some-id');
    });
    it('should delete an invoice by ID', async () => {
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
//# sourceMappingURL=invoice.spec.js.map