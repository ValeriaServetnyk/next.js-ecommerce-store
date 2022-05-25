import '../styles/globals.css';
import {css, Global} from '@emotion/react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
  <>
  <Global
  styles={css`
  html, body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
* {
  box-sizing: border-box;
}
  `} />
   <Layout>
   <Component {...pageProps} />
   </Layout>
   </>
  );
}
