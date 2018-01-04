var krakenQueries = require('./src/krakenQueries')
var lunoQueries = require('./src/lunoQueries');
var binanceQueries = require('./src/binanceQueries');
var tradeInfo = require('./src/tradeInfo');
var fs = require('fs');


var walletsArray = JSON.parse(fs.readFileSync('wallets.json', 'utf8'));

var _handleRequestPromises = function (results) {
    var resultsObj = tradeInfo.parseTradeInfo(results);
    tradeInfo.displayTradeInfo(resultsObj);
};

var _buildRequestPromiseChain = function (_walletsToProcess) {

    var promiseArray = new Array();
    //the order in which things gets put into the array is important
    //first the luno price ticker  
    var getLunoTickerInfoPromise = lunoQueries.getTickerPromise();
    promiseArray.push(getLunoTickerInfoPromise);
    //then the kraken price ticker
    var getTickerInfoPromise = krakenQueries.getTickerPromise();
    promiseArray.push(getTickerInfoPromise);
    //then after those 2 comes each of the wallets on kraken
    for (let index = 0; index < _walletsToProcess.length; index++) {
        var _wallet = _walletsToProcess[index];
        promiseArray.push(krakenQueries.getWalletPromise(_wallet));
    }

    Promise.all(promiseArray).then(_handleRequestPromises);
};

var main = function () {
    _buildRequestPromiseChain(walletsArray);

}

main();
