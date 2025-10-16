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

ho vistoche c'è già una sku duplcata, poi dovro contrllarla
