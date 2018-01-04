const kraken = require('kraken-api-wrapper')();
var constants = require('./constants');
const EXCHANGE_NAME = 'kraken';


var exchange_constants = {
    KRAKEN_EURO_BALANCE_CODE: 'ZEUR',
    KRAKEN_PAIR_CODE: 'BTCEUR',
    KRAKEN_REPONSE_PAIR_CODE: 'XXBTZEUR',
    BITCOIN_CURR_CODE: 'XXBT'
};


var _parseTickerLastTrade = function (result, name) {

    var lastTradePrice = result[exchange_constants.KRAKEN_REPONSE_PAIR_CODE].c[0];
    return {
        name: name,
        price: lastTradePrice
    };
};

var getTickerPromise = function () {
    return kraken.Ticker({ pair: exchange_constants.KRAKEN_PAIR_CODE })
        .then(result => _parseTickerLastTrade(result, exchange_constants.KRAKEN_PAIR_CODE))
        .catch(err => console.error(err));
};

var _parseKrakenBalanceForWallet = function (result, wallet) {

    var _balance = result[exchange_constants.KRAKEN_EURO_BALANCE_CODE];

    return {
        balance: _balance,
        wallet: wallet
    };
};

var _parseKrakenBalance = function (result, wallet) {

    var balanceObj = {
        exchange: EXCHANGE_NAME,
        balanceArr: new Array()
    };

    var balanceArr = [
        {
            krkCode: exchange_constants.KRAKEN_EURO_BALANCE_CODE,
            key: constants.codes.EURO
        },

        {
            krkCode: exchange_constants.BITCOIN_CURR_CODE,
            key: constants.codes.BITCOIN
        }
    ];

    for (let index = 0; index < balanceArr.length; index++) {
        var element = balanceArr[index];

        var singleBalanceObj = {
            key: element.key,
            balance: result[element.krkCode]
        };

        console.log(singleBalanceObj);

        balanceObj.balanceArr.push(singleBalanceObj);
    };

    return balanceObj;

};


var _errorHandler = function (error) {

};

var getWalletPromise = function (_wallet) {
    // Get tradable balances  
    kraken.setPublicKey(_wallet.krakenPublicKey);
    kraken.setSecreteKey(_wallet.krakenSecretKey);

    kraken.setRequestTime(5000)
    var requestPromise = kraken.Balance()
        .then(result => _parseKrakenBalanceForWallet(result, _wallet))
        .catch(err => _errorHandler(err));


    return requestPromise;
};

var getBalancePromise = function (_wallet) {

    // Get tradable balances  
    kraken.setPublicKey(_wallet.krakenPublicKey);
    kraken.setSecreteKey(_wallet.krakenSecretKey);

    kraken.setRequestTime(5000)
    var requestPromise = kraken.Balance()
        .then(result => _parseKrakenBalance(result, _wallet))

    return requestPromise;
};


module.exports = {
    getTickerPromise,
    getWalletPromise,
    getBalancePromise
};