import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from 'vitest';

export const mockServer = setupServer();

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());