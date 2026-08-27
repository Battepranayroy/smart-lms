import * as Sentry from "@sentry/node";
export const errorHandler = (err, req, res, next) => {
  // Send unexpected application errors to Sentry
  Sentry.captureException(err);

  // Log locally for development/debugging
  console.error(err);

  // Don't expose internal error details to the client
  res.status(err.statusCode || 500).json({
    message: err.statusCode ? err.message : "Internal server error",
  });
};