import { css } from '@emotion/react';
import Head from 'next/head';
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

const inputStyles = css`
  display: grid;
  grid-template-columns: repeat(3, 400px);
  align-items: center;
  justify-content: center;
  h2 {
    font-family: Roboto;
    font-size: 20px;
  }
`;

const confirmButton = css`
  background-color: #6e73a1;
  border: none;
  color: white;
  padding: 15px;
`;
export default function Checkout(props) {
  const shoppingData = props.foundGoods;
  const [total, setTotal] = useState(0);
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    creditCart: '',
    expirationDate: '',
    securityCode: '',
  });

  const formSetup = (name) => {
    return ({ target: { input } }) => {
      setUserInput((oldInput) => ({ oldInput, [name]: input }));
    };
  };

  useEffect(() => {
    if (shoppingData.length === 0) return;

    const totalCost = shoppingData.reduce((sum, item) => {
      sum = sum + item.price * item.quantity;
      return sum;
    }, 0);

    setTotal(totalCost);
  }, [shoppingData]);

  const onSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/success';
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
        <form css={inputStyles} onSubmit={onSubmit}>
          <div>
            <h2>Personal information</h2>
            <br />
            <input
              data-test-id="checkout-first-name"
              placeholder="First name"
              value={userInput.firstName}
              onChange={formSetup('firstName')}
              required
            />
            <br />
            <input
              data-test-id="checkout-last-name"
              placeholder="Last name"
              value={userInput.lastName}
              onChange={formSetup('lastName')}
              required
            />
            <br />
            <input
              data-test-id="checkout-email"
              placeholder="Email"
              value={userInput.email}
              onChange={formSetup('email')}
              required
            />
          </div>
          <div>
            <h2>Shipping Address</h2>
            <br />
            <input
              data-test-id="checkout-address"
              placeholder="Address"
              value={userInput.address}
              onChange={formSetup('address')}
              required
            />
            <br />
            <input
              data-test-id="checkout-city"
              placeholder="City"
              value={userInput.city}
              onChange={formSetup('city')}
              required
            />
            <br />
            <input
              data-test-id="checkout-postal-code"
              placeholder="Postal code"
              value={userInput.postalCode}
              onChange={formSetup('postalCode')}
              required
            />
            <br />
            <input
              data-test-id="checkout-country"
              placeholder="Country"
              value={userInput.country}
              onChange={formSetup('country')}
              required
            />

            <br />
          </div>
          <div>
            <h2>Payment information</h2>
            <br />
            <input
              data-test-id="checkout-credit-card"
              placeholder="Credit card"
              value={userInput.creditCard}
              onChange={formSetup('creditCard')}
              required
            />
            <br />
            <input
              data-test-id="checkout-expiration-date"
              placeholder="Expiration date"
              value={userInput.expirationDate}
              onChange={formSetup('expirationDate')}
              type="number"
              required
            />
            <br />
            <input
              data-test-id="checkout-security-code"
              placeholder="Security code"
              value={userInput.securityCode}
              onChange={formSetup('securityCode')}
              type="number"
              required
            />
            <br />
          </div>
          <div>
            <button data-test-id="checkout-confirm-order" css={confirmButton}>
              Confirm order
            </button>
          </div>
        </form>
        <div>
          <h2>Total payment: {total}</h2>
        </div>
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
