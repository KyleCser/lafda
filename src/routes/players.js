const router = require('express').Router();
const rethink = require('rethinkdb');

let conn = null;
rethink.connect({db: 'lafda'}, (err, connection) => {
  if (err) return err;
  conn = connection;
});

// return all players
router.get('/', function(req, res, next) {
  rethink.table('players').run(conn, (error, cursor) => {
    if (error) {
      res.status(500).json(error);
      next();
    }

    if (cursor !== undefined) {
      cursor.toArray(function (error, result) {
        if (error) {
          res.status(500).json(error);
          next();
        }
        res.json(result);
      });
    }
  });
});

// create player
router.post('/', function(req, res, next) {
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
router.put('/:id', function(req, res, next) {
  const player = req.body;

  rethink.table('players').get(req.params.id).update(player)
    .run(conn, function(error, result) {
      if (error) {
        res.status(500).json(error);
        next();
      }
      res.json(result);
    });
});

// delete player
router.delete('/:id', function(req, res, next) {
  rethink.table('players').get(req.params.id).delete()
    .run(conn, function(error, result) {
      if (error) {
        res.status(500).json(error);
        next();
      }
      res.json(result);
    });
});

module.exports = router;
