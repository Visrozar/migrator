const migrationController = require('../controllers/migrationController');
const migrate = require('../schema/migrate');
const validate = require('../utility/validate');
const { checkSchema } = require('express-validator/check');


module.exports = (router) => {
    router.post(
        '/migrate',
        // validate the schema of the object
        checkSchema(migrate),
        // return error if schema is invalid
        validate.validateMigrate,
        // run the migration if all is well
        migrationController.runMigration
    );

    return router; // Return router object to main index.js
}