const express = require('express');
const router = express.Router();
const BOOK_ROUTER = require('./book');
const MEMBER_ROUTER = require('./member');
const BORROW_ROUTER = require('./borrow');

router.use('/book', BOOK_ROUTER);
router.use('/member', MEMBER_ROUTER);
router.use('/borrow', BORROW_ROUTER);


module.exports = router;