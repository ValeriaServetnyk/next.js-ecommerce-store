import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
background: #6e73a1;
height: 40px;
font-size: 15px;
color: #ffff;
width: auto;
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px;
font-family: Roboto;
text-decoration: none;
`;

const loginMenuStyles = css`
display: flex;
justify-contect: space-between;
margin: 5px;
`

export default function Header() {
  return (
    <header css={headerStyles}>Expect 2-3 week delivery
    <div css={loginMenuStyles}>
      <div>
  <Link href="/home">Login</Link>
  </div>
  <div>
  <Link href="/about">Register</Link>
  </div>
  </div>

  </header>
  );
}