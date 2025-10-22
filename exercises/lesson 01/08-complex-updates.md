## Task 1.1
faccio l’update combinando più operatori sul prodotto canon

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  {
    $inc: { price: 50 },
    $addToSet: { tags: "premium" },
    $set: { status: "active" },
    $currentDate: { lastUpdated: true }
  }
)

ok, una sola update con più operatori

## Task 1.2
aggiorno città annidata, aggiungo interesse e incremento login

db.users.updateOne(
  { email: "user@example.com" },
  {
    $set: { "address.city": "Boston" },
    $addToSet: { interests: "photography" },
    $inc: { loginCount: 1 }
  }
)

matched 1,   modifiedCount: 0,

## Task 2.1
uso $min per abbassare il prezzo solo se più alto

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $min: { price: 899 } }
)

se era sopra 899 scende, altrimenti resta, in questo caso è stato modificato

## Task 2.2
uso $max per portare la quantity a 100 solo se sotto

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $max: { quantity: 100 } }
)

ok, quantity sale a 100 se era minore, in questo caso è stato modificato

## Task 2.3
metto un floor di prezzo e un limite di sconto

db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  {
    $max: { price: 49.99 },
    $min: { discountPercent: 90 }
  }
)

applicati i vincoli come richiesto

## Task 3.1
upsert utente con default solo in insert

db.users.updateOne(
  { email: "new.user@example.com" },
  {
    $set: {
      name: { first: "New", last: "User" },
      email: "new.user@example.com",
      status: "active"
    },
    $setOnInsert: {
      createdAt: new Date(),
      role: "customer"
    }
  },
  { upsert: true }
)

output:
{
  acknowledged: true,
  insertedId: ObjectId('68f8ae446da85b0152a66540'),
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 1
}

## Task 3.2
traccio firstSeen solo alla prima volta e aggiorno lastSeen sempre

db.users.updateOne(
  { email: "user@example.com" },
  {
    $set: { lastSeen: new Date() },
    $setOnInsert: { firstSeen: new Date() }
  },
  { upsert: true }
)

ok, stesso output di prima

## Task 4.1
faccio una bulkWrite con più operazioni

db.products.bulkWrite([
  {
    updateOne: {
      filter: { sku: "PRODUCT-001" },
      update: { $set: { status: "active" } }
    }
  },
  {
    updateOne: {
      filter: { sku: "PRODUCT-002" },
      update: { $inc: { quantity: 10 } }
    }
  },
  {
    insertOne: {
      document: {
        sku: "PRODUCT-003",
        name: "New Product",
        price: 99.99
      }
    }
  }
])

output:
{
  acknowledged: true,
  insertedCount: 1,
  insertedIds: {
    '2': ObjectId('68f8ae6e2283e4a77f7f743d')
  },
  matchedCount: 0,
  modifiedCount: 0,
  deletedCount: 0,
  upsertedCount: 0,
  upsertedIds: {}
}

## Task 4.2
bulk upsert di più prodotti

db.products.bulkWrite([
  {
    updateOne: {
      filter: { sku: "SKU-001" },
      update: { $set: { name: "Product 1", price: 29.99 } },
      upsert: true
    }
  },
  {
    updateOne: {
      filter: { sku: "SKU-002" },
      update: { $set: { name: "Product 2", price: 39.99 } },
      upsert: true
    }
  }
])

ok, crea o aggiorna

## Task 5.1
contatore atomico con findAndModify e prendo il valore

const result = db.counters.findAndModify({
  query: { _id: "orderNumber" },
  update: { $inc: { sequence: 1 } },
  new: true,
  upsert: true
})
const nextOrderNumber = result.sequence

non ho avuto nessun output

## Task 5.2
riservo inventario in modo atomico se c’è stock sufficiente

const result = db.products.updateOne(
  {
    sku: "LAPTOP-DELL-XPS13",
    quantity: { $gte: 5 }
  },
  {
    $inc: { quantity: -5 }
  }
)
// if (result.modifiedCount === 0) gestisco stock insufficiente

ok, decrementa solo se c’è quantità

## Task 6.1
uso update con pipeline e $cond per status su quantity

db.products.updateMany(
  {},
  [
    {
      $set: {
        status: {
          $cond: {
            if: { $gt: ["$quantity", 0] },
            then: "in-stock",
            else: "out-of-stock"
          }
        }
      }
    }
  ]
)

output:

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 19,
  modifiedCount: 19,
  upsertedCount: 0
}

## Task 7.1
carrello: aggiungo item o incremento quantità se già presente (prima opzione)

const user = db.users.findOne({
  email: "user@example.com",
  "cart.productId": productId
})
if (user) {
  db.users.updateOne(
    { email: "user@example.com", "cart.productId": productId },
    { $inc: { "cart.$.quantity": 1 } }
  )
} else {
  db.users.updateOne(
    { email: "user@example.com" },
    {
      $push: {
        cart: { productId: productId, quantity: 1, addedAt: new Date() }
      }
    }
  )
}

in questo caso mi dice utente non found


## Task 7.2
product view: incremento viewCount e aggiorno lastViewed

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  {
    $inc: { viewCount: 1 },
    $set: { lastViewed: new Date() },
    $setOnInsert: { firstViewed: new Date() }
  },
  { upsert: true }
)

output
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
## Task 7.3
rating medio semplice con contatore e totale

db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  {
    $inc: {
      "rating.count": 1,
      "rating.total": 5
    }
  }
)
const product = db.products.findOne({ sku: "LAPTOP-DELL-XPS13" })
const average = product.rating.total / product.rating.count
db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  { $set: { "rating.average": average } }
)

ok, calcolato e salvato

## Task 7.4
soft delete con timestamp

db.users.updateOne(
  { email: "user@example.com" },
  {
    $set: {
      status: "deleted",
      deletedAt: new Date(),
      deletedBy: adminUserId
    }
  }
)

rimane nel db ma marcato deleted

## Task 7.5
versioning incrementale ad ogni update

db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  {
    $set: {
      name: "Updated Name",
      price: 1399.99
    },
    $inc: { __v: 1 },
    $currentDate: { updatedAt: true }
  }
)

output:

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}


## Task 8.1
controllo sempre matched e modified dopo un update

const result = db.products.updateOne(
  { sku: "NON-EXISTENT" },
  { $set: { status: "active" } }
)
if (result.matchedCount === 0) {
  print("Product not found")
} else if (result.modifiedCount === 0) {
  print("No changes made")
} else {
  print("Updated successfully")
}

outuput: Product not found

## Task 8.2
valido permessi prima di aggiornare

const user = db.users.findOne({
  email: "user@example.com",
  role: "admin"
})
if (!user) {
  throw new Error("Unauthorized")
}
db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  { $set: { status: "active" } }
)

output: non autorizzato

## Task 9.1
aggiorno in batch invece di loop multipli

db.products.updateMany(
  { _id: { $in: productIds } },
  { $set: { status: "active" } }
)

meglio di tanti updateOne in ciclo

## Task 9.2
uso un campo indicizzato nel filtro di update

db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  { $set: { status: "active" } }
)

usa l’indice su sku, ok
