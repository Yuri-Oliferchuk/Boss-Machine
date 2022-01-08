const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minions.js')
const ideasRouter = require('./ideas.js')

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter)
 
module.exports = apiRouter;
