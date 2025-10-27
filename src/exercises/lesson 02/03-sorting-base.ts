import { connectMongo } from "../../mongo/connection.js";

export const esercizio03 = async () => {
  try {
    const db = await connectMongo();
    const products = db.collection('products');
    
    console.log('📝 Esercizio 03: Sorting Base\n');
    
    // A) Sort per prezzo (crescente)
    console.log('A) Prodotti dal più economico al più costoso:\n');
    
    const resultA = await products
      .find({ status: 'active' })
      .sort({ price: 1 })
      .limit(5)
      .toArray();
    
    resultA.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price?.toFixed(2) || 'N/A'}`);
    });
    
    // B) Sort per prezzo (decrescente)
    console.log('\n\nB) Top 5 prodotti più costosi:\n');
    
    const resultB = await products
      .find({ status: 'active' })
      .sort({ price: -1 })
      .limit(5)
      .toArray();
    
    resultB.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price?.toFixed(2) || 'N/A'}`);
    });
    
    // C) Multi-field sort
    console.log('\n\nC) Prodotti per categoria (A-Z), poi per prezzo (alto-basso):\n');
    
    const resultC = await products
      .find({ status: 'active' })
      .sort({ category: 1, price: -1 })
      .limit(10)
      .toArray();
    
    let currentCategory = '';
    resultC.forEach((product, index) => {
      if (product.category !== currentCategory) {
        currentCategory = product.category;
        console.log(`\nCategoria: ${currentCategory}`);
      }
      console.log(`  ${index + 1}. ${product.name} - $${product.price?.toFixed(2) || 'N/A'}`);
    });
    
    // D) Sort per nested field (rating)
    console.log('\n\nD) Top 5 prodotti per rating:\n');
    
    const resultD = await products
      .find({ "rating.count": { $gte: 10 } })
      .sort({ "rating.average": -1 })
      .limit(5)
      .toArray();
    
    resultD.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - Rating: ${product.rating?.average?.toFixed(1) || 'N/A'} (${product.rating?.count || 0} recensioni)`);
    });
    
  } catch (error) {
    console.error('❌ Errore:', error);
  } 
  process.exit(0);
};

esercizio03();
// OUTPUT:
//  Esercizio 03: Sorting Base

// A) Prodotti dal più economico al più costoso:

// 📝 Esercizio 03: Sorting Base

// A) Prodotti dal più economico al più costoso:

// 1. Product Name - $99.99
// 2. Updated Name - $1399.99


// B) Top 5 prodotti più costosi:

// 1. Product Name - $99.99
// 2. Updated Name - $1399.99


// B) Top 5 prodotti più costosi:

// 1. Updated Name - $1399.99
// 2. Product Name - $99.99


// C) Prodotti per categoria (A-Z), poi per prezzo (alto-basso):

// 1. Updated Name - $1399.99
// 2. Product Name - $99.99


// C) Prodotti per categoria (A-Z), poi per prezzo (alto-basso):


// Categoria: undefined
//   1. Product Name - $99.99

// Categoria: Electronics
//   2. Updated Name - $1399.99


// D) Top 5 prodotti per rating:


// Categoria: undefined
//   1. Product Name - $99.99

// Categoria: Electronics
//   2. Updated Name - $1399.99


// D) Top 5 prodotti per rating:

// 1. LG 27" 4K UHD Monitor - Rating: 5.0 (210 recensioni)
// 2. iPad Air 11" M2 - Rating: 4.9 (139 recensioni)
// 3. iPhone 15 Pro - Rating: 4.6 (189 recensioni)
// 4. Logitech MX Master 3 - Rating: 4.2 (163 recensioni)
// 5. Sony WH-1000XM5 Wireless Headphones - Rating: 4.2 (223 recensioni)