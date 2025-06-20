import '@testing-library/jest-dom';

// Mock Web3 and MetaMask for testing environment
global.ethereum = {
  request: jest.fn().mockResolvedValue(['0x742d35Cc6Bf4532B8C3F8C71F7Eab0a4A4b7c8f9']),
  on: jest.fn(),
  removeListener: jest.fn(),
  isMetaMask: true,
  isConnected: jest.fn().mockReturnValue(true),
};

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver for responsive components
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Console error suppression for known React issues in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock performance API for performance tests
global.performance.mark = jest.fn();
global.performance.measure = jest.fn();
global.performance.getEntriesByName = jest.fn().mockReturnValue([]);
global.performance.getEntriesByType = jest.fn().mockReturnValue([]);

// Mock localStorage for state persistence tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock fetch for API calls
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: jest.fn().mockResolvedValue({}),
  text: jest.fn().mockResolvedValue(''),
});

// Setup test environment variables
process.env.REACT_APP_ENVIRONMENT = 'test';
process.env.REACT_APP_MOCK_DATA = 'true';
process.env.REACT_APP_DEBUG_MODE = 'false';

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
});
