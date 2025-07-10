"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFirebaseMock = exports.mockFirestore = exports.mockCollection = exports.mockDoc = exports.mockSet = void 0;
exports.mockSet = jest.fn().mockResolvedValue(undefined);
exports.mockDoc = { id: 'mock-id', set: exports.mockSet };
exports.mockCollection = { doc: jest.fn(() => exports.mockDoc), get: jest.fn() };
exports.mockFirestore = { collection: jest.fn(() => exports.mockCollection) };
const applyFirebaseMock = () => {
    jest.mock('firebase-admin/firestore', () => ({
        getFirestore: jest.fn(() => exports.mockFirestore),
    }));
};
exports.applyFirebaseMock = applyFirebaseMock;
//# sourceMappingURL=firebase.mock.js.map