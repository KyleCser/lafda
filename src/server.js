const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const assert = require('assert');
const http = require('http');

const PORT = process.env.PORT;

// set the static files location /public/img will be /img for users
// app.use(express.static(__dirname + '/public'));

var whitelist = ['http://localhost:4200'];
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    var whiteListed = (whitelist.filter(function (url) {
      return url.indexOf(origin) > -1;
    }) || []).length > 0;

    // allow all for now
    if (whiteListed || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));

const MongoClient = require('mongodb').MongoClient;

// Use connect method to connect to the server
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  assert.equal(null, err);
  let db = client.db('lafda');
  app.locals.db = db;
});

const players = require('./routes/players');

app.use('/api/players', players);

const server = http.createServer(app);
server.listen(PORT, () => console.log(`listening running on localhost:${PORT}`));
