db = new Mongo().getDB("Storage-Manager-System");
db.createCollection("users", {capped: false});
db.createCollection("products", {capped: false});
db.createCollection("delivery", {capped: false});
db.createCollection("billing", {capped: false});

db.createRole({
    role: "admin",
    privileges: [
        { resource: {
            db: "Storage-Manager-System",
            collection: ""
            },
            actions: [ "find", "update", "insert", "remove"]
        }
    ],
    roles: []
})

db.createUser({
    user: "rootAdmin",
    pwd: "rootAdmin123",
    roles:[{
        role: "admin",
        db: "Storage-Manager-System"
    }]
})