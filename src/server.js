const rethink = require('rethinkdb');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const moment = require('moment');

const PORT = 4206;

// set the static files location /public/img will be /img for users
// app.use(express.static(__dirname + '/public'));

var cors = require('cors');
app.options('*', cors());
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

let conn = null;
rethink.connect({db: 'lafda'}, (err, connection) => conn = connection);

app.listen(PORT);
console.log(`listening on port ${PORT}`);

// app.get('*', function(req, res) {
//   res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// return all players
app.get('/api/players', function(req, res, next) {
  rethink.table('players').run(conn, function(error, cursor) {
    if (error) {
      res.status(500).json(error);
      next();
    }

    cursor.toArray(function(error, result) {
      if (error) {
        res.status(500).json(error);
        next();
      }

      res.json(result);
    });
  });
});

// create player
app.post('/api/players', function(req, res, next) {
  const player = req.body;

  rethink.table('players').insert(player).run(conn, function(error, result) {
    if (error) {
      res.status(500).json(error);
      next();
    }
    res.json(result);
  });
});

// update player
app.put('/api/players/:id', function(req, res, next) {

});

// delete player
app.delete('/api/players/:id', function(req, res, next) {

});
