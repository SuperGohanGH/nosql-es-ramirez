import { connectMongo } from "../../mongo/connection.js";

export const esercizio01 = async () => {
  try {
    const db = await connectMongo();
    const products = db.collection('products');

    console.log('📝 Esercizio 01: Projections Base\n');

    // ========================================
    // SCRIVI LA TUA QUERY QUI
    // ========================================

    const result = await products
      .find(
        { status: 'active' },
        {
          projection: {
            name: 1,
            price: 1,
            category: 1,
            _id: 0
          }
        }
      )
      .limit(10)
      .toArray();

    // ========================================
    // 📝 Esercizio 01: Projections Base

    //     Trovati 2 prodotti:

    //     1. Updated Name
    //     Categoria: Electronics
    //     Prezzo: $1399.99

    //     2. Product Name
    //     Categoria: undefined
    //     Prezzo: $99.99

    //     📝 Esercizio 01: Projections Base

    //     Trovati 2 prodotti:

    //     1. Updated Name
    //     Categoria: Electronics
    //     Prezzo: $1399.99

    //     2. Product Name
    //     Categoria: undefined
    //     Prezzo: $99.99
    // ========================================

    console.log(`Trovati ${result.length} prodotti:\n`);
    result.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Categoria: ${product.category}`);
      console.log(`   Prezzo: $${product.price.toFixed(2)}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Errore:', error);
  }
  process.exit(0);
};

esercizio01();