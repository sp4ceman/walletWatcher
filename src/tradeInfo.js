var parseTradeInfo = function (results) {

    var lunoPrice = results[0];
    var krakenPrice = results[1].price;

    var returnObj = {
        lunoPrice: lunoPrice,
        krakenPrice: krakenPrice,
        walletInfo: new Array()
    };

    //SKIP TO 2 - arr holds luno & kraken in front
    for (let index = 2; index < results.length; index++) {

        var element = results[index];
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

        returnObj.walletInfo.push(_walletInfoObj);
    };
    return returnObj;
};

var displayTradeInfo = function (objTradeInfo) {
    console.clear();
    console.log('kraken price (EUR)  :::: ' + objTradeInfo.krakenPrice);
    console.log('luno price (ZAR)    :::: ' + objTradeInfo.lunoPrice);
    console.log('-------------------------------');

    //SKIP ZERO. ZERO IS THE PRICE PAIR
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