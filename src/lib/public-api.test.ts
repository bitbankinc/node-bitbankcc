import * as assert from 'power-assert';
import { PublicApi } from './public-api';
import {
  GetCandleStickRequest,
  GetCircuitBreakInfoRequest,
  GetDepthRequest,
  GetTickerRequest,
  GetTransactionsRequest,
} from './requestType';

function getYesterdayYYYYMMDD(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const m = ('00' + (date.getMonth() + 1)).slice(-2);
  const d = ('00' + date.getDate()).slice(-2);
  return date.getFullYear() + m + d;
}

const config = require('config');

const getTickerTest = async () => {
  const publicApi = new PublicApi(config.publicApi);
  const params: GetTickerRequest = {
    pair: 'btc_jpy',
  };
  const res = await publicApi.getTicker(params);
  assert.equal(res.success, 1);
};

const getDepthTest = async () => {
  const publicApi = new PublicApi(config.publicApi);
  const params: GetDepthRequest = {
    pair: 'btc_jpy',
  };
  const res = await publicApi.getDepth(params);
  assert.equal(res.success, 1);
};

const getDailyTransactionsTest = async () => {
  const publicApi = new PublicApi(config.publicApi);
  const params: GetTransactionsRequest = {
    pair: 'btc_jpy',
    yyyymmdd: getYesterdayYYYYMMDD(),
  };
  const res = await publicApi.getTransactions(params);
  assert.equal(res.success, 1);
};

const getTransactionsTest = async () => {
  const publicApi = new PublicApi(config.publicApi);
  const params: GetTransactionsRequest = {
    pair: 'btc_jpy',
  };
  const res = await publicApi.getTransactions(params);
  assert.equal(res.success, 1);
};

const getCandlestickTest = async () => {
  const publicApi = new PublicApi(config.publicApi);
  const params: GetCandleStickRequest = {
    pair: 'btc_jpy',
    candleType: '1hour',
    yyyymmdd: getYesterdayYYYYMMDD(),
  };
  const res = await publicApi.getCandlestick(params);
  assert.equal(res.success, 1);
};

const getCircuitBreakInfoTest = async () => {
  const publicApi = new PublicApi(config.publicApi);
  const params: GetCircuitBreakInfoRequest = {
    pair: 'btc_jpy',
  };
  const res = await publicApi.getCircuitBreakInfo(params);
  assert.equal(res.success, 1);
};

describe('PublicAPI Test', () => {
  it('GET /{pair}/ticker', getTickerTest);
  it('GET /{pair}/depth', getDepthTest);
  it('GET /{pair}/transactions', getTransactionsTest);
  it('GET /{pair}/transactions/{YYYYMMDD}', getDailyTransactionsTest);
  it('GET /{pair}/candlestick/{candle-type}/{YYYYMMDD}', getCandlestickTest);
  it('GET /{pair}/circuit_break_info', getCircuitBreakInfoTest);
});
