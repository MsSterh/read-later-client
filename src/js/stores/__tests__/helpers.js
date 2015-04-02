export function invokeSync(fn) {
  fn();
  jest.runOnlyPendingTimers();
}
