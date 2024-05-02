
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongooseConnection from './connection/db';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';


const app = express();
const PORT = process.env.PORT || 3000;

// Check MongoDB connection status
mongooseConnection.once('open', () => {
    console.log('MongoDB connection is open');
});

app.use(bodyParser.json())
app.use('/api/v1',userRoutes)



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

