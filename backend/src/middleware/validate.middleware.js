import { AppError } from '../utils/AppError.js';

function formatZodError(zodError) {
  const issues = zodError?.issues || [];
  if (!issues.length) return 'Invalid request';
  return issues
    .map((i) => {
      const path = i.path?.length ? i.path.join('.') : 'request';
      return `${path}: ${i.message}`;
    })
    .join(', ');
}

export function validateBody(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new AppError(formatZodError(result.error), 400));
    }
    req.body = result.data;
    return next();
  };
}

