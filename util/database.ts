import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

export type Product = {
  name: string;
  id: string;
  description: string;
  price: string;
  counter: number;
};

setPostgresDefaultsOnHeroku();

config();

declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

function connectOneTimeToDatabase() {
  let sql;
  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

const sql = connectOneTimeToDatabase();

export async function getProducts() {
  const products = await sql`
SELECT * FROM  products
`;
  return products;
}

export async function getProductById(id?: number) {
  if (!id) return undefined;
  const [product] = await sql<[Product | undefined]>`
  SELECT * FROM  products
  WHERE id = ${id}
  `;
  return product;
}
