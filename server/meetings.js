const express = require('express');
const meetingsRouter = express.Router();
const {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,} = require('./db.js');

meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res) => {
    const newMeetings = createMeeting();
    addToDatabase('meetings', newMeetings);
    res.status(201).send(newMeetings);
});

meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;