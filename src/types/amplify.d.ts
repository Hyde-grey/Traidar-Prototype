import '@aws-amplify/core';

declare module 'aws-amplify' {
  interface ResourcesConfig {
    ai?: {
      region?: string;
      conversation?: {
        chat?: {
          model?: string;
          provider?: string;
          region?: string;
        };
      };
    };
  }
}