import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteCookie } from '../util/cookies';
import { getProducts } from '../util/database';

const pageTitle = css`
font-size: 32px;
color: #333333;
font-weight: 400;
text-align: center;
padding: 40px 0px 40px 0px;
font-family: Roboto;
text-transform: uppercase;

`;
export default function Checkout(props) {
  const shoppingData = props.foundGoods;
  const [total, setTotal] = useState(0);
  const [userInput, setUserInput] =useState ({
    firstName:'',
    lastName:'',
    email:'',
    address:'',
    city:'',
    postalCode:'',
    country:'',
    creditCart:'',
    expirationDate:'',
    securityCode:'',
  });

  const formSetup = (name) => {
    return ({target: {userInput}}) => {
      setUserInput((oldInput) => ({oldInput, [name]: userInput}));
    };
  };

  useEffect (() => {
    if (shoppingData.length == 0)
    return

    const total = shoppingData.reduce((sum, item) => {
        sum= sum + item.price * item.quantity
       return sum
     }, 0)

     setTotal(total)

    }, [shoppingData]);

    const onSubmit = (event) => {
      event.preventDefault();
      window.location.href = '/success.js';
      deleteCookie('cart');
    };

  return (
  <div>
      <Head>
        <title>Checkout page</title>
        <meta name="checkout page" content="goods ready for checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={pageTitle}>
          A tiny little step to receive your catcredible goods
        </h1>
        <form>
        <h2>Personal information</h2>
        <input
                  data-test-id="checkout-first-name"
                  placeholder="First name"
                  value={userInput.firstName}
                  onChange={formSetup('firstName')}
                  required
                />
                <input
                  data-test-id="checkout-last-name"
                  placeholder="Last name"
                  value={userInput.lastName}
                  onChange={formSetup('lastName')}
                  required
                />
                <input
                  data-test-id="checkout-email"
                  placeholder="Email"
                  value={userInput.email}
                  onChange={formSetup('email')}
                  required
                />
        <h2>Shipping Address</h2>
        <input
                  data-test-id="checkout-address"
                  placeholder="Address"
                  value={userInput.address}
                  onChange={formSetup('address')}
                  required
                />
                <input
                  data-test-id="checkout-city"
                  placeholder="City"
                  value={userInput.city}
                  onChange={formSetup('city')}
                  required
                />
                <input
                  data-test-id="checkout-postal-code"
                  placeholder="Postal code"
                  value={userInput.postalCode}
                  onChange={formSetup('postalCode')}
                  required
                />
                <input
                  data-test-id="checkout-country"
                  placeholder="Country"
                  value={userInput.country}
                  onChange={formSetup('country')}
                  required
                />
        <h2>Payment information</h2>
        <input
                  data-test-id="checkout-credit-card"
                  placeholder="Credit card"
                  value={userInput.creditCard}
                  onChange={formSetup('creditCard')}
                  required
                />
                <input
                  data-test-id="checkout-expiration-date"
                  placeholder="Expiration date"
                  value={userInput.expirationDate}
                  onChange={formSetup('expirationDate')}
                  type="number"
                  required
                />
              <input
                data-test-id="checkout-security-code"
                placeholder="Security code"
                value={userInput.securityCode}
                onChange={formSetup('securityCode')}
                type="number"
                required
              />
              <div>
                <button data-test-id="checkout-confirm-order">
                  Confirm order
                </button>
              </div>
        </form>
        <div>
          <h2>Total payment: {total}</h2>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');


  const productDatabase = await getProducts();

  let foundGoods = [];

  for (const productInCart of currentCart) {

    const productData = productDatabase.find((product) => {
      return product.id === productInCart.id;
    });
    const superProduct = {...productData, ...productInCart};

    foundGoods.push(superProduct);
  }

  return {
    props: {
      foundGoods: foundGoods,
    },
  };
}