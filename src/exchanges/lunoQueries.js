const bitx = require('bitx')();
const EXCHANGE_NAME = 'luno';

var getTickerPromise = function () {
    return new Promise(function (resolve, reject) {

        bitx.getTicker(function (err, ticker) {
            if (err)
            {
                console.log(err);
            }
            
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

        var singleBalanceObj = {
            key: element.asset,
            balance: element.balance
        };

        balanceObj.balanceArr.push(singleBalanceObj);
    }

    return balanceObj;

};

var getBalancePromise = function (wallet) {
    return new Promise(function (resolve, reject) {

        setAuth(wallet)
        bitx.getBalance(function (err, balance) {
            var parsedBalance = parseLunoBalance(balance, wallet);
            if (err) {
                reject(err);
            }
            else {
                resolve(parsedBalance);
            }

        });
    });
};

module.exports = {
    getTickerPromise,
    getBalancePromise
};