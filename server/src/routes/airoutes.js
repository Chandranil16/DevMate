const express = require('express');
const aicontroller = require('../controller/aicontroller');

const router = express.Router();

router.post('/review', aicontroller);
router.post('/fix', aicontroller);

module.exports = router;