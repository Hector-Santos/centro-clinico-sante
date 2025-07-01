import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // <-- 🔥 required
    '^test/(.*)$': '<rootDir>/test/$1', // <-- optional, but good
  },
};

export default config;
