import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,

  environment: process.env.NODE_ENV || "development",

  tracesSampleRate:
    process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  sendDefaultPii: false,
});