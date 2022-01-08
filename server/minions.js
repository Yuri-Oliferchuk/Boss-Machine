const express = require('express');
const minionsRouter = express.Router();
const {getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,} = require('./db.js');


// Check minions ID
minionsRouter.use('/:minionId', (req, res, next) => {
    for(let element in getAllFromDatabase('minions')) {
        if (getAllFromDatabase('minions')[element].id == req.params.minionId) {
            req.idInBase = element;
            next();
        }
    }
    res.status(404).send();
});


minionsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res) => {
    const minion = getFromDatabaseById('minions', req.params.minionId)
    res.send(minion);
});

minionsRouter.post('/', (req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
  });

minionsRouter.put('/:minionId', (req, res) => {
    const minion = req.body;
    minion.id = req.params.minionId;
    updateInstanceInDatabase('minions', minion);
    res.send(minion);

});

minionsRouter.delete('/:minionId', (req, res) => {
    deleteFromDatabasebyId('minions', req.params.minionId)
    res.status(204).send();
});
 
module.exports = minionsRouter;