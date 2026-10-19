import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Sample 10% of requests; 100% adds overhead to every request and burns quota.
  tracesSampleRate: 0.1,
});
