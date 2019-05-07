import { Api } from './api';
import { GetCandleStickRequest, GetDepthRequest, GetTickerRequest, GetTransactionsRequest } from './requestType';
import { CandlestickResponse, DepthResponse, Response, TickerResponse, TransactionsResponse } from './responseType';

export class PublicApi extends Api {
  public getTicker(params: GetTickerRequest): Promise<Response<TickerResponse>> {
    const path: string = `/${params.pair}/ticker`;
    return this.get(path);
  }

  public getDepth(params: GetDepthRequest): Promise<Response<DepthResponse>> {
    const path: string = `/${params.pair}/depth`;
    return this.get(path);
  }

  public getTransactions(params: GetTransactionsRequest): Promise<Response<TransactionsResponse>> {
    const path: string = params.yyyymmdd ? `/${params.pair}/transactions/${params.yyyymmdd}` : `/${params.pair}/transactions`;
    return this.get(path);
  }

  public getCandlestick(params: GetCandleStickRequest): Promise<Response<CandlestickResponse>> {
    const path: string = `/${params.pair}/candlestick/${params.candleType}/${params.yyyymmdd}`;
    return this.get(path);
  }
}
