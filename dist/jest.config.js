"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    roots: ['<rootDir>'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^test/(.*)$': '<rootDir>/test/$1',
    },
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map