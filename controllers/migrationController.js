const MongoClient = require('mongodb').MongoClient;

exports.runMigration = async function (req, res) {
    MongoClient.connect(req.body.uri, { useNewUrlParser: true }, async function (err, db) {
        try {
            if (err) throw err;
            let dbo = db.db(req.body.database);
            switch (req.body.action) {
                case 'add':
                case 'edit':
                    newvalue = { '$set': {} };
                    newvalue['$set'][req.body.key] = req.body.value;

                    response = await dbo.collection(req.body.collection).updateMany({}, newvalue);
                    db.close();
                    return res.json({ status: 200, data: `successfully ${req.body.action}ed the required field in ${response.modifiedCount} records` });

                case 'delete':
                    newvalue = { '$unset': {} };
                    newvalue['$unset'][req.body.key] = req.body.value;

                    response = await dbo.collection(req.body.collection).updateMany({}, newvalue);
                    db.close();
                    return res.json({ status: 200, data: `successfully deleted the required field in ${response.modifiedCount} records` });
                default:
                    break;
            }

        } catch (error) {
            return res.status(422).json({ status: 422, message: error.message });
        }
    });

};