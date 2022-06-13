import { config } from 'dotenv-safe';
import postgres from 'postgres';

config()

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




// export  const productsDatabase = [
//   {id: '1', name:'Product 1', price:'2', description: 'Hey! Want to show off your furbabies? Here is a way to bring attention to them and maybe something more...this shirt is purrfect for cat moms and lovers around the world.'},
//   {id: '2', name:'Product 2', price:'2', description: 'Hey! Want to show off your furbabies? Here is a way to bring attention to them and maybe something more...this shirt is purrfect for cat moms and lovers around the world.'},
//   {id: '3', name:'Product 3', price:'3', description: 'Hey! Want to show off your furbabies? Here is a way to bring attention to them and maybe something more...this shirt is purrfect for cat moms and lovers around the world.'},
//   {id: '4', name:'Product 4', price:'3', description: 'Hey! Want to show off your furbabies? Here is a way to bring attention to them and maybe something more...this shirt is purrfect for cat moms and lovers around the world.'},
// ];