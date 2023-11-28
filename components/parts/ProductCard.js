import { useCart, useDispatchCart } from '../../src/CartContext';

export default function ProductCard({ product }) {
  const dispatch = useDispatchCart()
  const addToCart = () => {
    let item = product;
    item.quantity = 1;
    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    });
  };

  return (
    <div className="max-w-xs border rounded overflow-hidden shadow-lg">
      <a  href={`/product/${product.id}`}>
        <img
          className="w-full h-40 object-cover"
          src={product.image}
          alt={product.title}
        />
      </a>
      <div className="py-1 px-2">
        <div className="flex items-center">
          <div className="w-9/12">
            <h2 className="text-base font-medium capitalize mb-1">
              {product.title}
            </h2>
            <span className="text-body2">${product.price.toLocaleString()}</span>
            <small>
              <del>${(product.price * 1.25).toLocaleString()}</del>
            </small>
          </div>
          <div className="w-3/12 flex justify-end">
            <button
              className="bg-primary  py-2 px-4 rounded-full focus:outline-none"
              onClick={addToCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4a4 4 0 100 8 4 4 0 000-8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v8m0 0V8m0 0h8m-8 0H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


