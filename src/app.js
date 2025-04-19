const express = require('express');
const connectDatabase  = require('./db/connection');
const skills = require('./routes/skills');
const quests = require('./routes/quests');
const stats = require('./routes/stats');
const uploader = require('./routes/imgsUploader');
const bodyParser= require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

const corsOptions = {
    origin: '*',
    credentials: true, 
    optionSuccessStatus: 200, 
  }

app.use(cors(corsOptions))
app.use('/', skills)
app.use('/', quests)
app.use('/', stats)
app.use('/', uploader)
// Conectar la base de datos
connectDatabase();

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log("Servidor corriendo en el puerto 3000");
});