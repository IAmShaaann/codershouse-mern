require('dotenv').config();  //import the env file for required credentials.
const express = require('express'); //import the express file. 
const app = express(); //object of express.
const router = require('./routes'); //fetching the router. 
const PORT = process.env.PORT || 5500; //setting ports.
const bodyParser = require('body-parser');
const DbConnect = require('./database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/storage', express.static('storage'));

DbConnect();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from express Js");
})
app.use(router); //using router. 
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); 