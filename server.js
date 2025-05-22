const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes.js');
const dotenv = require('dotenv');
const db=require('./db.js');
const createSchoolTable = require('./tableSetup.js');
dotenv.config();

createSchoolTable();

app.use(express.json());
app.use('/',schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});


