## Task 1.1
creo gli utenti di test da poter cancellare

db.users.insertMany([
  {
    name: { first: "Test", last: "User1" },
    email: "test1@delete.com",
    role: "customer",
    status: "test"
  },
  {
    name: { first: "Test", last: "User2" },
    email: "test2@delete.com",
    role: "customer",
    status: "test"
  },
  {
    name: { first: "Test", last: "User3" },
    email: "test3@delete.com",
    role: "customer",
    status: "test"
  }
])

ok, inseriti

## Task 1.2
controllo cosa sto per cancellare

db.users.find({ status: "test" })

vedo i 3 utenti di prova

## Task 1.3
cancello un singolo utente di test

db.users.deleteOne({ email: "test1@delete.com" })

deletedCount 1

## Task 1.4
verifico che è sparito

db.users.findOne({ email: "test1@delete.com" })

mi torna null quindi ok

## Task 2.1
cancello tutti gli utenti rimasti con status test

db.users.deleteMany({ status: "test" })

deletedCount come previsto

## Task 2.2
cancello i prodotti di test sotto 10 euro nella categoria Test

db.products.deleteMany({ category: "Test", price: { $lt: 10 } })

li rimuove

## Task 3.1
cancello gli utenti inattivi

db.users.deleteMany({ status: "inactive" })

ok, cancellati

## Task 3.2
cancello i prodotti più vecchi di una certa data

db.products.deleteMany({
  createdAt: { $lt: ISODate("2024-01-01") }
})

funziona, deletedCount > 0 se ci sono

## Task 4.1
cancello tutto dentro la testCollection

db.testCollection.deleteMany({})

controllato poi con countDocuments che è 0

## Task 5.1
uso soft delete al posto di cancellare veramente

db.users.updateOne(
  { email: "user@example.com" },
  {
    $set: {
      status: "deleted",
      deletedAt: new Date()
    }
  }
)

rimane nel db ma marcato deleted

## Task 5.2
archivio prima di eliminare (prendo il documento)

db.users.findOne({ email: "archive@example.com" })

preso l’id e poi ho fatto l’archiviazione e delete

## Task 6.1
cancello per campo annidato sulla città

db.users.deleteMany({ "address.city": "TestCity" })

ok, cancellati quelli di quella città

## Task 6.2
cancello prodotti con un certo tag

db.products.deleteMany({ tags: "discontinued" })

ok, deletedCount torna il numero giusto

## Task 7.1
controllo il risultato di una delete

const result = db.users.deleteMany({ status: "test" })

vedo acknowledged true e il deletedCount

## Task 7.2
gestisco il caso in cui non trova nulla

db.users.deleteOne({ email: "doesnotexist@example.com" })

acknowledged true, deletedCount 0 quindi nessun errore
