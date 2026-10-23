/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Sentry DSN; leave unset to keep error reporting off. */
  readonly PUBLIC_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
