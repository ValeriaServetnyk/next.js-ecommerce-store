import postgres from 'postgres';
import {config} from 'dotenv-safe';

config()

const sql = postgres();

console.log(
  await sql`
  SELECT * FROM products` ,
  );