import { css } from '@emotion/react';
import Link from 'next/link';
import Image from 'next/image';

const topHeaderStyles = css`
background: #6e73a1;
height: 40px;
width: auto;
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px;


>h1 {
font-size: 14px;
color: #ffff;
font-family: Roboto;
}
`;

const topLoginStyles = css`
  text-decoration: none;
  list-style: none;
  display: flex;

  >li {
font-size: 15px;
color: #ffff;
font-family: Roboto;
text-decoration: none;
padding: 15px;
  }
  `;

const bottomHeaderStyles = css`
background: #f9f9f9;
height: 40px;
width: auto;
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px;

`;

const bottomMenuStyles = css`
list-style: none;
display: flex;
align-items: center;
margin: 20px 0 20px 460px;


>li {
font-size: 15px;
color: #ffff;
font-family: Roboto;
text-decoration: none;
padding: 15px;
}
`;

const catLogoStyles = css`
margin: 30px 0 20px 600px;
`;


const cartStyles = css`
font-size: 15px;
color: #ffff;
font-family: Roboto;
text-decoration: none;
padding: 15px;
margin-right: 200px;
color: #252525;
`;

export default function Header() {
  return (
    <header>
      <div css={topHeaderStyles}>
      <h1>Expect 2-3 week delivery</h1>
    <ul css={topLoginStyles}>
  <li><Link href="/home">Login</Link></li>
  <li><Link href="/about">Register</Link></li>
  </ul>
</div>
<div css={catLogoStyles}>
  <div>
          <Image src="/catlogo.jpg" alt="shop logo" width="140" height="140"/>
</div>
          </div>
  <div css={bottomHeaderStyles}>
        <div>
          <ul css={bottomMenuStyles}>
       <li><Link href="/home">Home</Link></li>
        <li><Link href="/products">Best sellers</Link></li>
        <li><Link href="/">Accessories</Link></li>
        </ul>
        </div>
        <div css={cartStyles}>
  <Link href="/cart">Cart</Link>
  </div>
  </div>
  </header>


  );
}