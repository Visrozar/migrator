const { validationResult } = require('express-validator/check');

exports.checkForErrors = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let er= errors.mapped();
        return res.status(422).json({ status: 422, message:er[Object.keys(er)[0]].msg});
    }
    next();
};