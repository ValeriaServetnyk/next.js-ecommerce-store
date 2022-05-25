import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { css } from '@emotion/react';

const heroImageStyles = css`
margin: 10px 0px 0px 10px;
position: absolute;
z-index: 1;
`;

const heroSectionTitle = css`
background: #0cf;
margin-top: -1.6rem;
position: relative;
z-index: 99;
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
        <div>
        <img src="//cdn.shopify.com/s/files/1/1352/9911/files/Catify_logo_purple_140x.png?v=1516982770" srcset="//cdn.shopify.com/s/files/1/1352/9911/files/Catify_logo_purple_140x.png?v=1516982770 1x, //cdn.shopify.com/s/files/1/1352/9911/files/Catify_logo_purple_140x@2x.png?v=1516982770 2x" alt="catify logo" itemprop="logo" />
          </div>
        <div>

<Image css={heroImageStyles} src="/hero-page.jpg" alt="cat in bread" width="1000" height="650" />
<h1 css={heroSectionTitle}>
          Cat themed gift shop
        </h1>
</div>
<hr />
        <div>
        <Link href="/products">Best sellers</Link>
        </div>
        <div>
          <ul>
            <li><Image src="/bread-cat.jpg" alt="cat in bread" width="400" height="300" /></li>
            <li><Image src="/kitties.jpg" alt="cat in bread" width="400" height="300" /></li>
            <li><Image src="/paper-cats.jpg" alt="cat in bread" width="400" height="300" /></li>
            </ul>
          </div>
      </main>
    </div>
  );
}
