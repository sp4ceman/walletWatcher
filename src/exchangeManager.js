var krakenQueries = require('./exchanges/krakenQueries')
var lunoQueries = require('./exchanges/lunoQueries');
var binanceQueries = require('./exchanges/binanceQueries');
var altcoinTraderQueries = require('./exchanges/altcointraderQueries');

var loadExchanges = function (wallet) {
    
    var exchangeArr = new Array();

    exchangeArr.push(krakenQueries);
    exchangeArr.push(lunoQueries);
    exchangeArr.push(binanceQueries);
    exchangeArr.push(altcoinTraderQueries);

    return exchangeArr;
    
    //check on wallet for exchanges to load
    //return exchange array
};

module.exports = {
    loadExchanges
};