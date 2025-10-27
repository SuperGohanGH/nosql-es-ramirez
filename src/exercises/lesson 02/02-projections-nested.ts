import { connectMongo } from "../../mongo/connection.js";

export const esercizio02 = async () => {
  try {
    const db = await connectMongo();

    console.log('📝 Esercizio 02: Projections Nested\n');
    
    // Parte A: Nested fields nei prodotti
    console.log('A) Prodotti con rating medio:\n');
    
    const productsA = db.collection('products');
    const resultA = await productsA
      .find(
        {},
        {
          projection: {
            name: 1,
            "rating.average": 1,
            "rating.count": 1,
            _id: 0
          }
        }
      )
      .limit(5)
      .toArray();
    
    resultA.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Rating medio: ${product.rating?.average || 'N/A'}`);
      console.log(`   Numero rating: ${product.rating?.count || 'N/A'}`);
      console.log('');
    });
    
    // Parte B: $slice per limitare array
    console.log('\n\nB) Prodotti con primi 3 tags:\n');
    
    const productsB = db.collection('products');
    const resultB = await productsB
      .find(
        {},
        {
          projection: {
            name: 1,
            tags: { $slice: 3 },
            _id: 0
          }
        }
      )
      .limit(5)
      .toArray();
    
    resultB.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Tags: ${product.tags?.join(', ') || 'Nessuno'}`);
      console.log('');
    });
    
    // Parte C: Utenti con indirizzo parziale
    console.log('\n\nC) Utenti con città e stato:\n');
    
    const users = db.collection('users');
    const resultC = await users
      .find(
        { role: 'customer' },
        {
          projection: {
            "name.first": 1,
            "name.last": 1,
            "address.city": 1,
            "address.state": 1,
            _id: 0
          }
        }
      )
      .limit(5)
      .toArray();
    
    resultC.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name?.first || 'N/A'} ${user.name?.last || 'N/A'}`);
      console.log(`   Città: ${user.address?.city || 'N/A'}`);
      console.log(`   Stato: ${user.address?.state || 'N/A'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Errore:', error);
  }
  process.exit(0);
};

esercizio02();

\\ OUTPUT:
// 📝 Esercizio 02: Projections Nested

// A) Prodotti con rating medio:

// 1. Updated Name
//    Rating medio: 0.04854368932038835
//    Numero rating: 103

// 2. MacBook Pro 16" M3 Max
//    Rating medio: 3.3
//    Numero rating: 224

// 3. LG 27" 4K UHD Monitor
//    Rating medio: 5
//    Numero rating: 210

// 4. Apple AirPods Pro (2nd Gen)
//    Rating medio: 3.6
//    Numero rating: 129

// 5. Keychron K8 Mechanical Keyboard
//    Rating medio: 3.1
//    Numero rating: 220



// B) Prodotti con primi 3 tags:

// 1. Updated Name
//    Tags: laptop, ultrabook, dell

// 2. MacBook Pro 16" M3 Max
//    Tags: laptop, apple, professional

// 3. LG 27" 4K UHD Monitor
//    Tags: monitor, 4k, usb-c

// 4. Apple AirPods Pro (2nd Gen)
//    Tags: earbuds, wireless, apple

// 5. Keychron K8 Mechanical Keyboard
//    Tags: keyboard, mechanical, wireless



// C) Utenti con città e stato:

// 1. Wendy Jackson
//    Città: Portland
//    Stato: OR

// 2. Yara Johnson
//    Città: Boston
//    Stato: MA

// 3. Grace Taylor
//    Città: San Antonio
//    Stato: TX

// 4. Tara Clark
//    Città: San Antonio
//    Stato: TX

// 5. Xavier Taylor
//    Città: San Antonio
//    Stato: TX