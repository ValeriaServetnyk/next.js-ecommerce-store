import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const pageTitle = css`
font-size: 32px;
color: #333333;
font-weight: 400;
text-align: center;
padding: 40px 0px 40px 0px;
font-family: Roboto;
text-transform: uppercase;

`;

export default function Checkout() {
  return (
<div>
      <Head>
         <title>Thank you for your order</title>
         <meta name="thank you page" content="your purchase is completed" />
         <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 css={pageTitle}>
          Purrrfect order is completed!
       </h1>
       <div>
          <Image src="/success.jpg" alt="success picture cats" width="400" height="500"/>
</div>
       </main>
       </div>
  )
}