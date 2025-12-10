const categoryRoutes = require('./categoryRoutes');
const subCategoryRoutes = require('./subCategoryRoutes');
const brandRoutes = require('./brandRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const reviewRoutes = require('./reviewRoutes');
const wishListRoutes = require('./wishlistRoutes');
const addressRoutes = require('./addressRoutes');
const couponRoutes = require('./couponRoutes');
const cartRoutes = require('./cartRoutes');

const mountRoutes = (app) => {
    app.use('/api/categories' , categoryRoutes);
    app.use('/api/subCategories' , subCategoryRoutes);
    app.use('/api/brands' , brandRoutes);
    app.use('/api/products' , productRoutes);
    app.use('/api/users' , userRoutes);
    app.use('/api/auth' , authRoutes);
    app.use('/api/reviews' , reviewRoutes);
    app.use('/api/wishlist' , wishListRoutes);
    app.use('/api/address' , addressRoutes);
    app.use('/api/coupon' , couponRoutes);
    app.use('/api/cart' , cartRoutes);
};

module.exports = mountRoutes;