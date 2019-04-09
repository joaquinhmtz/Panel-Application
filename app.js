var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var port = process.env.PORT || 3005;
var ip = process.env.PANEL_IP;
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());

mongoose.connect('mongodb://' + 'ip' + '/panel', { useNewUrlParser: true }, function (err) {
    if (err) return console.log('Error al conectarse a la base', err);
    console.log('Conexión a la base exitosa');
});

require('./routes/UserRoute.js')(app);
require('./routes/ProfileRoute.js')(app);

app.listen(port, function () {
    console.log('Servidor corriendo en http://localhost:' + port);
});