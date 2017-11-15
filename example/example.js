var bitbank = require("../");

var api = bitbank.publicApi();
api.getTicker("btc_jpy").then(console.log);
api.getDepth("btc_jpy").then(console.log);
api.getTransactions("btc_jpy").then(console.log);
api.getTransactions("btc_jpy", 20170329).then(console.log);
api.getCandlestick("btc_jpy", "1day", 2017).then(console.log);

var api2 = bitbank.privateApi("4a656f57-b303-4d49-bc8f-a04b2b279e84", "b728a819adda37ee67c3797062c4966ad4338831398300c1165c2967e67d4e23");
api2.getAsset().then(console.log);
api2.getOrder("btc_jpy", 90956209).then(console.log);
api2.getActiveOrders("btc_jpy", { "count": 1 }).then(console.log);
api2.getOrdersInfo("btc_jpy", [90956209, 90951996]).then(console.log);
api2.getWithdrawAccount("btc").then(console.log);
api2.getTradeHistory().then(console.log);
api2.getTradeHistory({ pair: "btc_jpy", since: 1510721043089 }).then(console.log);
api2.order("btc_jpy", 803234, 0.01, "buy", "limit").then(console.log);
api2.cancelOrder("btc_jpy", 310715141).then(console.log);
api2.cancelOrders("btc_jpy", [310715384, 310715385]).then(console.log);
api2.requestWithdraw("btc", "wwwwwwwwww", 0.01, { "otp_token": 223330 }).then(console.log);
