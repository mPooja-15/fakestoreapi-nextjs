import Layout from '../../components/Layout';
import { useDispatchCart } from '../../src/CartContext';
import { useState } from 'react';

const ProductPage = ({ product }) => {
  const dispatch = useDispatchCart();
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(prevState => prevState + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevState => prevState - 1);
    }
  };

  function addToCart() {
    let item = product;
    item.quantity = quantity;
    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    });
  }

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img src={product.image} className="w-full h-full rounded" alt={product.title} />
          </div>
          <div className="col-span-1">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
              <div className="flex items-center mb-2">
                <span className="text-lg font-semibold">${product.price.toLocaleString()}</span>
                <del className="text-gray-500 pl-2">${(product.price * 1.25).toLocaleString()}</del>
              </div>
            </div>
            <div className="mb-4">
              <span className="pr-2"><b>Quantity:</b></span>
              <button className="text-lg" onClick={decrement}>-</button>
              <span className="px-2">{quantity}</span>
              <button className="text-lg" onClick={increment}>+</button>
            </div>
            <button
              className="bg-primary text-white py-2 px-4 rounded-full text-lg"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-8">
          <div className="bg-white rounded p-4">
            <p className="text-gray-800">{product.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  let products = [];
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=12');
    products = await res.json();
  } catch (err) {
    console.log(err);
  }

  if (!products) {
    return {
      notFound: true,
    };
  }

  const paths = products.map((prod) => ({
    params: { id: String(prod.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  let product = {};
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    product = await res.json();
  } catch (err) {
    console.log(err);
  }

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export default ProductPage;
