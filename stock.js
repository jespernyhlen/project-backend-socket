var stock = {
    randomAroundZero: function() {
        return Math.random() > 0.5 ? 1 : -1;
    },

    stockChance: function() {
        return Math.round(Math.random() * 30) === 1;
    },

    getStockPrice: function(input) {
        let start = input.startingPoint;
        let rate = input.rate;
        let variance = input.variance;
        let price = start * rate + variance * stock.randomAroundZero();

        return Math.round(price * 100) / 100;
    }
};

module.exports = stock;
