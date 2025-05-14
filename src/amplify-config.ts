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
      Cognito: {
        userPoolClientId: "a4abpiffsqbhb960qhjmschln",
        userPoolId: "eu-west-2_MUKuDYlJs",
        identityPoolId: "eu-west-2:17e5bfb7-50e9-4e47-8499-55639e47829b",
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
        defaultAuthMode: "AMAZON_COGNITO_USER_POOLS",
      },
    },
    // Storage configuration (if needed)
    Storage: {
      S3: {
        bucket: "traidar-dev-bucket",
        region: "eu-west-2",
      },
    },
    // Remove the AI configuration
  } as any);

  console.log("✅ Amplify Gen 2 configured successfully");
}
