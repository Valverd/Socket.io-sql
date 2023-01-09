const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.get('/:id', async (req,res) => {
    const user = await User.findOne({where: {id: req.params.id}})
    res.send(user.id.toString())
})

router.get('/', async (req, res) => {
    const users = await User.findAll()
    try{
        res.send(users)
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post('/create', async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    const name = req.body.name
    const age = req.body.age

    const user = {
        userName,
        password: bcrypt.hashSync(password),
        name,
        age
    }

    await User.create(user)
    try{
        res.send('Usuário Criado')
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {

    const userName = req.body.userName
    const password = req.body.password

    const selectedUser = await User.findOne({where: {userName}})
    if(!selectedUser) {
        return res.status(400).send('Usuário ou senha incorreto.')
    }

    const passwordAndNameMatch = bcrypt.compareSync(password, selectedUser.password)
    if(!passwordAndNameMatch){
        return res.status(400).send('Usuário ou senha incorreto')
    }

    const token = jwt.sign({id: selectedUser.id, name: selectedUser.name, userName: selectedUser.userName, birth: selectedUser.birth}, process.env.TOKEN_SECRET, {expiresIn: "1h"})
    res.send(token)
})

module.exports = router