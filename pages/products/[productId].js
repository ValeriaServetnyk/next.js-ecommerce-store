import Head from 'next/head';
import Image from 'next/image';
import { productsDatabase } from '../../util/database';
import { useState } from 'react';

// counter would be applied to every product page hence it goes here and then read after return
function Counter() {
  const [count, setCount] = useState(1);
  return (
    <>
    <button onClick={() => setCount(count + 1)}>+</button>
    {count}
    <button onClick={() => setCount(count - 1)}>-</button>
    </>
  )
}

// every product page is here. First goes an error message if such product id doesn`t exist. Make sure pics id correspond to the item id

export default function Products(props) {
 if(!props.product) {
  return ( <div>
    <Head>
      <title>Product not found</title>
      <meta
            name="description"
            content="Unfortunately, we have had trouble locating the animal you are looking for. Better luck next time."
          />
          </Head>

          <h1>Product not found</h1>
      </div>
      )
}
  return  (
  <div>
    <div>
      <h1>{props.product.name}</h1>
      <div>
        <div><div>
          {console.log(props.product.id)}
          <Image src={`/${props.product.id}.jpg`} width="300" height="300" alt="catme" />
    </div>
    <div>{props.product.description}</div>
    <div>{props.product.price}</div>
<Counter />
<button>Add to cart</button>
    </div>
    </div>
    </div>
    </div>

    )
}

// retrieves the data from the server aka database. Only use in pages
export function getServerSideProps(context) {

  const foundProduct = productsDatabase.find((product) => {
    return (
      product.id===
      context.query.productId
    );
  });

  if(!foundProduct) {
    context.res.statusCode = 404;
  };

return {
  props: {

    product: foundProduct || null,

  },
}

}