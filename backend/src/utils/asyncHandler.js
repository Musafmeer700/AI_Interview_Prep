/**
 * Wraps async route handlers so rejected promises reach Express error middleware.
 */
export function asyncHandler(fn) {
  return function asyncHandlerWrapper(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
