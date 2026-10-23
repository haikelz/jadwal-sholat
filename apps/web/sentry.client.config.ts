import * as Sentry from "@sentry/astro";

// No DSN, no reporting: local builds and previews stay quiet.
Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN,
  enabled: Boolean(import.meta.env.PUBLIC_SENTRY_DSN),
  tracesSampleRate: 0,
});
