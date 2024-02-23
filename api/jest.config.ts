import type {Config} from 'jest';

export default async (): Promise<Config> => {
  return {
    verbose: true,
    // testEnvironment: 'ts-node',
    testMatch: ['**/__tests__/**/*.ts?(x)', "**/?(*.)+(spec|test).ts?(x)"],
    globals: {
        'ts-jest': {
          tsconfig: {
            rootDir: '.'
          }
        }
      }
  };
};