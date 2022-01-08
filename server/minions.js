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

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
  });

minionsRouter.post('/:minionId/work', (req, res, next) => {
    let newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
  });

  minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      updatedWork = updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
    }
  });
  
  minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });

module.exports = minionsRouter;