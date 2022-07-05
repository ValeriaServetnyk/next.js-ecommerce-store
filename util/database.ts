import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

function connectOneTimeToDatabase() {
  if (!globalThis.postgreSqlClient) {
    globalThis.postgresSqlClient = postgres();
  }
  const sql = globalThis.postgresSqlClient;

  return sql;
}

const sql = connectOneTimeToDatabase();

export async function getProducts() {
  const products = await sql`
SELECT * FROM  products
`;
  return products;
}

export async function getProduct(id: number) {
  if (!id) return undefined;
  const products = await sql`
  SELECT * FROM  products
  WHERE id = ${id}
  `;
  return products[0];
}
