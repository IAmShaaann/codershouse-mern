require('dotenv').config();  //import the env file for required credentials.
const express = require('express'); //import the express file. 
const app = express(); //object of express.
const router = require('./routes'); //fetching the router. 
const PORT = process.env.PORT || 3000; //setting ports.
const bodyParser = require('body-parser');


app.use(router); //using router. 

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("Hello from express Js");
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); 