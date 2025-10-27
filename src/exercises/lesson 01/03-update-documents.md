## Task 1.1

prima costrisco fuori compass la query e poi la provo cambiando l’email di emma


db.users.updateOne(
  { email: "emma.wilson@example.com" },
  { $set: { email: "emma.w@example.com" } }
)

il risultato è giusto 
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

## Task 1.2

porto il prezzo delle cuffie sony al prezzo richiesto

db.products.updateOne(
  { sku: "HDPHN-SONY-WH1000XM5" },
  { $set: { price: 379.99 } }
)


output:
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

## Task 1.3

aggiungo telefono a michael e metto inactive

db.users.updateOne(
  { email: "michael.chen@example.com" },
  { $set: { phone: "+1-555-0150", status: "inactive" } }
)

anche qui l'output è
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

## Task 2.1

metto la newsletter true a tutti i customer con la dot notation


db.users.updateMany(
  { role: "customer" },
  { $set: { "preferences.newsletter": true } }
)


mi escono più documenti modificati come previsto e siccome sono tanti ora l'output mi da risultati diversi:

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 23,
  modifiedCount: 12,
  upsertedCount: 0
}

## Task 2.2

aggiungo la data corrente ai prodotti attivi

db.products.updateMany(
  { status: "active" },
  { $set: { lastUpdated: new Date() } }
)

l'output questa vokta è 

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 10,
  modifiedCount: 10,
  upsertedCount: 0
}

## Task 2.3

segno updated true per la categoria electronics

db.products.updateMany(
  { category: "Electronics" },
  { $set: { updated: true } }
)

funziona

{
  acknowledged: true,
  insertedId: null,
  matchedCount: 10,
  modifiedCount: 10,
  upsertedCount: 0
}

## Task 3.1

aumento la quantity del dell xps 13 di 10

db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  { $inc: { quantity: 10 } }
)

anche qui mi esce modificato

## Task 3.2

decremento il prezzo sony di 20 usando inc negativo

db.products.updateOne(
  { sku: "HDPHN-SONY-WH1000XM5" },
  { $inc: { price: -20 } }
)


ok, modificato l'aout resta sempre lo stesso quando si modifica un solo documento

## Task 3.3

aggiungo loginCount a emma e lo incremento

db.users.updateOne(
  { email: "emma.w@example.com" },
  { $inc: { loginCount: 1 } }
)

incrementa correttamente controllato nei documenti

## Task 4.1

applico sconto del 10% a tutti gli attivi con mul, usando una formula che già conoscevo per trovare la percentuale che rimarà 

db.products.updateMany(
  { status: "active" },
  { $mul: { price: 0.9 } }
)

va, 10 documenti modificati

## Task 5.1

tolgo il campo updated da tutti, ho dovuto cercare il comando

db.products.updateMany(
  {},
  { $unset: { updated: "" } }
)

dove esiste lo rimuove, ne trova 13 e ne modifica 10

## Task 5.2

tolgo il telefono a michael

db.users.updateOne(
  { email: "michael.chen@example.com" },
  { $unset: { phone: "" } }
)

dopo controllo è sparito nel db users

## Task 6.1

rinomino loginCount in totalLogins solo se esiste

db.users.updateMany(
  { loginCount: { $exists: true } },
  { $rename: { loginCount: "totalLogins" } }
)

mi da acknowledged true

## Task 7.1

cambio la città di emma in boston con la dot notation

db.users.updateOne(
  { email: "emma.w@example.com" },
  { $set: { "address.city": "Boston" } }
)

funziona, matched 1

## Task 7.2

aggiungo specifications.weight alle sony

db.products.updateOne(
  { sku: "HDPHN-SONY-WH1000XM5" },
  { $set: { "specifications.weight": "250g" } }
)

campo aggiunto e controllato

## Task 8.1

metto updatedAt con la data corrente al dell xps 13

db.products.updateOne(
  { sku: "LAPTOP-DELL-XPS13" },
  { $currentDate: { updatedAt: true } }
)

e lo modifica 

## Task 9.1

faccio tutto in una volta sulle sony: +10 al prezzo, status active, data aggiornata

db.products.updateOne(
  { sku: "HDPHN-SONY-WH1000XM5" },
  {
    $inc: { price: 10 },
    $set: { status: "active" },
    $currentDate: { updatedAt: true }
  }
)

mi esce matched 1, modified 1, anche sta volta ne modifica 1 

