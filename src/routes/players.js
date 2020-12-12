const { ObjectID } = require('mongodb');

const router = require('express').Router();

// return all players
router.get('/', async function(req, res, next) {
  const db = req.app.locals.db;
  const players = db.collection("players");
  res.send(await players.find().toArray());
});

// create player
router.post('/', async function(req, res, next) {
  const db = req.app.locals.db;
  const players = db.collection("players");
  const player = req.body;
  
  const insertResult = await players.insertOne(player);
  res.json({ success: insertResult.insertedCount === 1, ...player });
});

// update player
router.put('/:id', async function(req, res, next) {
  const db = req.app.locals.db;
  const players = db.collection("players");
  const player = req.body;
  delete player['_id'];

  const updateResult = await players.update({ '_id': ObjectID(req.params.id) }, player);
  res.json({ success: updateResult.upsertedCount === 1 || updateResult.modifiedCount === 1 });
});

// delete player
router.delete('/:id', async function(req, res, next) {
  const db = req.app.locals.db;
  const players = db.collection("players");

  const deleteResult = await players.deleteOne({_id: ObjectID(req.params.id)});
  res.json({ success: deleteResult.deletedCount === 1 });
});

module.exports = router;
