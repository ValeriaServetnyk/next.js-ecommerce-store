// import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
//  import { Counter } from '../components/Counter';
import { getProducts } from '../util/database';

export default function Cart(props) {
 const [cartItems, setCartItems] = useState(props.foundGoods);
 const [isEmpty, setIsEmpty] = useState(false);
const [total, setTotal] = useState(0);
const [itemCount, setItemCount] = useState(0);



 useEffect (() => {
 if (cartItems.length == 0)
 return

 const total = cartItems.reduce((sum, item) => {
     sum= sum + item.price * item.quantity
    return sum
  }, 0)

  setTotal(total)

 }, [cartItems])

 useEffect (() => {
  if (cartItems.length == 0)
  return

  const totalItemCount = cartItems.reduce((sum, item) => {
      sum= sum + item.quantity
     return sum
   }, 0)

   setItemCount(totalItemCount)

  }, [cartItems])



 useEffect(() =>{
 const currentCart = getParsedCookie('cart');
 if(!currentCart) {
  setIsEmpty(true)
  return
 }
 // const cart = JSON.parse(currentCart)
 let cartItemsArray = cartItems.map((cartItem) => {
  //  const product = getProducts.filter(product => product.id === cartItem.id)



 return {
   id: cartItem.id,
   name: cartItem.name,
   price: cartItem.price,
   quantity: cartItem.quantity,
 }
 })

 setCartItems(cartItemsArray)
 },[cartItems])

 function removeItem(id) {
   const newCart = cartItems.filter(cartItem => cartItem.id != id)
   setCartItems(newCart)
 }
   return (
 <div>
      <Head>
         <title>Shopping cart</title>
         <meta name="checkout page" content="goods ready for checkout" />
         <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Your cart
       </h1>


{isEmpty ? <h2>your cart is empty</h2> : (
<>
<div>
{cartItems.map((item) => {
  return (
    <div key={`cart-${item.id}`}>
<div>Name {item.name}</div>
 <div><Image src={`/${item.id}.jpg`} width="100" height="100" alt="catme" /></div>
 <div>Price {item.price}</div>
 <div>Quantity {item.quantity}</div>

 <div>

<button onClick={() => {
const cartQuantity = item.quantity > 1 ? item.quantity -1 : 1;
const updatedArray = cartItems.map((p) => p.id === item.id ?
{...p, quantity: cartQuantity} : p,);
setCartItems(updatedArray);
const currentCart = getParsedCookie('cart');
const currentProduct = currentCart.find((productInCart) => item.id === productInCart.id,);
currentProduct.quantity > 1 ? (currentProduct.quantity -= 1)
: (currentProduct.quantity = 1);
setStringifiedCookie('cart', currentCart);
}}>
-
</button>
<span>{item.quantity}</span>
<button onClick={() => {
  const cartQuantity = item.quantity + 1;
  const updatedArray = cartItems.map((p) => p.id === item.id ?
  {...p, quantity: cartQuantity} : p,);
  setCartItems(updatedArray);
  const currentCart = getParsedCookie('cart');
  const currentProduct = currentCart.find((productInCart) => item.id === productInCart.id,);
  currentProduct.quantity += 1;
  setStringifiedCookie('cart', currentCart);
}}>
+
</button>
</div>
<div>
<button onClick={() => {
  item.quantity = 0;
  const updatedArray = cartItems.filter( (i) => i.quantity !== 0,);
  setCartItems(updatedArray);
  const currentCart = getParsedCookie('cart');
  const currentProduct = currentCart.find((productInCart) => item.id === productInCart.id,);
  currentProduct.quantity = 0;
  const updatedCart = currentCart.filter((p) => p.quantity !==0,);
  setStringifiedCookie('cart', updatedCart);
}}>
x
</button>
</div>
    </div>
  );
  } )}
</div>
<div>

<span>Total Items: {itemCount}</span>

<div>Total: {total}</div>

</div>
</>

)}





</main>
 </div>
 )
 }









export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');


  const productDatabase = await getProducts();

  let foundGoods = [];

  for (const productInCart of currentCart) {

    const productData = productDatabase.find((product) => {
      return product.id === productInCart.id;
    });
    const superProduct = {...productData, ...productInCart};

    foundGoods.push(superProduct);
  }

  return {
    props: {
      foundGoods: foundGoods,
    },
  };
}
