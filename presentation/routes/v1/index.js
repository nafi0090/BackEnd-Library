const express = require('express');
const router = express.Router();
const BOOK_ROUTER = require('./book');
const MEMBER_ROUTER = require('./member');

router.use('/book', BOOK_ROUTER);
router.use('/member', MEMBER_ROUTER);

module.exports = router;