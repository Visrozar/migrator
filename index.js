// require express
const express = require('express');
// secure apps by setting various HTTP headers
const helmet= require('helmet');
// require router to define routes
const router = express.Router();
// initialise the express application
const app = express();
// including the routes file which includes all the routes
const routes = require('./routes/routes')(router);
// require body-parser to parse JSON
const bodyParser = require('body-parser');
// require express-rate-limiter for request rate limiting
const RateLimit = require('express-rate-limit');
// define the port to host
const port = process.env.PORT || 8080;
// import cors for CORS calls
const cors = require('cors');

// the request rate limiting function
const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5000, // limit each IP to 5000 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});
// middleware to apply to all requests
app.use(limiter);

app.use(helmet());
// middleware for CORS
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//parse application/json
app.use(bodyParser.json({ extended: true }));

// root routes connecting to the routes file
app.use('/', routes);

// if route unknown send 404
app.get('**', function (req, res) {
    res.send('404');
});

// if route unknown send 404
app.post('**', function (req, res) {
    res.send('404');
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
})

process.on('uncaughtException', function (exception) {
    console.log(exception); // to see your exception details in the console
    // if you are on production, maybe you can send the exception details to your
    // email as well ?
});

// Finally listen to the port
app.listen(port, () => {
    console.log(`Listening to Port ${port}`);
});

/**
 * Export the Express app so that it can be used by Chai
 */
module.exports = app;