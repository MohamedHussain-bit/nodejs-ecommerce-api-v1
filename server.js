const path = require('path');

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

const connectBD = require('./config/connectDB');

const mountRoutes = require('./routes/index');
// const categoryRoutes = require('./routes/categoryRoutes')
// const subCategoryRoutes = require('./routes/subCategoryRoutes');
// const brandRoutes = require('./routes/brandRoutes');
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
// const wishListRoutes = require('./routes/wishlistRoutes');
// const addressRoutes = require('./routes/addressRoutes');
// const couponRoutes = require('./routes/couponRoutes');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware')


const PORT = process.env.PORT || 5000

const app = express();

// Enable cors
app.use(cors());

// Compress all response
app.use(compression());

app.use(express.json())
app.use(express.static(path.join(__dirname , 'uploads')));

connectBD()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`mode ${process.env.NODE_ENV}`);
};

// Mount routes
mountRoutes(app);
// app.use('/api/categories' , categoryRoutes);
// app.use('/api/subCategories' , subCategoryRoutes);
// app.use('/api/brands' , brandRoutes);
// app.use('/api/products' , productRoutes);
// app.use('/api/users' , userRoutes);
// app.use('/api/auth' , authRoutes);
// app.use('/api/reviews' , reviewRoutes);
// app.use('/api/wishlist' , wishListRoutes);
// app.use('/api/address' , addressRoutes);
// app.use('/api/coupon' , couponRoutes);


app.use((req , res , next) => {
    // const err = new Error(`cannot find this route : ${req.originalUrl}`);
    // next(err.message);
    next(new ApiError(`cannot find this route : ${req.originalUrl}` , 400));
});

// Global error handling middleware
app.use(globalError);

mongoose.connection.once('open' , () => {
    console.log('Connected with database successfully');
});

const server = app.listen(PORT , () => {
    console.log(`Server runing on port ${PORT}`);
});
// mongoose.connection.on('error' , (err) => {
//     console.log(err);
// });

// Handel rejection outside express
process.on("unhandledRejection" , (err) => {
    console.error(`UnhandledRejectionError : ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down.....`);
        process.exit(1);
    });
});