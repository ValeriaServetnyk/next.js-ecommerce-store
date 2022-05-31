import Head from 'next/head';
import { css } from '@emotion/react';
import { productsDatabase } from '../util/database';
import Link from 'next/link';
import Image from 'next/image';


const productsListStyles = css`
padding: 10px;
`;

const productsListItemStyles = css`
border: 1px solid #ccc;
border-radius: 4px;
padding: 12px 16px ;

& + & {
  margin-top: 10px;
}
`;


export default function Products(props) {

async function handlePurchase () {
  const response = await fetch("/api/session",
   {
    method: 'POST',
  });
  const data = await response.json();
  console.log(data);
};

  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="plenty of cat-themed gifts" content="Dashboard for the application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>List of products</h1>

      <div css={productsListStyles}>
        {props.products.map((product) => {
          return (
            <div key={`product-${product.id}`} css={productsListItemStyles}>
      <div>
        Name: <Link href={`/products/${product.id}`}>{product.name}</Link></div>
      <div>Price: {product.price}</div>
      <button onClick={() => handlePurchase()}>Buy now</button>
      </div>
      );

        })}

      </div>
      </div>
  )
}

export function getServerSideProps() {
  return {
    props: {
products: productsDatabase,
    },
    };
}
