const express = require('express');
const app = express();
require('dotenv').config();
const { testConnection } = require('./databaseCon/databaseConnection');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
};
const router=require('./routes/routes');
app.use('/user',router);
app.use(cors(corsOptions));
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
testConnection();
});
