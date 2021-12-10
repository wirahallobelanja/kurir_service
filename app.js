const express = require('express');
const cors = require('cors');

const app = express();

const distanceRouter = require('./routers/distanceRouter')
const errorHandler = require('./middleware/errorHandler');
const userController = require('./routers/usersRouter')
const kurirController = require('./routers/provinces')
const pickupController = require('./routers/pickupRouter')

app.use(express.urlencoded({extended:false}))

app.use(cors())

app.use('/distance', distanceRouter);
app.use('/user', userController)
app.use('/kurir', kurirController);
app.use('/pickup', pickupController)
app.use(errorHandler);

module.exports = app