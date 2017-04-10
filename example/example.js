var bitbank = require("../");

var api = bitbank.publicApi();
api.getTicker("btc_jpy").then(function(res){
  console.log(res);
});
api.getDepth("btc_jpy").then(function(res){
  console.log(res);
});
api.getTransactions("btc_jpy").then(function(res){
  console.log(res);
});
api.getTransactions("btc_jpy", 20170329).then(function(res){
  console.log(res);
});
api.getCandlestick("btc_jpy", "1day", 2017).then(function(res){
  console.log(res.candlestick[0].ohlcv);
});



var api2 = bitbank.privateApi("your_api_key", "your_api_secret");
api2.getAsset().then(function(res){
  console.log(res);
});
api2.getOrder("btc_jpy", 90956209).then(function(res){
  console.log(res);
});
api2.getActiveOrders("btc_jpy", {"count": 1}).then(function(res){
  console.log(res);
});
api2.order("btc_jpy", 10800, 0.01, "buy", "limit").then(function(res) {
  console.log(res);
});
api2.cancelOrder("btc_jpy", 105718369).then(function(res) {
  console.log(res);
});
api2.cancelOrders("btc_jpy", [105724841, 105724810]).then(function(res) {
  console.log(res);
});
api2.getOrdersInfo("btc_jpy", [90956209, 90951996]).then(function(res) {
  console.log(res);
});
api2.getWithdrawAccount("btc").then(function(res) {
  console.log(res);
});
api2.requestWithdraw("btc", "wwwwwwwwww", 0.01, {"otp_token": 223330}).then(function(res) {
  console.log(res);
});
