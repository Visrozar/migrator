module.exports = {
    uri: {
        exists: {
            checkNull: true,
            errorMessage: "Database URI cannot be null"
        },
        in: ["body"],
        matches: {
            options: [/^(mongodb:(?:\/{2})?)((\w+?):(\w+?)@|:?@?)(\S+?):(\d+)(\/(\S+?))?(\?replicaSet=(\S+?))?$/],
            errorMessage: "Invalid URI"
        },
        isString: {
            errorMessage: "Database URI should be a string"
        },
        errorMessage: 'URI is invalid'
    },
    database: {
        exists: {
            checkNull: true,
            errorMessage: "Database Name cannot be null"
        },
        in: ["body"],
        isString: {
            errorMessage: "Database Name should be a string"
        },
        errorMessage: 'Database Name is invalid'
    },
    collection: {
        exists: {
            checkNull: true,
            errorMessage: "Collection Name cannot be null"
        },
        in: ["body"],
        isString: {
            errorMessage: "Collection Name should be a string"
        },
        errorMessage: 'Collection name is invalid'
    },
    action: {
        exists: {
            checkNull: true,
            errorMessage: "Action cannot be null"
        },
        in: ["body"],
        matches: {
            options: [/\b(?:add|edit|delete)\b/],
            errorMessage: "Invalid action"
        },
        isString: {
            errorMessage: "Action should be a string"
        },
        errorMessage: 'Action name is invalid'
    }, // the action to take (add/edit/delete)
    key: {
        exists: {
            checkNull: true,
            errorMessage: "Key Name cannot be null"
        },
        in: ["body"],
        isString: {
            errorMessage: "Key Name should be a string"
        },
        errorMessage: 'Key name is invalid'
    }, // name of the key to add/edit/delete
    value_type: {
        exists: {
            checkNull: true,
            errorMessage: "Value Type cannot be null"
        },
        in: ["body"],
        isString: {
            errorMessage: "Value Type should be a string"
        },
        errorMessage: 'Value type is invalid'
    }, // value type can be string, array, object, number, query
    value: {
        exists: {
            checkNull: true,
            errorMessage: "Value cannot be null"
        },
        in: ["body"],
        errorMessage: 'Value is invalid'
    }, // value can be a string, array, object, number, query
}