const EXCHANGE_NAME = 'altcointrader';
var constants = require('../constants');

//sick hack coz this exchange has no api and its annoying 
//i want to see it so i hard coded
var balanceObj = {
    exchange: EXCHANGE_NAME,
    balanceArr: [
        {
            key: constants.codes.NAMECOIN,
            balance: 6.944
        }
    ]
};

var getBalancePromise = function (_wallet) {
    return new Promise(function (resolve, reject) {
        resolve(balanceObj);
    });
};

module.exports = {
    getBalancePromise
};