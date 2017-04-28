var rp = require('request-promise');

var BitbankccPublic = function() {
  this.endPoint = "https://public.bitbank.cc";
  this.timeout = 5000;
  this.keepalive = false;
};

function errorParser(json) {
  if(json.success == 1) {
    return json.data;
  } else {
    throw new Error(json.data.code);
  }
}

BitbankccPublic.prototype.query = function(option) {
  return rp({
    uri : option,
    method : "GET",
    timeout : this.timeout,
    forever : this.keepalive,
  })
  .then(function (res) {
    var json = JSON.parse(res);
    return errorParser(json);
  })
  .catch(function (err) {
    console.log("Error: " + err);
    throw new Error(err.statusCode);
  });
};

BitbankccPublic.prototype.getTicker = function(pair) {
  var path = "/" + pair + "/ticker";
  return this.query(this.endPoint + path);
};

BitbankccPublic.prototype.getDepth = function(pair) {
  var path = "/" + pair + "/depth";
  return this.query(this.endPoint + path);
};

BitbankccPublic.prototype.getTransactions = function(pair) {
  var path = "/" + pair + "/transactions";
  return this.query(this.endPoint + path);
};

BitbankccPublic.prototype.getTransactions = function(pair, yyyymmdd) {
  var path = "/" + pair + "/transactions/" + yyyymmdd;
  return this.query(this.endPoint + path);
};

BitbankccPublic.prototype.getCandlestick = function(pair, candleType, yyyymmdd) {
  var path = "/" + pair + "/candlestick/" + candleType + "/" + yyyymmdd;
  return this.query(this.endPoint + path);
};

var publicApi = module.exports = function() {
  return new BitbankccPublic();
};
