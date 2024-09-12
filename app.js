const express = require('express');
const API_ROUTES = require('./presentation/routes');
// const bookRoutes = require('./routes/bookRoutes');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', API_ROUTES);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});