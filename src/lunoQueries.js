const bitx = require('bitx')();

var getTickerPromise = function () {
    return new Promise(function (resolve, reject) {

        bitx.getTicker(function (err, ticker) {
            resolve(ticker.last_trade);
        });
    });
};
var setAuth = function (wallet) {
    var auth = wallet.lunoPublicKey + ':' + wallet.lunoSecretKey
    bitx.auth = auth;
};

var parseLunoBalance = function (result, wallet) {
    console.log(result);
};

var getBalancePromise = function (wallet) {
    return new Promise(function (resolve, reject) {

            setAuth(wallet)
            bitx.getBalance(function (err, balance) {
                console.log(err);
                var parsedBalance = parseLunoBalance(balance, wallet);
                resolve(parsedBalance);
            });
    });
};

module.exports = {
    getTickerPromise,
    getBalancePromise
};