var express = require('express')
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');


var config = (app: any) => {
    
    // view engine setup
  
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(helmet());

    // enabling CORS for all requests
    app.use(cors());

    // adding morgan to log HTTP requests
    app.use(morgan('combined'));

    return app
}

export default config