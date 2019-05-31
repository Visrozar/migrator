const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb'); // or ObjectID 

exports.runMigration = async function (req, res) {
    MongoClient.connect(req.body.uri, { useNewUrlParser: true }, async function (err, db) {
        try {
            if (err) throw err;
            let dbo = db.db(req.body.database);
            var condition = {}
            req.body.condition = typeCast(req.body.condition, 'object')
            var condition = req.body.condition ? req.body.condition : {};
            req.body.value = typeCast(req.body.value, req.body.value_type);
            switch (req.body.action) {
                case 'add':
                case 'edit':
                    newvalue = { '$set': {} };
                    newvalue['$set'][req.body.key] = req.body.value;
                    response = await dbo.collection(req.body.collection).updateMany(condition, newvalue);
                    db.close();
                    return res.json({ status: 200, data: `successfully ${req.body.action}ed the required field in ${response.modifiedCount} records` });

                case 'delete':
                    newvalue = { '$unset': {} };
                    newvalue['$unset'][req.body.key] = req.body.value;
                    response = await dbo.collection(req.body.collection).updateMany(condition, newvalue);
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

function typeCast(data, data_type) {
    switch (data_type) {
        case 'null':
            return null
        case 'int':
            return data != '' ? parseInt(data) : 0
        case 'float':
            return data != '' ? parseFloat(data) : 0.0
        case 'array':
            return data != '' ? JSON.parse(data) : []
        case 'object':
            if (data == '') data = {}
            else {
                data = JSON.parse(data);
                // check whether the value is objectID
                for (const key in data) {
                    if (data.hasOwnProperty(key) && key == '_id') {
                        const element = data[key];
                        if (ObjectId.isValid(element)) data[key] = ObjectId(data[key])
                    }
                }
            }
            return data;
    }
}