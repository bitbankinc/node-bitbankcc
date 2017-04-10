# node-bitbankcc
Node.js library for bitbank.cc, Bitcoin exchange.

[https://bitbank.cc/](https://bitbank.cc/)

# Install
`npm install bitbankinc/node-bitbankcc`

# How to use
See `example` folder for detail.

## Public API
```
var bitbank = require("node-bitbankcc");
var api = bitbank.publicApi();

```

### ticker
```
api.getTicker("btc_jpy").then(function(res){
  console.log(res);
});
```

### market depth
```
api.getDepth("btc_jpy").then(function(res){
  console.log(res);
});
```

### market transactions
```
api.getTransactions("btc_jpy").then(function(res){
  console.log(res);
});

api.getTransactions("btc_jpy", 20170329).then(function(res){
  console.log(res);
});
```

### candle stick data
```
api.getCandlestick("btc_jpy", "1day", 2017).then(function(res){
  console.log(res.candlestick[0].ohlcv);
});
```

## Private API
```
var bitbank = require("node-bitbankcc");
var api2 = bitbank.privateApi("your_api_key", "your_api_secret");
```

### asset
```
api2.getAsset().then(function(res){
  console.log(res);
});
```

### order info / orders info
```
api2.getOrder("btc_jpy", 90956209).then(function(res){
  console.log(res);
});

api2.getOrdersInfo("btc_jpy", [90956209, 90951996]).then(function(res) {
  console.log(res);
});
```

### active orders
```
api2.getActiveOrders("btc_jpy", {"count": 1}).then(function(res){
  console.log(res);
});
```

### new order
```
api2.order("btc_jpy", 10800, 0.01, "buy", "limit").then(function(res) {
  console.log(res);
});
```

### cancel order / cancel orders
```
api2.cancelOrder("btc_jpy", 105718369).then(function(res) {
  console.log(res);
});
api2.cancelOrders("btc_jpy", [105724841, 105724810]).then(function(res) {
  console.log(res);
});
```

### withdraw
```
api2.getWithdrawAccount("btc").then(function(res) {
  console.log(res);
});

api2.requestWithdraw("btc", "uuid", 0.01, {"otp_token": 123456}).then(function(res) {
  console.log(res);
});
```
