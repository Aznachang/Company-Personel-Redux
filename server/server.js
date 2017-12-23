/** Express **/ 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

/** Mongo Config **/
const mongoUri = 'mongodb://localhost/companies';
mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', ()=> {
	throw new Error('unabled to connect to database at ' + mongoUri);
});

/** Swagger **/
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  info: {
    title: 'Sigfig RPT Swagger API',
    version: '1.0.0',
    description: 'Rest APIs for the front end programming test',
  },
  host: 'localhost:3001',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./*.js', './models/*.js'],
};

// initialize swagger-jsdoc
app.swaggerSpec = swaggerJSDoc(options);

/** Serve Up Static Files **/
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'build')));
	app.use('/swagger', express.static('../swagger'));
	// app.use('/src', express.static('../src'));
  app.use('/curtis', express.static('../curtisCaliTestCode'));
  app.use('/angular-rpt', express.static('../angular-rpt'));
  app.use('/aishwara', express.static('../aishwara'));
	app.use('/marcus', express.static('../marcus'));
  app.use('/vince', express.static('../vince'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/** IMPORT Mongo Schemas and Backend Routes **/
require('./models/company.js');
require('./models/person.js');
require('./routes.js')(app);

/** Spin up server on 'prod' port or port:3001 **/
const port = process.env.PORT || 3001;
app.listen(port);
console.log(`Listening on port: ${port}...`);
