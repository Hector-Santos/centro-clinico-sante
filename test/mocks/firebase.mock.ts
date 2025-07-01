// test/mocks/firebase.mock.ts

export const mockSet = jest.fn().mockResolvedValue(undefined);
export const mockDoc = { id: 'mock-id', set: mockSet };
export const mockCollection = { doc: jest.fn(() => mockDoc), get: jest.fn() };
export const mockFirestore = { collection: jest.fn(() => mockCollection) };

/**
 * MUST be called before any imports that trigger `getFirestore()`.
 */
export const applyFirebaseMock = () => {
  jest.mock('firebase-admin/firestore', () => ({
    getFirestore: jest.fn(() => mockFirestore),
  }));
};
