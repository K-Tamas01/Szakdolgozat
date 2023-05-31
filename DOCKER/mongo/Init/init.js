db = new Mongo().getDB("Storage-Manager-System");
db.createCollection("users", {capped: false});
db.createCollection("products", {capped: false});
db.createCollection("delivery", {capped: false});
db.createCollection("billing", {capped: false});