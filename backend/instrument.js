import dotenv from "dotenv";
import * as Sentry from "@sentry/node";

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  environment: process.env.NODE_ENV || "development",

  tracesSampleRate: 1.0,

  beforeSend(event) {
    if (event.request?.headers) {
      delete event.request.headers.authorization;
      delete event.request.headers.cookie;
    }

    if (
      event.request?.data &&
      typeof event.request.data === "object" &&
      !Array.isArray(event.request.data)
    ) {
      const sensitiveFields = [
        "password",
        "confirmPassword",
        "token",
        "accessToken",
        "refreshToken",
      ];

      sensitiveFields.forEach((field) => {
        delete event.request.data[field];
      });
    }

    return event;
  },
});