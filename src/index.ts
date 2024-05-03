
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongooseConnection from './connection/db';
import bodyParser from 'body-parser';
import  specs  from './swaggerConfig';
import swaggerUi from 'swagger-ui-express'
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import productReviewRoutes from './routes/productReviewRoutes';


const app = express();
const PORT = process.env.PORT || 3000;

// Check MongoDB connection status
mongooseConnection.once('open', () => {
    console.log('MongoDB connection is open');
});

app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/v1',userRoutes)
app.use('/api/v1',adminRoutes)
app.use('/api/v1',categoryRoutes)
app.use('/api/v1',productRoutes)
app.use('/api/v1',cartRoutes)
app.use('/api/v1',orderRoutes)
app.use('/api/v1',productReviewRoutes)



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

