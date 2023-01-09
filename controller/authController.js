const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const token = req.body.token

    if(!token) {
        return res.status(400).send('Não logado')
    }

    try{
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        next()

    } catch(err) {
        res.status(400).send('Não logado')
    }

}

module.exports = auth