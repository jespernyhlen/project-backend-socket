var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const stock = require('./stock.js');

io.origins(['https://project-frontend.jespernyhlenjs.me:443']);

var stone = {
    name: 'stone',
    rate: 1.001,
    variance: 0.6,
    startingPoint: 18
};

var gold = {
    name: 'gold',
    rate: 1.001,
    variance: 0.4,
    startingPoint: 20
};
var bronze = {
    name: 'bronze',
    rate: 1.0009,
    variance: 0.4,
    startingPoint: 23
};

var silver = {
    name: 'silver',
    rate: 1.0011,
    variance: 0.5,
    startingPoint: 17
};
var items = [gold, silver, bronze, stone];

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

setInterval(function() {
    items.map(item => {
        item['startingPoint'] = stock.getStockPrice(item);
        return item;
    });

    io.emit('stocks', items);
}, 500);

http.listen(8777, function() {
    console.log('listening on port:8777');
});
