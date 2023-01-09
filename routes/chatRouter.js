const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/user', (req, res) => {
    res.send(req.user)
})

module.exports = router