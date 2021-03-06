import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const topHeaderStyles = css`
  background: #6e73a1;
  height: 40px;
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  > h2 {
    font-size: 14px;
    color: #ffff;
    font-family: Roboto;
  }
`;

const topLoginStyles = css`
  list-style: none;
  display: flex;

  > li {
    font-size: 15px;
    color: #ffff;
    font-family: Roboto;
    text-decoration: none;
    padding: 15px;

    :hover {
      color: #76cccb;
    }
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
  margin: 20px 0 20px 410px;

  > li {
    font-size: 15px;
    color: #ffff;
    font-family: Roboto;
    text-decoration: none;
    padding: 15px;
    text-transform: uppercase;

    :hover {
      color: #76cccb;
    }
  }
`;

const catLogoStyles = css`
  text-align: center;
  padding: 40px 0px 40px 0px;
`;

const cartStyles = css`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 50px;
`;

export default function Header(props) {
  const removeCartNumber = props.cartQ;

  let totalQ = 0;
  for (let i = 0; i < removeCartNumber.length; i++) {
    totalQ += removeCartNumber[i].quantity;
  }

  return (
    <header>
      <div css={topHeaderStyles}>
        <h2>Expect 2-3 week delivery</h2>

        <ul css={topLoginStyles}>
          <li>
            <Link href="/">Login</Link>
          </li>
        </ul>
      </div>

      <div css={catLogoStyles}>
        <div>
          <Image src="/catlogo.jpg" alt="shop logo" width="140" height="140" />
        </div>
      </div>
      <div css={bottomHeaderStyles}>
        <div>
          <ul css={bottomMenuStyles}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link data-test-id="products-link" href="/products">
                Best sellers
              </Link>
            </li>
            <li>
              <Link href="/accessories">Accessories</Link>
            </li>
          </ul>
        </div>

        <div css={cartStyles}>
          <Link href="/cart">
            <Image
              data-test-id="cart-link"
              src="/bag.png"
              alt="cart icon"
              width="18"
              height="18"
            />
          </Link>
          <div data-test-id="cart-count">{props.cartQ}</div>
        </div>
      </div>
    </header>
  );
}
