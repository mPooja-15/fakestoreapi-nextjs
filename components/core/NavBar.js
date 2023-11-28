import { useState } from "react";
import { useCart, useDispatchCart } from "../../src/CartContext";
import CartItem from "../parts/CartItem";
import { useRouter } from "next/router";
export default function Header() {
  const [cartDrawer, setCartDrawer] = useState(false);
  const toggleCart = () => {
    setCartDrawer(!cartDrawer);
  };
  const router = useRouter();
  const cart = useCart();
  const dispatch = useDispatchCart();
  const cartTotal = cart.reduce(
    (ac, next) => ac + next.quantity * next.price,
    0
  );

  return (
    <div className="bg-white text-black">
      <div className="flex items-center justify-between p-4">
        <a href="/" naked>
          <img src="/favicon.ico" />
        </a>
        <div className="flex items-center space-x-4">
          <button className="relative" onClick={toggleCart}>
            <div
              style={{
                marginTop: "-17px",
                background: "red",
                padding: "3px",
                height: "18px",
                width: "18px",
                borderRadius:"11px",
                color:"#fff"
              }}
            >
              <span
                className="absolute bg-primary  rounded-full"
                style={{
                  marginTop: "-6px",
                  marginLeft: "-5px",
                }}
              >
                {cart.length}
              </span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
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

      {cartDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="max-w-md mx-auto p-4 bg-white shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold">Shopping Cart</h1>
              <button onClick={toggleCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="border-t border-b divide-y divide-gray-200">
              {cart.length ? (
                cart.map((item) => (
                  <div key={item.id} className="py-3">
                    <CartItem item={item} />
                  </div>
                ))
              ) : (
                <div className="pt-10 pb-4 text-center">
                  <p>Your Cart is Empty</p>
                </div>
              )}
            </div>

            <div className="py-4">
              {cart.length ? (
                <>
                  <button
                    className="text-gray-500 text-sm focus:outline-none"
                    onClick={() => dispatch({ type: "CLEAR" })}
                  >
                    Clear Items
                  </button>
                  <p className="text-right font-semibold text-lg">
                    ${!cart.length ? 0 : cartTotal.toFixed(2)}
                  </p>
                  <button
                    className="bg-primary  py-2 px-4 rounded-full w-full mt-4"
                    onClick={() => router.push("/checkout")}
                  >
                    Checkout
                  </button>
                </>
              ) : (
                <button
                  className="bg-primary text-white py-2 px-4 rounded-full w-full"
                  onClick={toggleCart}
                >
                  Continue shopping
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
