const express = require('express');
const cors = require('cors');
const { config } = require('./config/index');
const projectsApi = require('./routes/projects');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

const app = express();

app.use(express.json());
app.use(cors());

// routes
projectsApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
