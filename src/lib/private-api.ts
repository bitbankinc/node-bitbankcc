import * as crypto from 'crypto';
import * as querystring from 'querystring';
import { Api, ApiOptions } from './api';
import { PrivateApiConfig } from './type';
import {
  ActiveOrdersResponse,
  AssetsResponse,
  CancelOrderResponse,
  CancelOrdersResponse,
  DepositHistoryResponse,
  MarginPositionsResponse,
  OrderResponse,
  OrdersResponse,
  Response,
  TradeHistoryResponse,
  WithdrawalAccountResponse,
  WithdrawalHistoryResponse,
  WithdrawalResponse,
} from './responseType';
import {
  ActiveOrderRequest,
  CancelOrderRequest,
  CancelOrdersRequest,
  DepositHistoryRequest,
  GetOrderRequest,
  GetOrdersRequest,
  OrderRequest,
  TradeHistoryRequest,
  WithdrawalAccountRequest,
  WithdrawalHistoryRequest,
  WithdrawalRequest,
} from './requestType';

const URL_API_BITBANK = 'https://api.bitbank.cc/v1';

export class PrivateApi extends Api {
  private static toSha256(key: string, value: string): string {
    return crypto
      .createHmac('sha256', key)
      .update(Buffer.from(value))
      .digest('hex')
      .toString();
  }

  private readonly apiKey: string;
  private readonly apiSecret: string;

  private readonly authMethod: 'RequestTime' | 'Nonce';
  private nonce: number;
  private timeWindow: number;


  constructor(config: PrivateApiConfig, options?: ApiOptions) {
    config.endPoint = config.endPoint || URL_API_BITBANK;
    super(config, options);
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.authMethod = config.authMethod || 'RequestTime';
    this.nonce = new Date().getTime();
    this.timeWindow = config.timeWindow || 5000;
  }

  public getAssets(): Promise<Response<AssetsResponse>> {
    const path = '/user/assets';
    return this.get(path, {});
  }

  public getMarginPositions(): Promise<Response<MarginPositionsResponse>> {
    const path = '/user/margin/positions';
    return this.get(path, {});
  }

  public getOrder(params: GetOrderRequest): Promise<Response<OrderResponse | CancelOrderResponse>> {
    const path = '/user/spot/order';
    return this.get(path, params);
  }

  public postOrder(params: OrderRequest): Promise<Response<OrderResponse>> {
    const path = '/user/spot/order';
    return this.post(path, params);
  }

  public cancelOrder(params: CancelOrderRequest): Promise<Response<CancelOrderResponse>> {
    const path = '/user/spot/cancel_order';
    return this.post(path, params);
  }

  public cancelOrders(params: CancelOrdersRequest): Promise<Response<CancelOrdersResponse>> {
    const path = '/user/spot/cancel_orders';
    return this.post(path, params);
  }

  public getOrdersInfo(params: GetOrdersRequest): Promise<Response<OrdersResponse>> {
    const path = '/user/spot/orders_info';
    return this.post(path, params);
  }

  public getActiveOrders(params: ActiveOrderRequest): Promise<Response<ActiveOrdersResponse>> {
    const path = '/user/spot/active_orders';
    return this.get(path, params);
  }

  public getTradeHistory(params: TradeHistoryRequest): Promise<Response<TradeHistoryResponse>> {
    const path = '/user/spot/trade_history';
    return this.get(path, params);
  }

  public getDepositHistory(params: DepositHistoryRequest): Promise<Response<DepositHistoryResponse>> {
    const path = '/user/deposit_history';
    return this.get(path, params);
  }

  public getWithdrawalHistory(params: WithdrawalHistoryRequest): Promise<Response<WithdrawalHistoryResponse>> {
    const path = '/user/withdrawal_history';
    return this.get(path, params);
  }

  public getWithdrawalAccount(params: WithdrawalAccountRequest): Promise<Response<WithdrawalAccountResponse>> {
    const path = '/user/withdrawal_account';
    return this.get(path, params);
  }

  public requestWithdrawal(params: WithdrawalRequest): Promise<Response<WithdrawalResponse>> {
    const path = '/user/request_withdrawal';
    return this.post(path, params);
  }

  get<T>(path: string, query?: {}) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += '?' + querystring.stringify(query);
    }
    let headers;
    if (this.authMethod === 'RequestTime') {
      headers = this.makeRequestTimeHeader('/v1'.concat(path, params));
    } else {
      headers = this.makeNonceHeader('/v1'.concat(path, params));
    }
    return super.get(path, query, headers);
  }

  post<T>(path: string, query: {}) {
    const data = JSON.stringify(query);
    let headers;
    if (this.authMethod === 'RequestTime') {
      headers = this.makeRequestTimeHeader(data);
    } else {
      headers = this.makeNonceHeader(data);
    }
    return super.post(path, query, headers);
  }

  private makeNonceHeader(uri: string): any {
    this.nonce++;
    const message: string = this.nonce.toString().concat(uri);
    return {
      'Content-Type': 'application/json',
      'ACCESS-KEY': this.apiKey,
      'ACCESS-NONCE': this.nonce.toString(),
      'ACCESS-SIGNATURE': PrivateApi.toSha256(this.apiSecret, message),
    };
  }

  private makeRequestTimeHeader(uri: string): any {
    const requestTime = new Date().getTime();
    const message: string = requestTime.toString().concat(this.timeWindow.toString()).concat(uri);
    return {
      'Content-Type': 'application/json',
      'ACCESS-KEY': this.apiKey,
      'ACCESS-REQUEST-TIME': requestTime.toString(),
      'ACCESS-TIME-WINDOW': this.timeWindow.toString(),
      'ACCESS-SIGNATURE': PrivateApi.toSha256(this.apiSecret, message),
    };
  }
}
