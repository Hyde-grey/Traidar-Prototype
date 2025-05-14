import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  // Add custom user attributes
  userAttributes: {
    // Add nickname as a required attribute
    nickname: {
      required: true,
      mutable: true,
    },
  },
});
