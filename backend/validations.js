const {body} = require('express-validator')

// body here means request body. Each element of array describe body's key-value type and requirements

module.exports = {
    registerValidation : [
        body('email','Wrong email!').isEmail(),
        body('password','Password too short!').isLength({min:5}),
        body('name', 'Uncorrect name!').isLength({min:3}),
        body('avatarUrl', 'Wrong avatar url!').optional().isURL(),
    ],
    loginValidation : [
        body('email','Wrong email!').isEmail(),
        body('password','Password too short!').isLength({min:5}),
    ],
    newPostValidation : [
        body('title','Enter post title!').isLength({min:3}).isString(),
        body('text', 'Enter post text!').isLength({min:10}).isString(),
        body('tags', 'Wrong tags format').optional().isString(),
        body('imageUrl', 'Wrong image link').optional().isString(),
    ]

}
