const path = require('path');
const express = require('express');
const app = express();
module.exports = app

//logging middleware
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../app/public')));

//payload body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/routes', require('../routes'));

//send index.html after all routes
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

//Handling 500 errors after everything
app.use(function(err, req, next) {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`Server listening on port ${port}`);
});

