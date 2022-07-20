import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Counter } from '../components/Counter';
import { getProducts } from '../util/database';

// import { loadStripe } from '@stripe/stripe-js';

const productsListStyles = css`
  display: grid;
  grid-template-columns: repeat(4, 250px);
  gap: 40px;
  padding: 40px;
`;

const pageTitle = css`
  font-size: 32px;
  color: #333333;
  font-weight: 400;
  text-align: center;
  padding: 40px 0px 40px 0px;
  font-family: Roboto;
  text-transform: uppercase;
`;

const productName = css`
  text-decoration: none;
  color: black;
  font-family: Roboto;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  padding: 10px;
`;

const productPrice = css`
  color: black;
  font-family: Roboto;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  padding: 10px;
`;

const quickBuyButton = css`
  padding: 10px;
  background-color: #6e73a1;
  border-radius: 10px;
  border: none;
  color: white;
`;

const counterContainer = css`
  display: flex;
  justify-content: center;
  gap: 15px;
`;
export default function Products(props) {
  // const stripeLoader = loadStripe(props.publicKey);

  const [productQuantity, setProductQuantity] = useState(1);

  async function handlePurchase(quantity, mode, priceId) {
    // const stripeClient = await stripeLoader;

    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: quantity,
        mode: mode,
        priceId: priceId,
      }),
    });
    const data = await response.json();

    // stripeClient.redirectToCheckout({sessionId: data.session.id});
  }

  return (
    <div>
      <Head>
        <title>Products</title>
        <meta
          name="plenty of cat-themed gifts"
          content="Dashboard for the application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 css={pageTitle}>Best Selling</h1>

      <div css={productsListStyles}>
        {props.products.map((product) => {
          return (
            <div
              key={`product-${product.id}`}
              data-test-id="product-<product id>"
            >
              <div>
                <Image
                  src={`/${product.id}.jpg`}
                  width="300"
                  height="300"
                  alt="product images"
                />
              </div>
              <div css={productName}>
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </div>
              <div css={productPrice}>{product.price}</div>
              <div css={counterContainer}>
                <Counter />
                <button
                  css={quickBuyButton}
                  onClick={() => handlePurchase(productQuantity, 'payment')}
                >
                  Quick Buy
                </button>
              </div>

              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();

  return {
    props: {
      products: products,
    },
  };
}

// to add stripe later use this code

// export async function getServerSideProps() {
//   const stripe = await import ('stripe');
//   const stripeServer = stripe.default(process.env.STRIPE_SECRET_KEY);
//   const publicKey = process.env.STRIPE_PUBLISHABLE_KEY;

//   const price = await stripeServer.prices.retrieve(process.env.PRICE);

//   return { props: {
//     products: productsDatabase,
//     publicKey: publicKey,
//     productPrices: [
//       {
//         priceId: 'PRICE',
//         amount: price.unit_amount,
//       },

//     ],
//   },};
// }
