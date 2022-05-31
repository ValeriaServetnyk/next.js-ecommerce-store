import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const heroSectionStyles = css`
background-image: url("/hero-page.jpg");
width: 1280;
height: 650px;
background-size: cover;
margin-left: 30px;
margin-right: 30px;

`;

const bestSellersList = css`
list-style: none;
display: flex;
align-items: center;
`;



export default function Home() {
  return (
    <div>
      <Head>
        <title>Home page</title>
        <meta name="description" content="Dashboard for the application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div css={heroSectionStyles}>
          <h1>Free shipping</h1>
          <h2>Limited time only</h2>
          <Link href="/products">Shop Now</Link>
        </div>
        <hr />
        <div>
          <Link href="/products">Best sellers</Link>
        </div>
        <div>
          <ul css={bestSellersList}>
            <li>
              <Image src="/1.jpg" alt="cat in bread" width="300" height="300" />
            </li>
            <li>
              <Image src="/2.jpg" alt="cat in bread" width="300" height="300" />
            </li>
            <li>
              <Image src="/3.jpg" alt="cat in bread" width="300" height="300" />
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
