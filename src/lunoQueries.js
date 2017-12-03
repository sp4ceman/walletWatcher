const bitx = require('bitx')();

var getTickerPromise = function () {
    return new Promise(function (resolve, reject) {
        bitx.getTicker(function (err, ticker) {
            resolve(ticker.last_trade);
        });
    });
};

module.exports = {
    getTickerPromise
};