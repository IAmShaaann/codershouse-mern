require('dotenv').config();  //import the env file for required credentials.
const express = require('express'); //import the express file. 
const app = express(); //object of express.
const router = require('./routes'); //fetching the router. 
const PORT = process.env.PORT || 5500; //setting ports.
const bodyParser = require('body-parser');
const DbConnect = require('./database');
const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000'],
}

app.use(cors(corsOptions));


DbConnect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())  
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from express Js");
})
app.use(router); //using router. 
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); 