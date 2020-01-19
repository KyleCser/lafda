const rethink = require('rethinkdb');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
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
    if (whiteListed) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

let conn = null;
rethink.connect({db: 'lafda'}, (err, connection) => {
  if (err) return err;

  conn = connection;

  rethink.dbList().contains('lafda')
    .do(databaseExists => {
      return rethink.branch(
        databaseExists,
        { dbs_created: 0 },
        rethink.dbCreate('lafda')
      );
    }).run(conn);

  rethink.db('lafda').tableCreate('players').run(conn, (err, result) => {});
  rethink.db('lafda').tableCreate('games').run(conn, (err, result) => {});
});

// app.get('*', function(req, res) {
//   res.sendfile('./dist/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

const players = require('./routes/players');

app.use('/api/players', players);

const server = http.createServer(app);
server.listen(PORT, () => console.log(`listening running on localhost:${PORT}`));
