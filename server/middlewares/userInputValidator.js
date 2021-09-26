const {check} = require('express-validator')
const userInputCheck = [

    check("name", "Name can not be empty").not().isEmpty().bail(),
    check("username", "username can not be empty").not().isEmpty().bail(),
    check("email", "email is required").not().isEmpty().isEmail().bail(),
    check("password", "passoword must be more then 5 chars").isLength({min: 5, max: 80})
]

module.exports = userInputCheck