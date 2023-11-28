import { useDispatchCart } from '../../src/CartContext';

const CartItem = ({ item, elevation }) => {
  const dispatch = useDispatchCart();

  return (
    <div className={`w-full border ${elevation ? `shadow-${elevation}` : ''}`}>
      <div className="px-1 py-1">
        <div className="flex items-center">
          <div className="w-1/4">
            <img src={item.image} className="w-full h-20 object-cover rounded" alt={item.title} />
          </div>
          <div className="w-2/3 p-2">
            <h2 className="mb-2 text-base font-medium capitalize">
              {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
            </h2>
            <div className="flex items-center">
              <button
                className="text-red-500 focus:outline-none"
                onClick={() => dispatch({ type: 'DECREASE_QTY', payload: item.id })}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="text-green-500 focus:outline-none"
                onClick={() => dispatch({ type: 'INCREASE_QTY', payload: item.id })}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-1/6 text-right">
            <button
              className="text-red-500 focus:outline-none"
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
            >
              X
            </button>
            <p className="text-sm">${item.price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
