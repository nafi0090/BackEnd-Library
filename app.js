var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const API_ROUTES = require('./presentation/routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Daftarkan rute API
app.use('/api', API_ROUTES);

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Library Service API',
        version: '1.0.0',
        description: 'API documentation for Library Service',
    },
    servers: [{
        url: 'http://localhost:5000',
    }, ],
};

const options = {
    swaggerDefinition,
    apis: ['./presentation/routes/v1/book/index.js'], // Jalur ke file rute
};

const swaggerSpec = swaggerJsdoc(options);

// Middleware untuk Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;