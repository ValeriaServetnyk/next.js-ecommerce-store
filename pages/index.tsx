import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const heroSectionStyles = css`
background-image: url("/hero-page.jpg");
width: 1280;
height: 650px;
background-size: cover;
margin: 40px, 30px, 50px, 30px;
text-align: center;
font-family: Roboto;
text-transform: uppercase;

 h1 {
   color: #ffff;
   font-weight: 500;
   font-size: 36px;
   margin-bottom: 0px;
   padding: 300px;

 }
 h2 {
  color: #ffff;
  font-weight: 400;
  font-size: 16px;
margin-bottom: 30px;
margin-top: -280px;
 }
a {
  color: black;
  background: #ffff;
  padding: 15px;
  border: solid, black;
  border-radius: 5px;

}

`;

const bestSellersList = css`
list-style: none;
display: flex;
align-items: center;
gap: 120px;
`;

const favoritesStyles = css`
text-align: center;
font-family: Roboto;
text-transform: uppercase;
margin-top: 30px;
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
<br />
<div css={favoritesStyles}>
          <Link href="/products">Favorites</Link>
        </div>
        <hr />

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
        <br />
        <div css={favoritesStyles}>
          <Link href="/products">New Arrivals</Link>
        </div>
        <hr />

        <div>
          <ul css={bestSellersList}>
            <li>
              <Image src="/4.jpg" alt="cat in bread" width="300" height="300" />
            </li>
            <li>
              <Image src="/5.jpg" alt="cat in bread" width="300" height="300" />
            </li>
            <li>
              <Image src="/6.jpg" alt="cat in bread" width="300" height="300" />
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
