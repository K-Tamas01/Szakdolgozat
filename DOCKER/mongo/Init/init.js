db = new Mongo().getDB("Storage-Manager-System");
db.createCollection("users", {capped: false});
db.createCollection("storage", {capped: false});
db.createCollection("delivery", {capped: false});
db.createCollection("orders", {capped: false});

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

db.storage.insertMany([
    {
        productName: "SzuperPhone X1",
        productCode: "SPX1001",
        description: "Forradalmi okostelefon a legújabb technológiával.",
        quantity: 50,
        unitPrice: 750,
        category: "Elektronika",
        supplier: "TechMánia",
        location: "A3"
    },
    {
        productName: "UltraBook Pro",
        productCode: "UBP2023",
        description: "Könnyű és erős laptop professzionális felhasználóknak.",
        quantity: 30,
        unitPrice: 1300,
        category: "Elektronika",
        supplier: "GadgetMaster",
        location: "B2"
    },
    {
        productName: "ZeneMániás Fülhallgató",
        productCode: "ZMFH005",
        description: "Kiváló minőségű fülhallgató mély basszusokkal.",
        quantity: 80,
        unitPrice: 85,
        category: "Elektronika",
        supplier: "AudioMágia",
        location: "C1"
    },
    {
        productName: "Gamer Elite Billentyűzet",
        productCode: "GEB400",
        description: "Mechanikus billentyűzet gyors reakcióidővel.",
        quantity: 20,
        unitPrice: 120,
        category: "Elektronika",
        supplier: "GameZoneTech",
        location: "D4"
    },
    {
        productName: "Full HD Monitor",
        productCode: "FHD250",
        description: "23 hüvelykes monitor éles képminőséggel.",
        quantity: 60,
        unitPrice: 200,
        category: "Elektronika",
        supplier: "DisplayWonders",
        location: "E2"
    },
    {
        productName: "SlimBook Air",
        productCode: "SBA2023",
        description: "Vékony és könnyű noteszgép mindennapi használatra.",
        quantity: 45,
        unitPrice: 950,
        category: "Elektronika",
        supplier: "TechMánia",
        location: "A5"
    },
    {
        productName: "Okosotthon Kezdőcsomag",
        productCode: "OKC100",
        description: "Automatizált otthoni eszközök kezdőcsomagja.",
        quantity: 10,
        unitPrice: 300,
        category: "Elektronika",
        supplier: "SmartLiving",
        location: "B1"
    },
    {
        productName: "High-End Hangprojektor",
        productCode: "HPJ700",
        description: "Virtuális térhangzás élményt nyújtó hangprojektor.",
        quantity: 5,
        unitPrice: 1200,
        category: "Elektronika",
        supplier: "AudioMágia",
        location: "C3"
    },
    {
        productName: "UltraSport Okosóra",
        productCode: "USO550",
        description: "Vízálló okosóra sportoláshoz és mindennapi viselethez.",
        quantity: 35,
        unitPrice: 180,
        category: "Elektronika",
        supplier: "GadgetMaster",
        location: "D2"
    },
    {
        productName: "Mini Drone X3",
        productCode: "MDX301",
        description: "Kompakt drón HD kamerával és könnyű irányíthatósággal.",
        quantity: 15,
        unitPrice: 250,
        category: "Elektronika",
        supplier: "TechFly",
        location: "E4"
    }
]);