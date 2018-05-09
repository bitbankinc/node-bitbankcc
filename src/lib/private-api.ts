import * as crypto from 'crypto';
import * as querystring from 'querystring';
import { Api, ApiOptions } from './api';
import { PrivateApiConfig } from './type';
import {
  ActiveOrdersResponse,
  AssetsResponse,
  OrderResponse,
  OrdersResponse,
  Response,
  TradeHistoryResponse,
  WithdrawalAccountResponse,
  WithdrawalResponse,
} from './responseType';
import {
  ActiveOrderRequest,
  CancelOrderRequest,
  CancelOrdersRequest,
  GetOrderRequest,
  GetOrdersRequest,
  OrderRequest,
  TradeHistoryRequest,
  WithdrawalAccountRequest,
  WithdrawalRequest,
} from './requestType';

const URL_API_BITBANK = 'https://api.bitbank.cc/v1';

export class PrivateApi extends Api {
  private static toSha256(key: string, value: string): string {
    return crypto
      .createHmac('sha256', key)
      .update(new Buffer(value))
      .digest('hex')
      .toString();
  }

  private readonly apiKey: string;
  private readonly apiSecret: string;

  private nonce: number;

  constructor(config: PrivateApiConfig, options?: ApiOptions) {
    config.endPoint = config.endPoint || URL_API_BITBANK;
    super(config, options);
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.nonce = new Date().getTime();
  }

  public getAssets(): Promise<Response<AssetsResponse>> {
    const path = '/user/assets';
    return this.get(path, {});
  }

  public getOrder(params: GetOrderRequest): Promise<Response<OrderResponse>> {
    const path = '/user/spot/order';
    return this.get(path, params);
  }

  public postOrder(params: OrderRequest): Promise<Response<OrderResponse>> {
    const path = '/user/spot/order';
    return this.post(path, params);
  }

  public cancelOrder(params: CancelOrderRequest): Promise<Response<OrderResponse>> {
    const path = '/user/spot/cancel_order';
    return this.post(path, params);
  }

  public cancelOrders(params: CancelOrdersRequest): Promise<Response<OrdersResponse>> {
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
    const headers = this.makeHeader('/v1'.concat(path, params));
    return super.get(path, query, headers);
  }

  post<T>(path: string, query: {}) {
    const data = JSON.stringify(query);
    const headers = this.makeHeader(data);
    return super.post(path, query, headers);
  }

  private makeHeader(uri: string): any {
    this.nonce++;
    const message: string = this.nonce.toString().concat(uri);
    return {
      'Content-Type': 'application/json',
      'ACCESS-KEY': this.apiKey,
      'ACCESS-NONCE': this.nonce.toString(),
      'ACCESS-SIGNATURE': PrivateApi.toSha256(this.apiSecret, message),
    };
  }
}
