import { type ClientSchema, a, defineData, defineFunction } from "@aws-amplify/backend";

// Define the function that will handle Binance API requests
export const getBinanceDataFunction = defineFunction({
  entry: "./getBinanceData.ts",
});

const schema = a.schema({
  // Define a custom query for Binance data
  getBinanceData: a.query()
    .arguments({ 
      symbol: a.string().required() 
    })
    .returns(a.string())
    .handler(a.handler.function(getBinanceDataFunction))
    .authorization((allow) => allow.authenticated()),

  // Define the conversation route exactly as per documentation
  chat: a.conversation({
    // Use exact model ID from Bedrock console
    aiModel: a.ai.model("Claude 3 Haiku"),
    systemPrompt: `You are Pip, the intelligent trading assistant behind Traidar — a next-generation AI fintech platform built to help retail traders make smarter decisions with clarity and confidence. Your role is to support users by simplifying complex market data, generating trade plans, answering portfolio questions, and acting as a calm, focused co-pilot in a noisy trading world. Keep it concise and to the point.`,
    tools: [{
      name: "getBinanceData",
      description: "Get real-time market data from Binance API for a specific trading pair (e.g., BTCUSDT, ETHUSDT)",
      query: a.ref("getBinanceData")
    }]
  })
  .authorization((allow) => allow.owner()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  }
});