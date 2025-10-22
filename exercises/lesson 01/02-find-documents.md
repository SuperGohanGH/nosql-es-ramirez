## Task 1.1

provo il comando scritto nel documento: 
db.users.find()
e mi trova solo 20 utenti (i primi 20 ma non tutti) e ha tutti i suoi attributi presenti nel documento. Ho notato che se scrivo it, come consiglia il terminale mi fa vedere altri utenti

## Task 1.2

Ho provato il comando db.users.find().pretty(), e come dice mongo compass, ha già una formattazione bella

## Task 1.3

quando provo db.users.findOne() senza inserire niente nella parentesi, mi esce il primo della lista degli user
la differenza con find() è che find trova tutti, invece findOne ne pernderà solo uno

## Task 2.1

Provo a cercare l'utente con un filtro in questo caso l'email, dovrebbe essere univoco

db.users.findOne({ email: "emma.wilson@example.com" })

e me lo trova, quindi funziona

## Task 2.2

mi chiede di trovare tutti gli utenti che abbiano come ruolo di customer, quindi in questo caso dovrò trovarne più di uno, quindi uso find()

db.users.find({ role: "customer" })

mi devo ricordare che con questa sintassi, la "colonna" è senza virgolette e la stringa è con le virgolette

ho visto che mi trova anche qui la maggior parte e se voglio visualizzarne altri con lo stesso ruolo, posso scrivere it nel terminale

## Task 2.3

provo a cambiare il comando di prima e al posto di role metto status e al posto di customer metto active

db.users.find({ status: "active" })

e anche in questo caso escono ma non tutti a video
per contare ho usato db.users.count({ status: "active" })

e mi escono fuori 31, però il terminale mi dice che è scontinuata e quindi usare countDocuments or estimatedDocumentCount.

provo con db.users.countDocuments({ status: "active" })
e mi da lo stesso risultato senza consigli

## Task 2.4

in questo caso chiede 2 filtri quindi uso la virgola per non fare errore di sintassi, e siccome ne chiede tutti, uso find()

db.users.find({
  role: "customer",
  status: "active"
})

e me li trova tutti, in questo caso tutti a video 

## Task 3.1

Per fare questo prendi dagli appunti e cerco il comando giusto per trovare il maggiore stretto

db.products.find({
  price: { $gt: 100 }
})

e quindi mi escono tutti con il prezo maggiore di 100, quindi da 101 in poi

## Task 3.2

dagli esercizi prima ho visto che avere 2 filtri è come usare and, quindi mi basta metter al virgola, questa volta uso la e dopop il gt e lt, che vuol dire equals
db.products.find({
  price: {
    $gte: 50,
    $lte: 150
  }
})


in questo caso a me escono solo 2 prodotti

## Task 3.3 

in questo caso chiede un or, ma siccome lte, perendia sia quelli minori che minori uguali, allora uso solo lte

db.products.find({
  price: { $lte: 50 }
})

in questo caso non mi trova nessuno

## Task 3.4

Prima cerco come si scrive il != negli appunti e poi creo la query

db.products.find({
  featured: { $ne: true }
})

e il suo outuput è giusto

## Task 4.1
ho notato che il campo name è un oggetto dentro il documento, quindi devo inserire quale parte dellìoggetto cercare, in questo caso cerco name.first come richiesto

db.users.findOne({
  "name.first": "Emma"
})

ho notato che si bugga tutto al primo tentativo, poi ho visto che quando si usa un filtro con il punto bisgna mettere le virgolette anche in questi
quindi mi trova solo un utente, ma con tutti gli attributi e oggetti pernseti nel documento

## Task 4.2

Anche in questo caso quello che si vuole trovare è in un oggetto quindi lo cerco come fatto prima, senza dimeticarmi le virgolette

db.users.find({
  "address.city": "New York"
})

l'output mi da solo un utente

## Task 4.3

Ho visto il bluetooth non è sempre presente ma si trova nell'ogetto specifications

e che avvolte è scritto con la versione del bluethoot quindi cerco il modo per filtrare la parola bluetooth, e ho traovto che si usano le / sia all'inizio che alla fine e poi filtrerà tutti i documenti che hanno quella stringa da qualche parte in quel determinato filtro

db.products.find({
  "specifications.connectivity": /Bluetooth/i
})

per farlo case insensitive ho visto che si può inserire anche la "i"

## Task 5.1

in questo caso ho visto che per cercare dentro un array non funziona come un oggeto
non c'è bisogno di mettere ad esmepio tags.1, siccome un array basta cercarlo se è dentro

db.products.find({
  tags: "wireless"
})

la query funziona e mi escono quelli con il tag wireless

## Task 5.2

prima di creare la query ho cercato come scrive una query per cercare dentro un array in modo da distinguere AND  e OR in questo caso chiede AND quindi uso $all

db.products.find({
  tags: { $all: ["wireless", "premium"] }
})

escono quelli richiesti

## Task 5.3

In questo caso bisona fare una ricerca con OR, quindi userò $in 

db.products.find({
  tags: { $in: ["laptop", "mouse"] }
})

qui mi escono altri documenti

## Task 6.1

Per questa Task riuso la query di uno degli esercizi prima ma senza filtri per trovarli tutti

db.users.countDocuments()

esce 49, quindi il totale 

## Task 6.2

anche qui mi richiede delle query quasi già fatte in precedenza, facendo un mix, al posto di find metto countDocuments

db.users.countDocuments({
  role: "customer",
  status: "active"
})

e mi trova 20 utenti

## Task 6.3

Conto anche qui usanto una quiery simile a quella fatta in precedenza

db.products.countDocuments({
  price: { $gt: 500 }
})

## Task 7.1

qui ho cercato se esiste il limit come su SQL, e ho visto che si, e lo uso 

db.users.find().limit(3)

dopo questo comando, mi sono usciti appunti i primi 3

## Task 7.2

ho cercato come si filtrano in ordene screscente e descrescnete e ho visto che per ordinarli dal più basso al più alto si usa 1 e al contrario si usa -1, che è ciò che ci serve

db.products.find().sort({ price: -1 }).limit(5)
