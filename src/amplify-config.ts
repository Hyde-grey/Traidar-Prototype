import { Amplify } from "aws-amplify";

/**
 * Configure Amplify for Gen 2
 * This sets up all required configurations for auth, api, and other services
 */
export function configureAmplify() {
  Amplify.configure({
    // Auth configuration for Gen 2
    Auth: {
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
  });

  console.log("✅ Amplify Gen 2 configured successfully");
}
