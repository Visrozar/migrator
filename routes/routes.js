const migrationController = require('../controllers/migrationController');
const migrate = require('../schema/migrate');
const validate = require('../utility/validate');
const { checkSchema } = require('express-validator/check');


module.exports = (router) => {
    router.post(
        '/migrate',
        checkSchema(migrate),
        validate.checkForErrors,
        migrationController.runMigration
    );

    return router; // Return router object to main index.js
}