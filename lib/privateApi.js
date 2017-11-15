var rp = require('request-promise');
var crypto = require('crypto');
var querystring = require('querystring');

var BitbankccPrivate = function(apiKey, apiSecret) {
  this.endPoint = "https://dev-api.bitbank.cc/v1";
  this.apiKey = apiKey;
  this.apiSecret = apiSecret;
  this.timeout = 5000;
  this.keepalive = false;
};

var privateApi = module.exports = function(apiKey, apiSecret) {
  return new BitbankccPrivate(apiKey, apiSecret);
};

function toSha256(key, value) {
  return crypto.createHmac("sha256", key).update(new Buffer(value)).digest('hex').toString();
}

function makeHeader(queryData, apiKey, apiSecret) {
  var nonce = new Date().getTime();
  var message = nonce + queryData;
  return {
    "Content-Type": "application/json",
    "ACCESS-KEY": apiKey,
    "ACCESS-NONCE": nonce,
    "ACCESS-SIGNATURE": toSha256(apiSecret, message)
  };
}

BitbankccPrivate.prototype.query = function(options) {
  return rp(options).then(function(json) {
    if (json.success == 1) {
      return json.data;
    } else {
      throw new Error(json.data.code);
    }
  }).catch(function(err) {
    console.log(err);
    throw new Error(err.statusCode);
  });
};

BitbankccPrivate.prototype.getQuery = function(path, query) {
  var data = "/v1" + path;
  if (Object.keys(query).length > 0) {
    data += "?" + querystring.stringify(query)
  }
  var options = {
    uri: this.endPoint + path,
    qs: query,
    timeout: this.timeout,
    forever: this.keepalive,
    headers: makeHeader(data, this.apiKey, this.apiSecret),
    json: true
  };
  return this.query(options);
};

BitbankccPrivate.prototype.postQuery = function(path, query) {
  var data = JSON.stringify(query);
  var options = {
    method: "POST",
    uri: this.endPoint + path,
    body: query,
    headers: makeHeader(data, this.apiKey, this.apiSecret),
    json: true
  };
  return this.query(options);
};

BitbankccPrivate.prototype.getAsset = function() {
  return this.getQuery("/user/assets", {});
};

BitbankccPrivate.prototype.getOrder = function(pair, order_id) {
  return this.getQuery("/user/spot/order", {
    "pair": pair,
    "order_id": order_id
  });
};

BitbankccPrivate.prototype.getActiveOrders = function(pair, options) {
  var q = Object.assign({ "pair": pair }, options);
  return this.getQuery("/user/spot/active_orders", q);
};

BitbankccPrivate.prototype.order = function(pair, price, amount, side, type) {
  return this.postQuery("/user/spot/order", {
    "pair": pair,
    "price": price,
    "amount": amount,
    "side": side,
    "type": type
  });
};

BitbankccPrivate.prototype.cancelOrder = function(pair, orderId) {
  return this.postQuery("/user/spot/cancel_order", {
    "pair": pair,
    "order_id": orderId
  });
};

BitbankccPrivate.prototype.cancelOrders = function(pair, orderIds) {
  return this.postQuery("/user/spot/cancel_orders", {
    "pair": pair,
    "order_ids": orderIds
  });
};

BitbankccPrivate.prototype.getOrdersInfo = function(pair, orderIds) {
  return this.postQuery("/user/spot/orders_info", {
    "pair": pair,
    "order_ids": orderIds
  });
};

BitbankccPrivate.prototype.getTradeHistory = function(params = {}) {
  var q = {};
  if (params.pair) q.pair = params.pair;
  if (params.count) q.count = params.count;
  if (params.order_id) q.order_id = params.order_id;
  if (params.since) q.since = params.since;
  if (params.end) q.end = params.end;
  if (params.order) q.order = params.order;
  return this.getQuery("/user/spot/trade_history", q);
};

BitbankccPrivate.prototype.getWithdrawAccount = function(asset) {
  return this.getQuery("/user/withdrawal_account", {
    "asset": asset
  });
};

BitbankccPrivate.prototype.requestWithdraw = function(asset, uuid, amount, token) {
  var q = {
    "asset": asset,
    "uuid": uuid,
    "amount": amount
  };
  return this.postQuery("/user/request_withdrawal", Object.assign(q, token));
};
