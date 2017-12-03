const kraken = require('kraken-api-wrapper')();

var constants = {
    KRAKEN_BALANCE_CODE: 'ZEUR',
    KRAKEN_PAIR_CODE: 'BTCEUR',
    KRAKEN_REPONSE_PAIR_CODE: 'XXBTZEUR'
};

var _parseTickerLastTrade = function (result, name) {

    var lastTradePrice = result[constants.KRAKEN_REPONSE_PAIR_CODE].c[0];
    return {
        name: name,
        price: lastTradePrice
    };
};

var getTickerPromise = function () {
    return kraken.Ticker({ pair: constants.KRAKEN_PAIR_CODE })
        .then(result => _parseTickerLastTrade(result, constants.KRAKEN_PAIR_CODE))
        .catch(err => console.error(err));
};

var _parseKrakenBalance = function (result, wallet) {

    var _balance = result[constants.KRAKEN_BALANCE_CODE];

    return {
        balance: _balance,
        wallet: wallet
    };
};


var getWalletPromise = function (_wallet) {
    // Get tradable balances  
    kraken.setPublicKey(_wallet.krakenPublicKey);
    kraken.setSecreteKey(_wallet.krakenSecretKey);

    kraken.setRequestTime(5000)
    var requestPromise = kraken.Balance()
        .then(result => _parseKrakenBalance(result, _wallet))
        .catch(err => console.error(err));


    return requestPromise;
};


module.exports = {
    getTickerPromise,
    getWalletPromise
};