export declare const mockSet: jest.Mock<any, any, any>;
export declare const mockDoc: {
    id: string;
    set: jest.Mock<any, any, any>;
};
export declare const mockCollection: {
    doc: jest.Mock<{
        id: string;
        set: jest.Mock<any, any, any>;
    }, [], any>;
    get: jest.Mock<any, any, any>;
};
export declare const mockFirestore: {
    collection: jest.Mock<{
        doc: jest.Mock<{
            id: string;
            set: jest.Mock<any, any, any>;
        }, [], any>;
        get: jest.Mock<any, any, any>;
    }, [], any>;
};
export declare const applyFirebaseMock: () => void;
