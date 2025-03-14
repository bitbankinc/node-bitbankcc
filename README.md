# node-bitbankcc

## About

node-bitbankccはNode.js用のbitabank.cc APIのSDKです。

* bitbank.ccについて - [https://bitbank.cc/](https://bitbank.cc/)

* bitbank.cc APIについて - [https://docs.bitbank.cc/](https://docs.bitbank.cc/)

## How to use

### import/require

TypeScriptのimport、JavaScriptのrequireはそれぞれ以下のように行います。

#### TypeScript
```typescript
import * as bitbank from 'node-bitbankcc';
```
また、tscコマンドでのコンパイルの際は以下のように行います。
```
$ tsc --lib ES2016 app.ts
```

#### JavaScript
```javascript
var bitbank = require("node-bitbankcc");
```

### PublicAPI
PublicApiの初期化にはApiConfigが必要です。

```typescript
const conf: ApiConfig = {
  endPoint: 'https://public.bitbank.cc',	// required
  keepAlive: false,							// optional, default false
  timeout: 3000,							// optional, default 3000
};

const publicApi =new PublicApi(conf);
```
また、ApiOptionsとして、APIリクエストのOptionsを受け取れるoptionsCallbackと、レスポンスを受け取れるresponseCallbackにfunctionを指定することもできます。

```typescript
...

const options: ApiOptions = {
  optionsCallback: function(...) {...},
  responseCallback: function(...) {...},
};

const publicApi = new PublicApi(conf, options);
```

#### サンプル実装
以下にPublic APIの呼び出しサンプル実装を記載します。

##### getTicker
```typescript
const params: GetTickerRequest = {
  pair: 'btc_jpy', 			// required
};
const res = await publicApi.getTicker(params);
```

##### getDepth
```typescript
const params: GetDepthRequest = {
  pair: 'btc_jpy', 			// required
};
const res = await publicApi.getDepth(params);
```

##### getTransactions
```typescript
const params: GetTransactionsRequest = {
  pair: 'btc_jpy', 			// required
  yyyymmdd: '20180401', 	// optional
};
const res = await publicApi.getTransactions(params);
```

##### getCandlestick
```typescript
const params: GetCandleStickRequest = {
  pair: 'btc_jpy', 			// required
  candleType: '1hour', 		// required
  yyyymmdd: '20180401', 	// required
};
const res = await publicApi.getCandlestick(params);
```

##### getCircuitBreakInfo
```typescript
const params: GetCircuitBreakInfoRequest = {
    pair: 'btc_jpy', 			// required
};
const res = await publicApi.getCircuitBreakInfo(params);
```

### PrivateAPI
PrivateAPIの初期化にはPrivateApiConfigが必要になります。

```typescript
// # ACCESS-TIME-WINDOW 方式
const conf: PrivateApiConfig = {
  apiKey: 'YOUR_API_KEY',					// required
  apiSecret: 'YOUR_SECRET_KEY',				// required
  endPoint: 'https://api.bitbank.cc/v1',  	// optional, default->'https://api.bitbank.cc/v1'
  keepAlive: false,							// optional, default->false
  timeout: 3000,							// optional, default->3000
  authMethod: 'RequestTime', // optional, default->'RequestTime'
  timeWindow: 5000,         // optional, default->5000
};

// # ACCESS-NONCE 方式
const conf: PrivateApiConfig = {
  apiKey: 'YOUR_API_KEY',					// required
  apiSecret: 'YOUR_SECRET_KEY',				// required
  endPoint: 'https://api.bitbank.cc/v1',  	// optional, default->'https://api.bitbank.cc/v1'
  keepAlive: false,							// optional, default->false
  timeout: 3000,							// optional, default->3000
  authMethod: 'Nonce',        // optional, default->'RequestTime'
};

const privateApi = new PrivateApi(conf);
```

また、PublicAPIと同様に、ApiOptionsを指定することが可能です。

```typescript
...

const options: ApiOptions = {
  optionsCallback: function(...) {...},
  responseCallback: function(...) {...},
};

const privateApi = new PrivateApi(conf, options);
```

#### サンプル実装
以下にPrivate APIの呼び出しサンプル実装を記載します。

##### getAssets
```typescript
const res = await privateApi.getAssets();
assert.equal(res.success, 1);
```

##### getMarginPositions
```typescript
const res = await privateApi.getMarginPositions();
assert.equal(res.success, 1);
```

##### getOrder
```typescript
const params: GetOrderRequest = {
  order_id: 14541343,				// required
  pair: 'btc_jpy',					// optional
};
const res = await privateApi.getOrder(params);
```

##### postOrder
```typescript
const params: OrderRequest = {
  pair: 'btc_jpy',					// required
  amount: '0.01',					// required
  price: 1000,						// optional
  side: 'buy',						// required
  type: 'market',					// required
  post_only: false,					// optional. Except for circuit_break_info.mode is NONE, this parm is ignored.
  position_side: 'long',   // optional
};
const res = await privateApi.postOrder(params);
```

##### cancelOrder
```typescript
const params: CancelOrderRequest = {
  order_id: 14541507,				// required
  pair: 'btc_jpy',					// required
};
const res = await privateApi.cancelOrder(params);
```

##### cancelOrders
```typescript
const params: CancelOrdersRequest = {
  order_ids: [14541370, 14541371],	// required
  pair: 'btc_jpy',					// required
};
const res = await privateApi.cancelOrders(params);
```

##### getOrdersInfo
```typescript
const params: GetOrdersRequest = {
  order_ids: [14541343, 14541344],	// required
  pair: 'btc_jpy',					// optional
};
const res = await privateApi.getOrdersInfo(params);
```

##### getActiveOrders
```typescript
const params: ActiveOrderRequest = {
  pair: 'btc_jpy',					// optional
  count: 1,							// optional
  from_id: 14541346,				// optional
  end_id: 14541343,					// optional
  since: 1523419311277,				// optional
  end: 1523419024484,				// optional
};
const res = await privateApi.getActiveOrders(params);
```

##### getTradeHistory
```typescript
const params: TradeHistoryRequest = {
  pair: 'btc_jpy',					// optional
  count: 1,							// optional
  order_id: 14541370,				// optional
  since: 1523419311277,				// optional
  end: 1523419024484,				// optional
  order: 'asc',						// optional
};
const res = await privateApi.getTradeHistory(params);
```

##### getDepositHistory
```typescript
const params: DepositHistoryRequest = {
  asset: 'btc',						// required
  count: 1,							// optional
  since: 1523419311277,				// optional
  end: 1523419024484,				// optional
  order: 'asc',						// optional
};
const res = await privateApi.getDepositHistory(params);
```

##### getWithdrawalAccount
```typescript
const params: WithdrawalAccountRequest = {
  asset: 'jpy',						// required
};
const res = await privateApi.getWithdrawalAccount(params);
```

##### requestWithdrawal
```typescript
const params: WithdrawalRequest = {
  asset: 'jpy',						// required
  uuid: '00000000-0000-0000-0000-000000000000', // required
  amount: '1000',					// required
  otp_token: '652036',				// optional, sms_tokenとどちらか必須
  sms_token: '******', 				// optional, otp_tokenとどちらか必須
};
const res = await privateApi.requestWithdrawal(params);
```

##### getWithdrawalHistory

```typescript
const params: WithdrawalHistoryRequest = {
  asset: 'btc',						// required
  count: 1,							// optional
  since: 1523419311277,				// optional
  end: 1523419024484,				// optional
  order: 'asc',						// optional
};
const res = await privateApi.getWithdrawalHistory(params);
```

## 実装の確認/モックについて

以下のリポジトリのモックサーバーを用いて
SDKが正しく実装されているかを確認することができます。
https://github.com/bitbankinc/mock-bitbankcc
