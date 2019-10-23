const stock = require('./stock.js');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.origins([
    'https://project-frontend.jespernyhlenjs.me:443',
    'http://localhost:3000'
]);

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

server.listen(8777);
console.log('Listening on 8777');
