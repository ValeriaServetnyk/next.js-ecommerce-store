import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getProducts } from '../util/database';

const buttonContainer = css`
  display: flex;
  direction: row;
  gap: 20px;
  button {
    background-color: #6e73a1;
    border: none;
    color: white;
    padding: 15px;
  }
  span {
    padding: 10px;
  }
`;

const removeButton = css`
  background-color: #6e73a1;
  border: none;
  color: white;
  padding: 15px;
`;

const checkoutButton = css`
  background-color: #6e73a1;
  border: none;
  color: white;
  padding: 25px;
  margin-bottom: 30px;
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

const cartItemContainer = css`
  display: grid;
  grid-template-columns: repeat(6, 200px);
  align-items: center;
  padding: 20px;
  margin-left: 30px;
  font-family: Roboto;
  font-size: 17px;
`;

const totalsContainer = css`
  font-family: Roboto;
  text-transform: uppercase;
  text-align: center;
  margin-left: 30px;
  font-size: 17px;
`;

export default function Cart(props) {
  const [cartItems, setCartItems] = useState(props.foundGoods);
  const [isEmpty, setIsEmpty] = useState(false);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const currentCart = getParsedCookie('cart');
    if (!currentCart) {
      setIsEmpty(true);
      return currentCart;
    }

    if (cartItems.length === 0) {
      return;
    }
    const totalPrice = cartItems.reduce((sum, item) => {
      sum = sum + item.price * item.quantity;
      return sum;
    }, 0);

    const totalItemCount = cartItems.reduce((sum, item) => {
      sum = sum + item.quantity;
      return sum;
    }, 0);

    setItemCount(totalItemCount);
    setTotal(totalPrice);
  }, [cartItems, total, itemCount]);

  props.setCartQ(itemCount);
  return (
    <div>
      <Head>
        <title>Shopping cart</title>
        <meta name="shopping cart" content="goods ready for checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={pageTitle}>Your cart</h1>

        {isEmpty ? (
          <h2 css={pageTitle}>Your cart is empty</h2>
        ) : (
          <>
            <div data-test-id="cart-product-<product id>">
              {cartItems.map((item) => {
                return (
                  <div css={cartItemContainer} key={`cart-${item.id}`}>
                    <div>{item.name}</div>
                    <div>
                      <Image
                        src={`/${item.id}.jpg`}
                        width="100"
                        height="100"
                        alt="catme"
                      />
                    </div>
                    <div>Price: {item.price}</div>
                    <div data-test-id="cart-product-quantity-<product id>">
                      Quantity: {item.quantity}
                    </div>

                    <div css={buttonContainer}>
                      <button
                        onClick={() => {
                          const cartQuantity =
                            item.quantity > 1 ? item.quantity - 1 : 1;
                          const updatedArray = cartItems.map((p) =>
                            p.id === item.id
                              ? { ...p, quantity: cartQuantity }
                              : p,
                          );
                          setCartItems(updatedArray);
                          const currentCart = getParsedCookie('cart');
                          const currentProduct = currentCart.find(
                            (productInCart) => item.id === productInCart.id,
                          );
                          currentProduct.quantity > 1
                            ? (currentProduct.quantity -= 1)
                            : (currentProduct.quantity = 1);
                          setStringifiedCookie('cart', currentCart);
                        }}
                      >
                        -
                      </button>
                      {/* <span>{item.quantity}</span> */}
                      <button
                        onClick={() => {
                          const cartQuantity = item.quantity + 1;
                          const updatedArray = cartItems.map((p) =>
                            p.id === item.id
                              ? { ...p, quantity: cartQuantity }
                              : p,
                          );
                          setCartItems(updatedArray);
                          const currentCart = getParsedCookie('cart');
                          const currentProduct = currentCart.find(
                            (productInCart) => item.id === productInCart.id,
                          );
                          currentProduct.quantity += 1;
                          setStringifiedCookie('cart', currentCart);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <button
                        css={removeButton}
                        data-test-id="cart-product-remove-<product id>"
                        onClick={() => {
                          item.quantity = 0;
                          const updatedArray = cartItems.filter(
                            (i) => i.quantity !== 0,
                          );
                          setCartItems(updatedArray);
                          const currentCart = getParsedCookie('cart');
                          const currentProduct = currentCart.find(
                            (productInCart) => item.id === productInCart.id,
                          );
                          currentProduct.quantity = 0;
                          const updatedCart = currentCart.filter(
                            (p) => p.quantity !== 0,
                          );
                          setStringifiedCookie('cart', updatedCart);
                        }}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr />
            <div css={totalsContainer}>
              <div>
                <span>Total items: {itemCount}</span>
              </div>
              <br />
              <div data-test-id="cart-total">Total Price: {total}</div>
              <br />
              <div>
                <button
                  href="/checkout"
                  css={checkoutButton}
                  data-test-id="cart-checkout"
                >
                  <Link href="/checkout">Checkout</Link>
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');

  const productDatabase = await getProducts();

  const foundGoods = [];

  for (const productInCart of currentCart) {
    const productData = productDatabase.find((product) => {
      return product.id === productInCart.id;
    });
    const superProduct = { ...productData, ...productInCart };

    foundGoods.push(superProduct);
  }

  return {
    props: {
      foundGoods: foundGoods,
    },
  };
}
