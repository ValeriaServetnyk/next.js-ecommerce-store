import { productsDatabase } from '../../util/database';
import Head from 'next/head';
import Image from 'next/image';

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
          <Image src={`/${props.product.id}.jpg`} width="400" height="300" />
    </div>
    <div>{props.product.description}</div>
    <div>{props.product.price}</div>
    </div>
    </div>
    </div>
    </div>

    )
}

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