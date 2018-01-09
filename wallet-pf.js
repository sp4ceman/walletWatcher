var exchangeManager = require('./src/exchangeManager');
var tradeInfo = require('./src/tradeInfo');
var fs = require('fs');


var walletsArray = JSON.parse(fs.readFileSync('wallets.json', 'utf8'));

var _handleRequestPromises = function (results) {

    for (let index = 0; index < results.length; index++) {
        var element = results[index];
        console.log(element);
    };
};

var _buildRequestPromiseChain = function (_walletsToProcess) {

    var promiseArray = new Array();
    for (let index = 0; index < _walletsToProcess.length; index++) {
        var _wallet = _walletsToProcess[index];

        var exchangeArr = exchangeManager.loadExchanges(_wallet);
        for (let ii = 0; ii < exchangeArr.length; ii++) {
            promiseArray.push(exchangeArr[ii].getBalancePromise(_wallet));
        }
    }

    Promise.all(promiseArray).then(_handleRequestPromises);
};

var main = function () {

    _buildRequestPromiseChain(walletsArray);
    // var promiseArray = new Array();
    // promiseArray.push(krakenQueries.tester(walletsArray[0]));

    // Promise.all(promiseArray).then(function (results) {

    //     for (let index = 0; index < results.length; index++) {
    //         var element = results[index];
    //         console.log(element);
    //     };

    // });


}

main();
