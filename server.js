require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const  mongoose = require('mongoose');

const connectBD = require('./config/connectDB');
const categoryRoutes = require('./routes/categoryRoutes')


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


// Global error handling middleware
app.use((err , req , res , next) => {
    res.status(500).json({err});
});

mongoose.connection.once('open' , () => {
    console.log('Connected with database successfully');
    app.listen(PORT , () => {
    console.log(`Server runing on port ${PORT}`);
});
});
mongoose.connection.on('error' , (err) => {
    console.log(err);
});