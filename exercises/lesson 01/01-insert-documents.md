## Task 1.1: Insert a User
Prima costrisco fuori Compass la query
```
db.users.insertOne({
  name: "Emma",
  surname: "Wilson",
  email: "emma.wilson@example.com",
  phone: "+1-555-0199",
  role: "customer",
  status: "active",
  created_date: new Date()
})

```

al primo tentativo ho dimenticato le virgolette 

al secondo tentativo non gli piaceva la mia sintassi di current date, quindi ho cercato la giusta sintassi

dopo questo ho ottenuto il seguente output:
{
  acknowledged: true,
  insertedId: ObjectId('68f111355882e52c4def907d')
}

ho notato che alle prime query avevo messo db.utenti... in italiano, ciò mi ha creato una nuova "tabella" con l'inserimento di questa, quindi ho notato che bisognava mettere il nome uguale come c'è scritto 

## Task 1.2
creo la query prima di provarla, ho notato che non sapevo come creare una sotto categoria quindi sono andato a cercarla prima di crearla e provarla, scoprendo che che gli arrai che ha solo una lista come tag va in un array di tipo [] e invece se è un array con e ogni valore con un nome specifico metto le {}

db.products.insertOne({
  SKU: "HDPHN-SONY-WH1000XM5",
  Name: "Sony WH-1000XM5 Wireless Headphones",
  Description: "Industry-leading noise cancellation with premium sound quality",
  Category: "Electronics",
  Subcategory: "Headphones",
  Brand: "Sony",
  Price: 399.99,
  Currency: "USD",
  Tags: ["wireless", "noise-cancelling", "premium", "bluetooth"],
  Status: "active",
  Featured: true,
  Specifications: {
    type: "Over-ear",
    connectivity: "Bluetooth 5.2",
    batteryLife: "30 hours",
    noiseCancellation: true
  }
})

ho continuato a vedere il file e ho notato che la cosa delle parentesi le spiega dopo, il risultato ottenuto è:
{
  acknowledged: true,
  insertedId: ObjectId('68f114425882e52c4def907f')
}
## Task 2.1 

creo la query prima di provarla

db.users.insertMany([
  { name: "Michael Chen", email: "michael.chen@example.com", role:"customer", status: "active"},
  { name: "Sarah Johnson", email: "sarah.johnson@example.com", role:"customer", status: "active"},
  { name: "David Martinez", email: "david.martinez@example.com", role:"admin", status: "active"}
])

questa volta al primo tentativo è andata bene copiando dagli appunti, ho solo aggiunto le colonne richieste negli stati richiesti, ricordadomi di mettere la virgola tra ogni array

questo è l'output:

{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('68f115875882e52c4def9080'),
    '1': ObjectId('68f115875882e52c4def9081'),
    '2': ObjectId('68f115875882e52c4def9082')
  }
}

## Task 2.2

creo la query 

db.products.insertMany([
    {SKU:"LAPTOP-DELL-XPS13",Name:"Dell XPS 13",Category:"Electronics",Subcategory:"Laptops",Price:1299.99,Status:"active",Tags:["laptop","ultrabook","dell"]},
    {SKU:"MOUSE-LOGITECH-MX3",Name:"Logitech MX Master 3",Category:"Electronics",Subcategory:"Accessories",Price:99.99,Status:"active",Tags:["mouse","wireless","ergonomic"]}
]);

ho vistoche c'è già una sku duplcata, poi dovro controllarla

oggi ho controllato gli SKU dell'esercizio e ho visto che sia il portatile che il mouse sono presneti già nelle tabella 

## Task 3.1 

provo a creare un nuovo utente con un id mio 
db.users.insertOne({
  _id: "user_custom_001",
  name: "Pichi",
  surname: "Claro",
  email: "andateala@example.com",
  role: "customer",
})
al primo tentativo siccome ho fatto copia e incolla dalla task 1.1 inserendo la colonna _id ho dimenticato di mettere la virgola alla fine, quindi il primo tentativo fallito

quando provo a inserire un ID già esistente questo è l'errore:
E11000 duplicate key error collection: test.users index: _id_ dup key: { _id: "user_custom_001" }
Atlas atlas-109co0-shard-0 [primary] test

## Task 3.2

Faccio un insertOne di un user semplice

db.users.insertOne({
  name: "Auto ID User",
  email: "auto.id@example.com",
})

questo è l'ID generato al primo tentativo: insertedId: ObjectId('68f738427576a51ee33cc9db')

non so come rispondere alla domanda di come di com'è fatto object ID 

## Tast 4.1

la task chiede di inserire un documento con dati diversi

db.products.insertOne({
  sku: "TEST-TYPES-001",
  name: "Data Types Demo Product",
  price: 99.99,
  quantity: 100,
  inStock: true,
  tags: ["demo", "test"],
  dimensions: {
    length: 10.5,
    width: 5.25,
    height: 2.0
  },
  releaseDate: new Date("2024-01-15"),
  metadata: null
})

il risultato è true.

## validation testing

ho fatto tutte verifiche javascript e non ci sono errori o mancanze

## Challenge

### 1:

db.users.insertMany([
  { email: "user1@example.com"},
  { email: "user2@example.com"},
  { email: "user3@example.com"},
  { email: "user4@example.com"},
  { email: "user5@example.com"},
  { email: "user6@example.com"},
  { email: "user7@example.com"},
  { email: "user8@example.com"},
  { email: "user9@example.com"},
  { email: "user10@example.com"}
])


### 2

db.products.insertOne({
  sku: "COMBO-OFFICE-KIT",
  name: "Office Starter Kit",
  relatedProducts: [
    ObjectId("68f0ec2a4e2955623fb645c4"),
    ObjectId("68f0ec2a4e2955623fb645c5"),
    ObjectId("68f0ec2a4e2955623fb645c6")
  ]
})


per trovare gli ID ho dovute cercarli nella tabella.