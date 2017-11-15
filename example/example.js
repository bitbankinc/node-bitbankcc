var bitbank = require("../");

var api = bitbank.publicApi();
api.getTicker("btc_jpy").then(console.log);
api.getDepth("btc_jpy").then(console.log);
api.getTransactions("btc_jpy").then(console.log);
api.getTransactions("btc_jpy", 20170329).then(console.log);
api.getCandlestick("btc_jpy", "1day", 2017).then(console.log);

var api2 = bitbank.privateApi("your api key", "your api secret");
api2.getAsset().then(console.log);
api2.getOrder("btc_jpy", 310724279).then(console.log);
api2.getActiveOrders("btc_jpy", { "count": 1 }).then(console.log);
api2.getOrdersInfo("btc_jpy", [90956209, 90951996]).then(console.log);
api2.getWithdrawAccount("btc").then(console.log);
api2.getTradeHistory().then(console.log);
api2.getTradeHistory({ pair: "btc_jpy" }).then(console.log);
api2.order("btc_jpy", 803234, 0.01, "buy", "limit").then(console.log);
api2.cancelOrder("btc_jpy", 310715141).then(console.log);
api2.cancelOrders("btc_jpy", [310715384, 310715385]).then(console.log);
api2.requestWithdraw("btc", "wwwwwwwwww", 0.01, { otp_token: 223330 }).then(console.log);
