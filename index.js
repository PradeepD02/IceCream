const express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , config = require('./config/config')
  , db = require('./config/db');

app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*    Get Routes of the apps */
app.use(require('./routes'));

db.on('connected', () => {
  app.listen(config.server.port, config.server.hostname, function() {
    console.log('Listening on port ' + config.server.hostname + ":" + config.server.port)
  });
});

