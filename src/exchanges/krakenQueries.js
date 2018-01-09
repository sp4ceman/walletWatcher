const kraken = require('kraken-api-wrapper')();
var constants = require('../constants');
const EXCHANGE_NAME = 'kraken';


var exchange_constants = {
    KRAKEN_PAIR_CODE: 'BTCEUR',
    KRAKEN_REPONSE_PAIR_CODE: 'XXBTZEUR',
    EURO_CURR_CODE: 'ZEUR',
    BITCOIN_CURR_CODE: 'XXBT',
    ETHEREUM_CURR_CODE: 'XETH'
};

var _errorHandler = function (error) {
    console.log(error);
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

    var _balance = result[exchange_constants.EURO_CURR_CODE];

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

    var codeTranslate = [];
    codeTranslate[exchange_constants.EURO_CURR_CODE] = constants.codes.EURO;
    codeTranslate[exchange_constants.BITCOIN_CURR_CODE] = constants.codes.BITCOIN;
    codeTranslate[exchange_constants.ETHEREUM_CURR_CODE] = constants.codes.ETHEREUM;

    for (let index = 0; index < Object.keys(result).length; index++) {
        var key = Object.keys(result)[index];

        var element = result[key];

        var singleBalanceObj = {
            key: codeTranslate[key],
            balance: element
        };

        balanceObj.balanceArr.push(singleBalanceObj);
    };

    return balanceObj;

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

function getTradeHistoryPromise(_wallet) {
    kraken.setPublicKey(_wallet.krakenPublicKey);
    kraken.setSecreteKey(_wallet.krakenSecretKey);

    kraken.setRequestTime(5000)
    var requestPromise = kraken.TradesHistory();
    return requestPromise;
};

function getWithdrawalHistoryPromise(_wallet, code) {
    kraken.setPublicKey(_wallet.krakenPublicKey);
    kraken.setSecreteKey(_wallet.krakenSecretKey);

    kraken.setRequestTime(5000)
    var requestPromise = kraken.WithdrawStatus({ asset: code });
    return requestPromise;
}


module.exports = {
    getTickerPromise,
    getWalletPromise,
    getBalancePromise,
    getTradeHistoryPromise,
    getWithdrawalHistoryPromise,

};