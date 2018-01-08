var request = require('request');

var getRandEuroRatePromise = function () {
    return new Promise(function (resolve, reject) {
        var url = 'https://api.fixer.io/latest?symbols=ZAR,EUR';
        request(url, function (error, response, body) {

            var responseObj = JSON.parse(body);
            resolve(responseObj.rates.ZAR);

        });
    });

};

module.exports = {
    getRandEuroRatePromise
}