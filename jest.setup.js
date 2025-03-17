import "@testing-library/jest-dom";

// テスト実行中のconsole.logを抑制
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
