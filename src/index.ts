import { createOne, findOne, updateOne, createMany, findMany, updateMany, deleteOne, deleteMany } from './mongo/crud.js';
import "dotenv/config.js";
import { esercizio01 } from './exercises/lesson 02/01-projections-base.js';
import { esercizio02 } from './exercises/lesson 02/02-projections-nested.js';
import { esercizio03 } from './exercises/lesson 02/03-sorting-base.js';   
import { esercizio04 } from './exercises/lesson 02/04-sorting-pagination.js'; 

//esercizio01();
// esercizio02();
// esercizio03();
esercizio04();