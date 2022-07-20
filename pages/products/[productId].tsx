import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getProductById } from '../../util/database';
import { queryParamToNumber } from '../../util/queryParams';

// every product page is here. First goes an error message if such product id does not exist. Make sure pics id correspond to the item id

const productInfoContainer = css`
  display: flex;
  flex-direction: row;
  margin: 40px 50px 40px 50px;
  text-align: center;
`;

const productTextContainer = css`
  display: flex;
  flex-direction: column;
  margin: 40px 50px 40px 50px;
  text-align: center;
  margin-right: 100px;
  h1 {
    font-family: Roboto;
    font-weight: 400;
    font-size: 25px;
  }
  p {
    margin: 20px 100px 20px 100px;
    font-family: Roboto;
  }
`;

const buttonContainer = css`
  display: flex;
  direction: row;
  justify-content: center;
  gap: 20px;
  button {
    background-color: #6e73a1;
    border: none;
    color: white;
    padding: 15px;
    margin-top: 40px;
  }
  span {
    padding: 10px;
  }
`;
export type ProductInCart = {
  id: string;
  counter: number;
};

type Props = {
  setCartQ: React.FC;
  product: {
    name: string;
    id: string;
    description: string;
    price: string;
    counter: number;
  };
};

type NewCart = {
  id: string;
  quantity: number;
  counter: number;
}[];

export default function Products(props: Props) {
  // check if the product is in cart by checking the counter. If the counter is present then is in cart. Leave for later
  // const [inCart, setInCart] = useState('counter' in props.product);

  // initialize the counter with the value of the cookie
  const [counter, setCounter] = useState(props.product.counter || 1);

  return (
    <div>
      <Head>
        <title>Product page</title>
        <meta name="product page" content="Information about each product" />
      </Head>

      <div css={productInfoContainer}>
        <div>
          <Image
            data-test-id="product-image"
            src={`/${props.product.id}.jpg`}
            width="600"
            height="600"
            alt="photo of the product"
          />
        </div>
        <div css={productTextContainer}>
          <h1>{props.product.name}</h1>

          <p>{props.product.description}</p>

          <h3 data-test-id="product-price">Price: {props.product.price}</h3>

          <div css={buttonContainer}>
            <div>
              <button
                onClick={() => {
                  if (counter > 1) {
                    setCounter((count) => count - 1);
                  }
                }}
              >
                {' '}
                -
              </button>
              <input
                type="number"
                data-test-id="product-quantity"
                min="1"
                defaultValue="1"
                value={counter}
                onInput={(event) => {
                  if (!event.currentTarget.validity.valid) {
                    event.currentTarget.value = '';
                  }
                }}
                onChange={(event) =>
                  setCounter(Number(event.currentTarget.value))
                }
              />

              <button
                onClick={() => {
                  setCounter(counter + 1);
                }}
              >
                +
              </button>
            </div>
            <div>
              <button
                data-test-id="product-add-to-cart"
                onClick={() => {
                  const currentCart = Cookies.get('cart')
                    ? getParsedCookie('cart')
                    : [];
                  let newCart: NewCart;
                  const productInCart = currentCart.find(
                    (currentProduct: ProductInCart) =>
                      props.product.id === currentProduct.id,
                  );
                  if (productInCart) {
                    productInCart.quantity = productInCart.quantity + counter;
                    newCart = currentCart;
                  } else {
                    newCart = [
                      ...currentCart,
                      { id: props.product.id, quantity: counter },
                    ];
                  }
                  setStringifiedCookie('cart', newCart);
                  const totalItemCount = newCart.reduce((sum, item) => {
                    sum = sum + item.quantity;
                    return sum;
                  }, 0);
                  props.setCartQ(totalItemCount);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// retrieves the data from the server aka database. Only use in pages
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');

  const productId = queryParamToNumber(context.query.productId);

  const product = await getProductById(productId);

  if (!product) {
    context.res.statusCode = 404;
    return { props: { product: null } };
  }

  // const foundProduct = {
  //   id: product.id,
  //   name: product.name,
  //   price: product.price,
  //   description: product.description,
  // };

  const currentProductInCart = currentCart.find(
    (productInCart: ProductInCart) => product.id === productInCart.id,
  );

  const superProduct = { ...product, ...currentProductInCart };

  return {
    props: {
      product: superProduct || null,
    },
  };
}
