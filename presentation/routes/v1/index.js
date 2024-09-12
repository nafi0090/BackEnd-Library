const express = require('express');
const router = express.Router();
const BOOK_ROUTER = require('./book');
const MEMBER_ROUTER = require('./member');
const BORROW_ROUTER = require('./borrow');
const RETURN_ROUTER = require('./return');

router.use('/book', BOOK_ROUTER);
router.use('/member', MEMBER_ROUTER);
router.use('/borrow', BORROW_ROUTER);
router.use('/return', RETURN_ROUTER);


module.exports = router;