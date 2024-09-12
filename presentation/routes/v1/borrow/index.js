const express = require('express');
const router = express.Router();
const BORROW_CONTROLLER = require('../../../controller/borrow.controller');

router.get('/', BORROW_CONTROLLER.index);
router.post('/create', BORROW_CONTROLLER.borrow);

module.exports = router;