import { connectMongo } from "../../mongo/connection.js";

export const esercizio04 = async () => {
  try {
    const db = await connectMongo();
    const products = db.collection('products');
    
    console.log('📝 Esercizio 04: Sorting con Pagination\n');
    
    // Parte A: Pagination base
    const PAGE_SIZE = 5;
    const currentPage = 2;
    
    const skip = (currentPage - 1) * PAGE_SIZE;
    
    const totalDocuments = await products.countDocuments();
    const totalPages = Math.ceil(totalDocuments / PAGE_SIZE);
    
    const resultA = await products
      .find({})
      .sort({ name: 1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .toArray();
    
    console.log(`A) Pagina ${currentPage} di ${totalPages} (totale documenti: ${totalDocuments}):\n`);
    resultA.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price?.toFixed(2) || 'N/A'}`);
    });
    
    // Parte B: Funzione riutilizzabile
    const paginate = async (page: number, pageSize: number) => {
      const skip = (page - 1) * pageSize;
      const totalDocuments = await products.countDocuments();
      const totalPages = Math.ceil(totalDocuments / pageSize);
      const data = await products
        .find({})
        .sort({ name: 1 })
        .skip(skip)
        .limit(pageSize)
        .toArray();
      
      return {
        data,
        pagination: {
          currentPage: page,
          pageSize,
          totalDocuments,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      };
    };
    
    // Testa la funzione con pagina 3
    const resultB = await paginate(3, 5);
    console.log(`\n\nB) Pagina ${resultB.pagination.currentPage} di ${resultB.pagination.totalPages} (totale documenti: ${resultB.pagination.totalDocuments}):\n`);
    console.log(`Has next page: ${resultB.pagination.hasNextPage}`);
    console.log(`Has prev page: ${resultB.pagination.hasPrevPage}\n`);
    resultB.data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price?.toFixed(2) || 'N/A'}`);
    });
    
  } catch (error) {
    console.error('❌ Errore:', error);
  }
  process.exit(0);
};

esercizio04();

// OUTPUT:
// 📝 Esercizio 04: Sorting con Pagination

// A) Pagina 2 di 4 (totale documenti: 20):

// 1. Keychron K8 Mechanical Keyboard - $80.99
// 2. LG 27" 4K UHD Monitor - $449.99
// 3. Logitech MX Master 3 - $89.99
// 4. MacBook Pro 16" M3 Max - $2676.73
// 5. MongoDB: The Definitive Guide - $49.99
// 📝 Esercizio 04: Sorting con Pagination



// B) Pagina 3 di 4 (totale documenti: 20):

// Has next page: true
// Has prev page: true

// 1. New Product - $99.99
// 2. Office Starter Kit - $N/A
// 3. Product 1 - $29.99
// 4. Product 2 - $39.99
// 5. Product Name - $99.99