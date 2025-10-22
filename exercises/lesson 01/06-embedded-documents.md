## Task 1.1
inserisco l’utente con l’indirizzo completo e coordinate

db.users.insertOne({
  name: { first: "Jessica", last: "Taylor" },
  email: "jessica.taylor@example.com",
  phone: "+1-555-0166",
  address: {
    street: "456 Oak Avenue",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "USA",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    }
  },
  role: "customer",
  status: "active"
})

inserito, output:
{
  acknowledged: true,
  insertedId: ObjectId('68f8a8f42283e4a77f7f7437')
}

## Task 1.2
inserisco il prodotto con specifiche annidate

db.products.insertOne({
  sku: "SMARTPHONE-IPHONE-15-PRO",
  name: "iPhone 15 Pro",
  category: "Electronics",
  subcategory: "Smartphones",
  price: 999.00,
  specifications: {
    display: {
      size: "6.1 inches",
      type: "OLED",
      resolution: "2556 x 1179"
    },
    processor: {
      model: "A17 Pro",
      cores: 6,
      gpu: "Apple GPU (6-core)"
    },
    memory: {
      ram: "8GB",
      storage: "256GB"
    },
    camera: {
      rear: { main: "48MP", ultrawide: "12MP", telephoto: "12MP" },
      front: "12MP"
    }
  },
  status: "active"
})

ok, prodotto creato, stesso output di prima

## Task 2.1
cerco gli utenti che abitano a san francisco con la dot notation

db.users.find({ "address.city": "San Francisco" })

ritorna solo un utente

## Task 2.2
cerco gli utenti nello stato CA

db.users.find({ "address.state": "CA" })

ok, quesya volta sono vari utenti

## Task 2.3
cerco i prodotti con display 6.1 inches

db.products.find({ "specifications.display.size": "6.1 inches" })

trovo mi trova un prodotto solo

## Task 2.4
cerco i prodotti con ram 8GB

db.products.find({ "specifications.memory.ram": "8GB" })

ok, anche in questo caso mi trova solo 1 prodotto

## Task 2.5
cerco prodotti con display OLED e storage 256GB

db.products.find({
  "specifications.display.type": "OLED",
  "specifications.memory.storage": "256GB"
})

outuput simile con un prodotto

## Task 3.1
aggiorno la via di jessica a 789 pine street

db.users.updateOne(
  { email: "jessica.taylor@example.com" },
  { $set: { "address.street": "789 Pine Street" } }
)

lo stesso output di quando si moficia un solo documento 

## Task 3.2
aggiorno più campi annidati dell’indirizzo di jessica

db.users.updateOne(
  { email: "jessica.taylor@example.com" },
  {
    $set: {
      "address.city": "Los Angeles",
      "address.state": "CA",
      "address.zipCode": "90001"
    }
  }
)

3 ampi aggiornati

## Task 3.3
aggiorno la front camera dell’iphone a 15MP

db.products.updateOne(
  { sku: "SMARTPHONE-IPHONE-15-PRO" },
  { $set: { "specifications.camera.front": "15MP" } }
)

funziona

## Task 3.4
aggiorno le coordinate di jessica a los angeles

db.users.updateOne(
  { email: "jessica.taylor@example.com" },
  {
    $set: {
      "address.coordinates.lat": 34.0522,
      "address.coordinates.lng": -118.2437
    }
  }
)

  matchedCount: 1,
  modifiedCount: 1,

## Task 4.1
sostituisco l’intero oggetto address (attenzione: rimuove coordinates)

db.users.updateOne(
  { email: "jessica.taylor@example.com" },
  {
    $set: {
      address: {
        street: "321 Maple Drive",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        country: "USA"
      }
    }
  }
)

come sempre modifica andata bene

## Task 4.2
scelgo l’approccio A (partial update) come prima opzione

db.users.updateOne(
  { email: "user@example.com" },
  { $set: { "address.city": "Boston" } }
)

in questo caso non me lo modifica 
anche se lo ha trovato 

## Task 5.1
aggiungo una nuova specifica battery all’iphone

db.products.updateOne(
  { sku: "SMARTPHONE-IPHONE-15-PRO" },
  { $set: { "specifications.battery": "3200mAh" } }
)

qui lo trova e lo modifica

## Task 5.2
aggiungo l’oggetto shipping dentro address di jessica

db.users.updateOne(
  { email: "jessica.taylor@example.com" },
  {
    $set: {
      "address.shipping": {
        allowPOBox: false,
        requireSignature: true
      }
    }
  }
)

ok, aggiunto sotto address

## Task 6.1
inserisco utente con paymentMethods annidati

db.users.insertOne({
  name: { first: "Robert", last: "Anderson" },
  email: "robert.anderson@example.com",
  paymentMethods: {
    creditCard: { last4: "1234", brand: "Visa", expiryMonth: 12, expiryYear: 2025 },
    paypal: { email: "robert.paypal@example.com", verified: true }
  },
  role: "customer",
  status: "active"
})

inserimento con sucesso con l'output

## Task 6.2
cerco utenti con paypal verificato

db.users.find({ "paymentMethods.paypal.verified": true })

ritorna robert

## Task 6.3
aggiorno le ultime 4 cifre della carta di robert a 5678

db.users.updateOne(
  { email: "robert.anderson@example.com" },
  { $set: { "paymentMethods.creditCard.last4": "5678" } }
)

ok robert aggiornato

## Task 8.1
aggiungo un reviewsSummary embedded al dell xps 13

db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  {
    $set: {
      reviewsSummary: {
        average: 4.5,
        count: 127,
        distribution: { "5star": 78, "4star": 32, "3star": 12, "2star": 3, "1star": 2 },
        featured: [
          { author: "Jane D.", rating: 5, comment: "Best laptop ever!", helpful: 45 }
        ]
      }
    }
  }
)

aggiunto completamente

## Task 8.2
aggiungo preferences embedded all’utente indicato

db.users.updateOne(
  { email: "user@example.com" },
  {
    $set: {
      preferences: {
        theme: "dark",
        language: "en",
        notifications: { email: true, sms: false, push: true, frequency: "daily" },
        privacy: { showEmail: false, showPhone: false, allowMarketingEmails: true }
      }
    }
  }
)

ok, preferenze salvate
