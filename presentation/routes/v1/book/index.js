const express = require('express');
const router = express.Router();
const BOOK_CONTROLLER = require('../../../controller/book.controller');

router.get('/', BOOK_CONTROLLER.index);

module.exports = router;