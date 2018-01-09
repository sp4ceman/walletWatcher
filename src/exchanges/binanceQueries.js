const binance = require('node-binance-api');
const EXCHANGE_NAME = 'binance';

var getBalancePromise = function (_wallet) {

	return new Promise(function (resolve, reject) {

		binance.options({
			'APIKEY': _wallet.binancePublicKey,
			'APISECRET': _wallet.binanceSecretKey
		});

		binance.balance(function (balances) {

			var balanceObj = {
				exchange: EXCHANGE_NAME,
				balanceArr: new Array()
			};

			for (let index = 0; index < Object.keys(balances).length; index++) {
				var key = Object.keys(balances)[index];

				var element = balances[key];
				if (element.available > 0) {
					var singleBalanceObj = {
						key: key,
						balance: element.available
					};

					balanceObj.balanceArr.push(singleBalanceObj);
				};
			};

			resolve(balanceObj);
		});
	});


};




module.exports = {
	getBalancePromise
};