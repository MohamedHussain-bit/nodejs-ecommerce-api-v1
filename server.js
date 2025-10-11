require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const  mongoose = require('mongoose');

const connectBD = require('./config/connectDB');
const categoryRoutes = require('./routes/categoryRoutes')
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware')


const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json())

connectBD()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode ${process.env.NODE_ENV}`);
};

// Mount routes
app.use('/api/categories' , categoryRoutes);


app.use((req , res , next) => {
    // const err = new Error(`cannot find this route : ${req.originalUrl}`);
    // next(err.message);
    next(new ApiError(`cannot find this route : ${req.originalUrl}` , 400));
});

// Global error handling middleware
app.use(globalError);

mongoose.connection.once('open' , () => {
    console.log('Connected with database successfully');
    const server = app.listen(PORT , () => {
    console.log(`Server runing on port ${PORT}`);
});
});
// mongoose.connection.on('error' , (err) => {
//     console.log(err);
// });

// Handel rejection outside express
process.on("unhandledRejection" , (err) => {
    console.error(`UnhandledRejectionError : ${err}`);
    server.close(() => {
        console.error(`Shutting down.....`);
        process.exit(1);
    });
});