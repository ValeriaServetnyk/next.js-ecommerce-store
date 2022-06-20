import '../styles/globals.css';
import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

const cookieBannerStyles = (isOpen) => css`
  height: ${isOpen ? '30px' : 0};
  overflow: hidden;
  transition: all 200ms ease-in;
`;
export default function MyApp({ Component, pageProps }) {
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [cartQ, setCartQ] = useState([]);

  function cookieButtonHandler() {
    setLocalStorage('cookieAccepted', true);
    setCookieAccepted(true);
  }

  useEffect(() => {
    if (getLocalStorage('cookieAccepted')) {
      setCookieAccepted(getLocalStorage('cookieAccepted'));
    }
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
            text-decoration: none;
          }
        `}
      />
      <div css={cookieBannerStyles(!cookieAccepted)}>
        cookie banner{' '}
        <button
          onClick={() => {
            setCookieAccepted(true);
            cookieButtonHandler();
          }}
        >
          yes
        </button>
      </div>

      <Layout cartQ={cartQ}>
        <Component {...pageProps} setCartQ={setCartQ} />
      </Layout>
    </>
  );
}
