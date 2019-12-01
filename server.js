const express = require('express');
const dotenv = require('dotenv');
//const logger = require('./middleware/logger');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// Route files
const bootcamps = require('./routes/bootcamps');
const connectDB = require('./config/db');
const auth = require('./routes/auth');

//Load env variables from config file
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());

// Log only if in DEV environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//app.use(logger);

// Mount Routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});
