import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

// Policy to allow invoking Claude 3 Haiku model on Bedrock
export const bedrockPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream"],
  resources: [
    "arn:aws:bedrock:eu-west-2::foundation-model/anthropic.claude-3-haiku-20240307-v1:0",
  ],
});
