import { css } from '@emotion/react';


const footerStyles = css`
padding: 8px 14px;
background: #7d7d7d;
border-radius: 5px;
display: flex;
justify-content: center;
`;

export default function Footer() {

  return (
    <footer css={footerStyles}>all rights reserved</footer>
  )
}
