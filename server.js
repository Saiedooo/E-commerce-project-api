const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config.env' });
const APiError = require('./utils/apiError');
const GlobalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
const categoryRoute = require('./Routes/categoryRoutes');
const subCategoryRoute = require('./Routes/subCategoryRoute');
const brandRoute = require('./Routes/brandRoutes');
const productModel = require('./models/productModel');
const productRoute = require('./Routes/productRoutes');
// console.log(`DB URI: ${process.env.DB_URI}`);

// Connection with db
dbConnection();

// express app
const app = express();
// MiddleWares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/products', productRoute);

app.all('*', (req, res, next) => {
  next(new APiError(`Can't find this Route: ${req.originalUrl} `, 400));
});
app.use(GlobalError);

// Server running
const PORT = process.env.PORT || 8000;
const Server = app.listen(PORT, () => {
  console.log(`APP runing on port ${PORT}!`);
});

// handling rejection database error
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  Server.close(() => {
    console.log(`Shutting down.....`);

    process.exit(1);
  });
});
