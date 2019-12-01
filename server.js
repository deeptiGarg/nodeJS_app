const express = require('express');
const dotenv = require('dotenv');
//const logger = require('./middleware/logger');
const morgan = require('morgan');
// Route files
const bootcamps = require('./routes/bootcamps');
const connectDB = require('./config/db');

//Load env variables from config file
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

// Log only if in DEV environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//app.use(logger);

// Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});
