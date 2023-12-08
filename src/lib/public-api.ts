import { Api } from './api';
import {
  GetCandleStickRequest,
  GetCircuitBreakInfoRequest,
  GetDepthRequest,
  GetTickerRequest,
  GetTransactionsRequest,
} from './requestType';
import {
  CandlestickResponse,
  CircuitBreakInfoResponse,
  DepthResponse,
  Response,
  TickerResponse,
  TransactionsResponse,
} from './responseType';

export class PublicApi extends Api {
  public getTicker(params: GetTickerRequest): Promise<Response<TickerResponse>> {
    const path: string = '/'.concat(params.pair, '/ticker');
    return this.get(path);
  }

  public getDepth(params: GetDepthRequest): Promise<Response<DepthResponse>> {
    const path: string = '/'.concat(params.pair, '/depth');
    return this.get(path);
  }

  public getTransactions(params: GetTransactionsRequest): Promise<Response<TransactionsResponse>> {
    let path: string = '/'.concat(params.pair, '/transactions');
    if (params.yyyymmdd) {
      path = path.concat('/', params.yyyymmdd);
    }
    return this.get(path);
  }

  public getCandlestick(params: GetCandleStickRequest): Promise<Response<CandlestickResponse>> {
    const path: string = '/'.concat(params.pair, '/candlestick/', params.candleType, '/', params.yyyymmdd);
    return this.get(path);
  }

  public getCircuitBreakInfo(params: GetCircuitBreakInfoRequest): Promise<Response<CircuitBreakInfoResponse>> {
    const path: string = '/'.concat(params.pair, '/circuit_break_info');
    return this.get(path);
  }
}
