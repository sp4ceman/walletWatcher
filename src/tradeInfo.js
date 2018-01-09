
var constants = require('./constants');

var _buildTestTransaction = function (results) {

    var exchangeRate = results[2];
    var testAmountRands = 100000;

    var testWallet = {
        name: 'VIRTUAL TEST TRANSACTION',
        forexOutAmt: testAmountRands
    };

    var element = {
        balance: testAmountRands / exchangeRate,
        wallet: testWallet
    };

    return _buildSingleTransaction(element, results);
};

var _buildSingleTransaction = function (element, results) {
    var lunoPrice = results[0];
    var krakenPrice = results[1].price;


    var krakenBalance = element.balance;
    var amountOfCoin = element.balance / krakenPrice;
    var lunoSale = amountOfCoin * lunoPrice;
    var wallet = element.wallet;
    var forexOutAmt = 0;
    var lunoProfit = 0;
    var profitPercent = 0;

    if (element.wallet.forexOutAmt) {
        forexOutAmt = element.wallet.forexOutAmt;
        lunoProfit = lunoSale - forexOutAmt;
        profitPercent = ((lunoSale / forexOutAmt) * 100) - 100;
    }

    var _walletInfoObj = {
        wallet: wallet,
        amountOfCoin: amountOfCoin,
        lunoSale: lunoSale,
        krakenBalance: krakenBalance,
        forexOutAmt: forexOutAmt,
        lunoProfit: lunoProfit,
        profitPercent: profitPercent
    };

    return _walletInfoObj;

}

var parseTradeInfo = function (results) {
    var lunoPrice = results[0];
    var krakenPrice = results[1].price;
    var exchangeRate = results[2];

    var returnObj = {
        lunoPrice: lunoPrice,
        krakenPrice: krakenPrice,
        exchangeRate: exchangeRate,
        walletInfo: new Array()
    };

    var rawTestTrans = _buildTestTransaction(results);
    returnObj.walletInfo.push(rawTestTrans);

    //SKIP TO 3 - arr holds luno & kraken & rates in front
    for (let index = 3; index < results.length; index++) {
        var element = results[index];

        var _walletInfoObj = _buildSingleTransaction(element, results);
        returnObj.walletInfo.push(_walletInfoObj);
    };

    return returnObj;
};

var displayTradeInfo = function (objTradeInfo) {
    //console.clear();
    console.log('kraken price (EUR)  :::: ' + objTradeInfo.krakenPrice);
    console.log('luno price (ZAR)    :::: ' + objTradeInfo.lunoPrice);
    console.log('raw exchange rate   :::: ' + objTradeInfo.exchangeRate);
    console.log('-------------------------------');

    for (let index = 0; index < objTradeInfo.walletInfo.length; index++) {
        var element = objTradeInfo.walletInfo[index];
        console.log(element.wallet.name);
        console.log('kraken balance (EUR):::: ' + element.krakenBalance);
        console.log('kraken can purchase :::: ' + element.amountOfCoin);
        console.log('est luno sale       :::: ' + element.lunoSale);
        console.log('money sent out      :::: ' + element.forexOutAmt);
        console.log('luno profit         :::: ' + element.lunoProfit);
        console.log('profit percentage   :::: ' + element.profitPercent);
        console.log('-------------------------------');
    }
};

module.exports = {
    parseTradeInfo,
    displayTradeInfo
};