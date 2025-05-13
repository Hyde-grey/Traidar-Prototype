import { Amplify } from "aws-amplify";

/**
 * Configure Amplify for Gen 2
 * This sets up all required configurations for auth, api, and other services
 *
 * NOTE: This function is not currently used as configuration is loaded from amplify_outputs.json
 * in main.tsx. This file is kept for reference or as a fallback.
 */
export function configureAmplify() {
  Amplify.configure({
    // Auth configuration for Gen 2
    Auth: {
      region: "eu-west-2", // Move region here
      Cognito: {
        userPoolClientId: "5gcd3psg8eku3h2u3ro2oto9n2",
        userPoolId: "eu-west-2_Lnpv8PpZ9",
        identityPoolId: "eu-west-2:bb9541a9-eb31-407b-9313-6d5f119d97c6",
        loginWith: {
          email: true,
        },
      },
    },
    // API configuration
    API: {
      GraphQL: {
        endpoint:
          "https://mpnk7jya5fbddlafko7royvsya.appsync-api.eu-west-2.amazonaws.com/graphql",
        region: "eu-west-2",
        apiKey: "da2-wuqj3qyirjeblgmowt42fpbunq",
        defaultAuthMode: "userPool",
      },
    },
    // Storage configuration (if needed)
    Storage: {
      S3: {
        bucket: "traidar-dev-bucket",
        region: "eu-west-2",
      },
    },
    // AI configuration for Bedrock
    ai: {
      region: "eu-west-2",
      conversation: {
        chat: {
          model: "anthropic.claude-3-haiku-20240307-v1:0",
          provider: "bedrock",
          region: "eu-west-2",
        },
      },
    },
  } as any);

  console.log("✅ Amplify Gen 2 configured successfully");
}
