const express = require('express');
const ideasRouter = express.Router();
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,} = require('./db.js');

ideasRouter.param('ideaId', (req, res, next, id) => {
    let ideas = getFromDatabaseById('ideas', id);
    if (ideas) {
        req.ideas = ideas;
        next();
    } else {
        console.log('stop')
        res.status(404).send();
    }

})

ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res) => {
    res.send(req.ideas);
});

ideasRouter.post('/', (req, res) => {
    let newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', (req, res) => {
    const ideaUpdate = req.body;
    ideaUpdate.id = req.params.ideaId;
    updateInstanceInDatabase('ideas', ideaUpdate)
    res.send(ideaUpdate);
})

ideasRouter.delete('/:ideaId', (req, res) => {
    deleteFromDatabasebyId('ideas', req.params.ideaId)
    res.status(204).send();
})

module.exports = ideasRouter;