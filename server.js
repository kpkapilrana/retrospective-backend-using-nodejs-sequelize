process.env.NODE_ENV = process.env.NODE_ENV || 'development-local';

const express = require('express');
const packageJsonPath = `${process.cwd()}/package.json`;
const fs = require('fs');

const probe = require('kube-probe');

const logUtils = require('./utilities/logUtils');


console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
const app = express();

probe(app);
const middlewares = require('./middlewares')(app);
middlewares.configureMiddlewares();

// const expressSwagger = require('express-swagger-generator')(app);


const db = require('./utilities/db');
db.sequelize.authenticate()
  .then(() => {
    console.info('Connection has been established successfully.');

    return sequelize.sync({
        // force: config.recreateDB
      })
      .then(() => {
        console.info('Database syncronized.');

        initServer();

        return sequelize;
      })

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    console.error('Please check and validate datastore db values');
  });





function initServer() {
  const services = require('./services');


  logUtils.initDebugLogging(app);

  services(app);
  logUtils.initErrorLogging(app);

  const port = process.env.PORT || 8080;
  const env = process.env.NODE_ENV || 'development-local';

  app.listen(port, () => {
    console.info(`Server started on environment: ${env} and listening on port: ${port}`)
  });


}


module.exports = app;