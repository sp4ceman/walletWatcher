const bitx = require('bitx')();
const EXCHANGE_NAME = 'luno';

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

    var balanceObj = {
        exchange: EXCHANGE_NAME,
        balanceArr: new Array()
    };

    for (let index = 0; index < result.balance.length; index++) {
        var element = result.balance[index];
        if (element.balance > 0) {
            var singleBalanceObj = {
                key: element.asset,
                balance: element.balance
            };

            balanceObj.balanceArr.push(singleBalanceObj);
        }
    }
    return balanceObj;
};

var getBalancePromise = function (wallet) {
    return new Promise(function (resolve, reject) {

        setAuth(wallet)
        bitx.getBalance(function (err, balance) {

            if (err) {
                console.log(err);
            }

            var parsedBalance = parseLunoBalance(balance, wallet);
            resolve(parsedBalance);
        });
    });
};

module.exports = {
    getTickerPromise,
    getBalancePromise
};