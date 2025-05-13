declare module "../amplify_outputs.json" {
  interface AmplifyOutputs {
    version: string;
    auth?: {
      user_pool_id: string;
      aws_region: string;
      user_pool_client_id?: string;
      identity_pool_id?: string;
      [key: string]: any;
    };
    data?: {
      url: string;
      aws_region: string;
      api_key?: string;
      [key: string]: any;
    };
    ai?: {
      [key: string]: any;
    };
    [key: string]: any;
  }

  const config: AmplifyOutputs;
  export default config;
}
