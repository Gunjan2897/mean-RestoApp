require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rtsIndex = require('./routes/index.router');

const port = 8000;
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api',rtsIndex);


app.listen(port,()=>console.log(`server running at port ${port}`));