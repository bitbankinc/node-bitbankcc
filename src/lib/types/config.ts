export interface ApiConfig {
  endPoint: string;
  keepAlive?: boolean;
  timeout?: number;
}

export interface PrivateApiConfig extends ApiConfig {
  apiKey: string;
  apiSecret: string;
  otp: boolean;
}

export interface Config {
  publicApi: ApiConfig;
  privateApi: PrivateApiConfig;
}
