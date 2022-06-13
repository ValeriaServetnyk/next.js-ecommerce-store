import { css } from '@emotion/react';
import { useState } from 'react';

const counterButtons = css`
padding: 10px 20px 10px 20px;
background-color: #6e73a1;
border-radius: 10px;
border: none;
color: white;
`;
export function Counter (props) {

  const [count, setCount] = useState(1);

  const increase = () => {
    setCount(count => count + 1);
  }

  const decrease = () => {
    setCount(count => count - 1);
      if (count <= 1) {
        setCount(1);
      }
    }

  return (
    <>

    <button css={counterButtons} onClick={decrease}> - </button>
    <span>{count}</span>
    <button css={counterButtons} onClick={increase}
    > + </button>
    </>
  );
}
