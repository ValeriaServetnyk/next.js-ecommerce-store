import Head from 'next/head';

export default function Checkout() {
  return (
  <div>
      <Head>
        <title>Checkout page</title>
        <meta name="checkout page" content="goods ready for checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Your cart
        </h1>
      </main>
    </div>
  )
}