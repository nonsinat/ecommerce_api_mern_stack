const express = require('express');
require('dotenv').config();
const timeout = require('connect-timeout');
const requestTimeout = require('./helpers/request_timeout');
const app = express();
const connectDB =require('./db/connect');
const {authRoute} = require('./routes/index_route');
const cRoute = require('./routes/category_route');
const errorHandler = require('./errors/server_error');
const {authHeader}  = require('./middleware/authentication_middleware');
const {isAdmin} = require('./middleware/is_admin_middleware')
const pRoute = require('./routes/product_route')
const formidable = require('express-formidable')
// middleware
app.use(timeout('60s'));
app.use(express.json()); 
app.use(errorHandler);

// Error handling for request timeout
app.use(requestTimeout);

app.use('/api/v1/ecommerce/auth',authRoute);
app.use('/api/v1/ecommerce/category',authHeader,isAdmin,cRoute);
app.use('/api/v1/ecommerce/product',authHeader,isAdmin,formidable(),pRoute);

const port = process.env.PORT || 4321;

const start = async () => { 
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>console.log(`server running on PORT: ${port}....`));
    } catch (error) {
        console.log(`server error: ${error}`); 
    }
}
start()
