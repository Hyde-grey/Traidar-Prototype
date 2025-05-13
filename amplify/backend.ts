import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { getBinanceDataFunction } from "./data/resource";

/**
 * Define the backend resources for the app
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
  getBinanceDataFunction,
});

/**
 * For AI capabilities using Bedrock, you need to add permissions to the IAM roles
 * either through the AWS console or using AWS CDK directly.
 *
 * The following permissions are required:
 * - Action: bedrock:InvokeModel and bedrock:InvokeModelWithResponseStream
 * - Resource: arn:aws:bedrock:*::foundation-model/anthropic.claude-3-haiku-20240307-v1:0
 *
 * Since the Amplify Gen 2 TypeScript definitions don't directly expose the addToRolePolicy method,
 * you'll need to use the AWS Console to add these permissions after deployment.
 */
