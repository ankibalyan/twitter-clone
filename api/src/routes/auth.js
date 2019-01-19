const express = require('express');
const { registerWithPassword, loginWithPassword, authWithToken } = require('../controllers/auth')

const router = express.Router();

router.post('/register', registerWithPassword);
router.post('/login', loginWithPassword);
router.get('/', authWithToken);

module.exports = router;
