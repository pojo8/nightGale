let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser')
    dbConfig = require('./db/database');


const fileUpload = require('express-fileupload');

// Connecting to mongoDb
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected: ' + error)
    }
)

// Setting up express
const app = express();
app.use(fileUpload());
app.use(bodyParser({limit: '16mb'}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

//User Api roots
const contractorRoute = require('./routes/contractor.route')
const loginRoute = require('./routes/login.route')
const workProfileRoute = require('./routes/workProfile.route')
const cardInfoRoute = require('./routes/cardInfo.route')
const calendarEventRoute = require('./routes/calendarEvent.route')

app.use('/endpoint', [calendarEventRoute, cardInfoRoute, contractorRoute, loginRoute, workProfileRoute])

// Create port
const port = process.env.PORT || 8080;

// Connecting to the port
const server = app.listen(port,() => {
    console.log('Port connected to: ' +port)
})

// Find 404 and hand it over to the error handler
app.use((request, response, next) => {
    next(createError(404))
});

// Index route
app.get('/', (request, response) => {
    response.send('Invalid endpoint')
});

// error handler
app.use(function (error, request, response, next) {
    // console.warn(request)
    console.error(error.message);
    if (!error.statusCode) error.statusCode = 500;
    response.status(error.statusCode).send(error.message);
});

// Static build location
app.use(express.static(path.join(__dirname,'dist')));