// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { AxiosError } from 'axios';
import * as Sentry from '@sentry/nextjs';

// ----------------------------------------------------------------------

Sentry.init({
  beforeSend(event, hint) {
    const error = hint.originalException;

    console.error(error);

    event.extra = {
      ...event.extra,
      // Add additional context
    };

    // Filter out specific errors
    if (error instanceof AxiosError) {
      if (error.status === 404) return null; // Don't track 404s
    }

    return event;
  },

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  dsn: 'https://bf61318d40107c55f1c1a864e42ac599@o4508643063103488.ingest.us.sentry.io/4508643169599488',

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration(), Sentry.feedbackIntegration({ colorScheme: 'system' })],

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
});
