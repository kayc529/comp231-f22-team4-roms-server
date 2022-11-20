require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//handlers
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

//db
const connectDB = require('./db/connect');

//packages
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//routers
const authRouter = require('./routes/authRoutes');
const menuRouter = require('./routes/menuRoutes');
const orderRouter = require('./routes/orderRoutes');

//middlewares(just some useful 3rd party packages)
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.static('./public'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload({ useTempFiles: true }));

//routes
app.get('/', (req, res) => {
  res.send(
    '<div>Available apis: "/api/v1/auth", "/api/v1/menu", "/api/v1/orders"</div>'
  );
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/orders', orderRouter);

//HANDLERS MUST BE PLACED AFTER THE ROUTES
//not found handler
app.use(notFoundHandler);
//error handler
app.use(errorHandler);

const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () => {
      //if this log is shown in the console, it means everything is running normally
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
