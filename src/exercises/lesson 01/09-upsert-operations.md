## Task 1.1
faccio un upsert semplice su un utente per email

db.users.updateOne(
  { email: "john.doe@example.com" },
  {
    $set: {
      name: { first: "John", last: "Doe" },
      status: "active"
    }
  },
  { upsert: true }
)

ok, prima volta inserisce poi aggiorna, output:
{
  acknowledged: true,
  insertedId: ObjectId('68f8b0186da85b0152a66639'),
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 1
}

## Task 1.2
verifico il comportamento dell’upsert eseguendo due volte

const r1 = db.users.updateOne(
  { email: "jane.doe@example.com" },
  { $set: { name: "Jane Doe" } },
  { upsert: true }
)
const r2 = db.users.updateOne(
  { email: "jane.doe@example.com" },
  { $set: { name: "Jane Doe Updated" } },
  { upsert: true }
)

nessun output

## Task 2.1
uso $setOnInsert per i default solo alla creazione

db.users.updateOne(
  { email: "user@example.com" },
  {
    $set: {
      name: "User Name",
      lastLogin: new Date()
    },
    $setOnInsert: {
      createdAt: new Date(),
      role: "customer",
      status: "active"
    }
  },
  { upsert: true }
)

ok, i default non si sovrascrivono dopo

## Task 2.2
traccio firstSeen e lastActive con upsert

db.users.updateOne(
  { email: "active.user@example.com" },
  {
    $set: { lastActive: new Date() },
    $setOnInsert: {
      firstSeen: new Date(),
      accountCreated: new Date()
    }
  },
  { upsert: true }
)

 upsertedCount: 1

 
## Task 3.1
creo un prodotto idempotente per sku

db.products.updateOne(
  { sku: "PRODUCT-SKU-123" },
  {
    $set: {
      name: "Product Name",
      price: 99.99,
      status: "active",
      updatedAt: new Date()
    },
    $setOnInsert: {
      sku: "PRODUCT-SKU-123",
      createdAt: new Date(),
      viewCount: 0,
      salesCount: 0
    }
  },
  { upsert: true }
)

 upsertedCount: 1

## Task 3.2
log di una richiesta API in modo idempotente

db.apiLogs.updateOne(
  { requestId: "unique-request-id-123", endpoint: "/api/products" },
  {
    $set: { lastAttempt: new Date(), status: "completed" },
    $inc: { attemptCount: 1 },
    $setOnInsert: {
      requestId: "unique-request-id-123",
      endpoint: "/api/products",
      firstAttempt: new Date(),
      userId: "user123"
    }
  },
  { upsert: true }
)

 upsertedCount: 1

## Task 4.1
inizializzo un contatore con valore di partenza

db.counters.updateOne(
  { _id: "orderNumber" },
  { $setOnInsert: { sequence: 1000 } },
  { upsert: true }
)

  matchedCount: 1,

## Task 4.2
incremento o creo il contatore

db.counters.updateOne(
  { _id: "productViews" },
  {
    $inc: { count: 1 },
    $setOnInsert: { createdAt: new Date() }
  },
  { upsert: true }
)

ok, prima volta count 1 poi incrementa

## Task 5.1
creo o aggiorno una sessione

db.sessions.updateOne(
  { sessionId: "session-abc-123" },
  {
    $set: {
      userId: "user123",
      lastActivity: new Date(),
      data: { cartItems: 3, currentPage: "/products" }
    },
    $setOnInsert: { createdAt: new Date(), sessionId: "session-abc-123" }
  },
  { upsert: true }
)

ok, sessione gestita

## Task 5.2
sessione con scadenza e ttl index

db.sessions.updateOne(
  { sessionId: "session-xyz-456" },
  {
    $set: {
      userId: "user456",
      lastActivity: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000)
    },
    $setOnInsert: { createdAt: new Date() }
  },
  { upsert: true }
)
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })

output: expiresAt_1
## Task 6.1
inizializzo record di inventario

db.inventory.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  {
    $set: { sku: "LAPTOP-DELL-XPS13", lastUpdated: new Date() },
    $setOnInsert: { quantity: 100, reservedQuantity: 0, createdAt: new Date() }
  },
  { upsert: true }
)


  upsertedCount: 1

## Task 6.2
riservo inventario solo se c’è stock

db.inventory.updateOne(
  { sku: "LAPTOP-DELL-XPS13", quantity: { $gte: 5 } },
  {
    $inc: { quantity: -5, reservedQuantity: 5 },
    $set: { lastUpdated: new Date() }
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

## Task 7.1
preferenze utente con default in insert

db.users.updateOne(
  { email: "user@example.com" },
  {
    $set: {
      "preferences.theme": "dark",
      "preferences.lastUpdated": new Date()
    },
    $setOnInsert: {
      "preferences.language": "en",
      "preferences.notifications": true,
      "preferences.newsletter": false
    }
  },
  { upsert: true }
)

ok, aggiorna theme e mette i default alla prima:

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
