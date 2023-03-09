const {body} = require('express-validator')

const registerValidation = [
    body('email','Wrong email!').isEmail(),
    body('password','Password too short!').isLength({min:5}),
    body('name', 'Uncorrect name!').isLength({min:3}),
    body('avatarUrl', 'Wrong avatar url!').optional().isURL(),
]

module.exports = registerValidation;