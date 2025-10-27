## Task 1.1
inserisco il prodotto con i tag e le features

db.products.insertOne({
  sku: "CAMERA-CANON-EOS-R5",
  name: "Canon EOS R5",
  category: "Electronics",
  price: 3899.00,
  tags: ["camera", "professional", "mirrorless", "4k", "canon"],
  features: ["45MP sensor", "8K video", "IBIS", "Dual card slots"],
  status: "active"
})

si aggiunge tranquillamente

## Task 1.2
inserisco l’utente con l’array di interessi

db.users.insertOne({
  name: { first: "Lisa", last: "Chen" },
  email: "lisa.chen@example.com",
  interests: ["photography", "travel", "technology", "cooking"],
  favoriteProducts: [],
  role: "customer",
  status: "active"
})

documento aggiunto 

## Task 2.1
trovo i prodotti taggati camera

db.products.find({ tags: "camera" })

ritorna i prodotti con il tag camera

## Task 2.2
trovo prodotti con uno dei tag sale clearance discount

db.products.find({
  tags: { $in: ["sale", "clearance", "discount"] }
})

match su qualsiasi dei tre

## Task 2.3
trovo prodotti che hanno wireless e premium

db.products.find({
  tags: { $all: ["wireless", "premium"] }
})

ritorna solo uno come output

## Task 2.4
trovo prodotti con esattamente 5 tag

db.products.find({
  tags: { $size: 5 }
})

anche chi il DB ne aveva solo 1

## Task 2.5
trovo utenti senza favoriteProducts (array vuoto)

db.users.find({
  favoriteProducts: { $size: 0 }
})

funziona, prende solo array vuoti

## Task 3.1
aggiungo il tag featured alla canon

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $push: { tags: "featured" } }
)

ok, aggiunto

## Task 3.2
aggiungo due tag con $each

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $push: { tags: { $each: ["new-arrival", "bestseller"] } } }
)

trovato uno e modificato uno

## Task 3.3
aggiungo premium solo se non c’è già

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $addToSet: { tags: "premium" } }
)

modificato 

## Task 3.4
aggiungo high-end e recommended solo se mancanti

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $addToSet: { tags: { $each: ["high-end", "recommended"] } } }
)

modificato

## Task 4.1
rimuovo il tag featured

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $pull: { tags: "featured" } }
)

pull avvenuta bene

## Task 4.2
rimuovo new-arrival e sale

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $pull: { tags: { $in: ["new-arrival", "sale"] } } }
)

rimuove entrambi se presenti

## Task 4.3
rimuovo l’ultimo elemento dell’array tags

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $pop: { tags: 1 } }
)

ok, pop dall’ultimo

## Task 4.4
rimuovo il primo elemento dell’array tags

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $pop: { tags: -1 } }
)

ok, pop dal primo

## Task 5.1
inserisco il libro con array reviews

db.products.insertOne({
  sku: "BOOK-MONGODB-GUIDE",
  name: "MongoDB: The Definitive Guide",
  category: "Books",
  price: 49.99,
  reviews: [
    { author: "Alice", rating: 5, comment: "Excellent book!", date: new Date("2024-01-15") },
    { author: "Bob", rating: 4, comment: "Very informative", date: new Date("2024-01-18") }
  ],
  status: "active"
})

ok, creato

## Task 5.2
aggiungo una nuova review al libro

db.products.updateOne(
  { sku: "BOOK-MONGODB-GUIDE" },
  {
    $push: {
      reviews: {
        author: "Charlie",
        rating: 5,
        comment: "Best MongoDB resource!",
        date: new Date()
      }
    }
  }
)

review aggiunta

## Task 5.3
trovo prodotti con almeno una review a 5 stelle

db.products.find({
  "reviews.rating": 5
})

ok, match su rating 5 di un prodotto

## Task 5.4
trovo prodotti con review rating 5 dell’autore alice (stesso elemento)

db.products.find({
  reviews: { $elemMatch: { rating: 5, author: "Alice" } }
})

usa elemMatch correttamente

## Task 6.1
aggiorno il rating della review di alice a 5

db.products.updateOne(
  { sku: "BOOK-MONGODB-GUIDE", "reviews.author": "Alice" },
  { $set: { "reviews.$.rating": 5 } }
)

ok, aggiornato il primo match

## Task 6.2
aggiorno la seconda review (indice 1) cambiando il comment

db.products.updateOne(
  { sku: "BOOK-MONGODB-GUIDE" },
  { $set: { "reviews.1.comment": "Updated comment" } }
)

ok, aggiornato per indice

## Task 6.3
rimuovo la review di alice

db.products.updateOne(
  { sku: "BOOK-MONGODB-GUIDE" },
  { $pull: { reviews: { author: "Alice" } } }
)

review rimossa

## Task 7.1
inserisco editor-choice all’inizio dei tag

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $push: { tags: { $each: ["editor-choice"], $position: 0 } } }
)

ok, inserito in posizione 0

## Task 7.2
aggiungo due nuovi tag e ordino alfabeticamente

db.products.updateOne(
  { sku: "CAMERA-CANON-EOS-R5" },
  { $push: { tags: { $each: ["new-tag-1", "new-tag-2"], $sort: 1 } } }
)

array ordinato asc

## Task 7.3
aggiungo una review e tengo solo le 5 più recenti

db.products.updateOne(
  { sku: "BOOK-MONGODB-GUIDE" },
  {
    $push: {
      reviews: {
        $each: [
          { author: "Dave", rating: 4, comment: "Good book", date: new Date() }
        ],
        $sort: { date: -1 },
        $slice: 5
      }
    }
  }
)

rimangono al massimo 5 reviews

## Task 8.1
aggiungo un prodotto al carrello dell’utente

db.users.updateOne(
  { email: "user@example.com" },
  {
    $push: {
      cart: {
        productId: ObjectId("64a000000000000000000001"),
        quantity: 1,
        addedAt: new Date()
      }
    }
  }
)

in questo caso nessun aggiornamento

## Task 8.2
rimuovo un prodotto dal carrello

db.users.updateOne(
  { email: "user@example.com" },
  { $pull: { cart: { productId: ObjectId("64a000000000000000000001") } } }
)

nessuna modifica output:

  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0


## Task 8.3
aggiorno la quantità di un item nel carrello

db.users.updateOne(
  { email: "user@example.com", "cart.productId": ObjectId("64a000000000000000000001") },
  { $set: { "cart.$.quantity": 3 } }
)

stesso output

## Task 8.4
gestisco la wishlist aggiungendo il prodotto se non presente

db.users.updateOne(
  { email: "user@example.com" },
  { $addToSet: { wishlist: ObjectId("64a0000000000000000000aa") } }
)

outuput 0 anche qui