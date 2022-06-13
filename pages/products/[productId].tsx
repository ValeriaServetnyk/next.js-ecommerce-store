import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getProduct } from '../../util/database';
import { queryParamToNumber } from '../../util/queryParams';

// every product page is here. First goes an error message if such product id does not exist. Make sure pics id correspond to the item id

const buttonStyles =css`
padding: 10px 30px 10px 30px;
background-color: #6e73a1;
border-radius: 10px;
border: none;
color: white;
`;

const productPage = css`
display: flex;
flex-direction: row;
gap: 20px;
`;

const productInfoContainer = css`
display: flex;
flex-direction: column;
margin: 40px 50px 40px 50px;
text-align: center;

`;

const productDescription = css`
display: flex;
flex-direction: column;
margin: 40px 50px 40px 50px;
text-align: center;
margin-right: 100px;
h1{
font-family: Roboto;
font-weight: 400;
font-size: 30px;
}
`;


export type ProductInCart = {
  id: string;
  counter: number;
  };

  type Props = {
    product: {
      name: string;
      id: string;
      description: string;
      price: string;
      counter: number;
    }
  };



export default function Products(props: Props) {
  // check if the product is in cart by checking the counter. If the counter is present then is in cart
  const [ inCart, setInCart] = useState('counter' in props.product);
  // initialize the counter with the value of the cookie
  const [counter, setCounter] = useState(props.product.counter || 0);


  // if product id is invalid return this
 if(!props.product) {
  return ( <div>
    <Head>
      <title>Product not found</title>
      <meta
            name="description"
            content="Unfortunately this product is currently unavailable"
          />
          </Head>

          <h1>Product not found</h1>
      </div>
      )
}

// if there is a correct product it

  return  (

  <div css={productPage}>

    <div css={productInfoContainer}>
          <div>
            <Image src={`/${props.product.id}.jpg`} width="600" height="600" alt="catme" />
            </div>

          <div css={productDescription}>
          <h1>{props.product.name}</h1>
          <p>{props.product.description}</p>
    <h2>{props.product.price}</h2>
<div>

 <button onClick={() => {
   if (counter > 1) {
     setCounter((count) => count -1);
   }
 }}> -
   </button>
   <span>{counter}</span>
  <button onClick={() => {
    setCounter (counter+1);
  }}>
    +
  </button>


   {/* {inCart ? (
<>
{counter}
 <button onClick={() => {
   // get cookie counter
   setCounter(counter+1);
   const currentCart = Cookies.get('cart') ?
   JSON.parse(Cookies.get('cart')) : [];

  const currentProductInCart = currentCart.find((productInCart: ProductInCart) => props.product.id === productInCart.id,);
currentProductInCart.counter += 1;
Cookies.set('cart', JSON.stringify(currentCart));
}}>
  +
  </button>
  <button onClick={() => {
    if (counter > 1)
   {setCounter((count) => count - 1)};
   const currentCart = Cookies.get('cart') ?
   JSON.parse(Cookies.get('cart')) : [];

  const currentProductInCart = currentCart.find((productInCart: ProductInCart) => props.product.id === productInCart.id,);
currentProductInCart.counter -= 1;
Cookies.set('cart', JSON.stringify(currentCart));
}}>
  -
  </button>
  </>
  ) : ('')} */}

</div>



{/* <button css={buttonStyles} onClick={() => {
// get original array from cookies
 const currentCart = Cookies.get('cart') ?
 getParsedCookie('cart') : [];
// is the cart defined, if not return empty array
let newCart: any;


// if the product is inside the cart
if(currentCart.find((productInCart: ProductInCart) =>
props.product.id === productInCart.id)) {

newCart = currentCart.filter((productInCart: ProductInCart) =>
productInCart.id !== props.product.id);
setInCart(false);
setCounter(0)
} else {
// add the value (spread operator)
  newCart = [...currentCart, {id: props.product.id, counter: 0}];
  setInCart(true);

}
// set cookie to the new value
  setStringifiedCookie('cart', newCart);
  }}>{inCart ? 'Remove from cart' : 'Add to cart'}</button> */}
<button onClick={() => {
  const currentCart =Cookies.get('cart') ? getParsedCookie('cart')
  : [];
  let newCart: any;
 const productInCart = currentCart.find((currentProduct: ProductInCart) => props.product.id === currentProduct.id,);
 if (productInCart) {
   productInCart.quantity = productInCart.quantity +counter;
   newCart = currentCart;
 } else {
   newCart =[
     ...currentCart, { id: props.product.id, quantity: counter},
   ];
 }
setStringifiedCookie('cart', newCart);
}}>
Add to cart
</button>
</div>
</div>

    </div>

    )
}

// retrieves the data from the server aka database. Only use in pages
export async function getServerSideProps(context: GetServerSidePropsContext) {
 const currentCart = JSON.parse(context.req.cookies.cart || '[]');

//   const foundProduct = productsDatabase.find((product) => {
//     return (
//       product.id===
//       context.query.productId
//     );
//   });

//   if(!foundProduct) {
//     context.res.statusCode = 404;
//   };

const productId = queryParamToNumber(context.query.productId)

const product = await getProduct(productId);

const foundProduct = {
  id: product.id,
  name: product.name,
  price: product.price,
  description: product.description,
};


  const currentProductInCart = currentCart.find((productInCart: ProductInCart) => foundProduct.id === productInCart.id,
 );

const superProduct = {...foundProduct, ...currentProductInCart}

return {
  props: {

    product: superProduct || null,

  },
}

}

  // const increase = () => {
  //   setCount(count => count + 1);
  // }

  // const decrease = () => {
  //   setCount(count => count - 1);
  //     if (count <= 1) {
  //       setCount(1);
  //     }}

//   useEffect(() => {
//     const currentCart = Cookies.get('cart') ?
//     JSON.parse(Cookies.get('cart')) : [];

//    if (currentCart.find((productInCart) => props.product.id === productInCart.id)) {
//      setInCart(true);
//    } else {
//      setInCart(false);
//    }
//   }, [props.product.id]);

//   useEffect(() => {
//     const currentCart = Cookies.get('cart') ?
//  JSON.parse(Cookies.get('cart')) : [];
//  const currentProductInCart = currentCart.find((productInCart) => props.product.id === productInCart.id,
//  );
// if (currentProductInCart) {
//   setCounter(currentProductInCart.counter);
// }},[props.product.id]);