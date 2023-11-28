import { useState } from "react";
import CartItem from "../components/parts/CartItem";
import Layout from "../components/Layout";
import Head from "../components/core/Head";
import { useCart } from "../src/CartContext";

const Checkout = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [openDialog, setDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const [card, setCard] = useState({
    holder: "",
    number: "",
    exp: "",
    cvv: "",
  });

  const updateUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateCard = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  const hasEmptyVal = (obj) => {
    console.log(obj, "objobjobjobj");
    return Object.values(obj).some((x) => x === "");
  };

  const processPayment = async (e) => {
    e.preventDefault();

    const data = {
      billing: { ...user },
      payment: { ...card },
      orders: [...cart],
    };
    if (!loading) {
      startLoading();
      //
      setTimeout(() => {
        console.log(data);
        stopLoading();
        setDialog(true);
      }, 2000);
    }
  };

  const cart = useCart();
  const cartTotal = cart.reduce(
    (ac, next) => ac + next.quantity * next.price,
    0
  );

  const loadingColor = { color: "white" };
  console.log(hasEmptyVal(card), hasEmptyVal(user));
  return (
    <div className="min-h-screen bg-gray-100">
      <Layout>
        <Head title="Checkout" />
        <div className="py-10">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                {/* Order Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">Order Summary</h2>
                    <div>
                      {cart.map((item) => (
                        <div key={item.id} className="mb-2">
                          <CartItem item={item} />
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold">
                        ${!cart.length ? 0 : cartTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {/* Billing Section */}
                  <div>
                    <div className="p-4 bg-gray-100">
                      <h2 className="text-2xl font-semibold">
                        Billing Address
                      </h2>
                      <div className="grid grid-cols-1 gap-4">
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={updateUser}
                          placeholder="Full Name"
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={updateUser}
                          placeholder="email"
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="number"
                          name="phone"
                          value={user.phone}
                          onChange={updateUser}
                          placeholder="phone"
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="text"
                          name="address"
                          value={user.address}
                          onChange={updateUser}
                          placeholder="address"
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="text"
                          name="city"
                          value={user.city}
                          onChange={updateUser}
                          placeholder="city"
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="text"
                          name="state"
                          value={user.state}
                          onChange={updateUser}
                          placeholder="State"
                          className="border p-2 rounded-md w-full"
                        />
                        {/* ... Other input fields ... */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Credit card Section */}
                <div className="mt-8">
                  <div className="p-4 bg-gray-100">
                    <h2 className="text-2xl font-semibold">Payment Card</h2>
                    <form>
                      <div className="grid grid-cols-1 gap-4">
                        <input
                          type="text"
                          name="holder"
                          value={card.holder}
                          onChange={updateCard}
                          placeholder="Card Holder"
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="text"
                          name="number"
                          value={card.number}
                          onChange={updateCard}
                          placeholder="number"
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="text"
                          name="exp"
                          value={card.exp}
                          onChange={updateCard}
                          placeholder="exp"
                          className="border p-2 rounded-md w-full"
                        />
                        <input
                          type="text"
                          name="cvv"
                          value={card.cvv}
                          onChange={updateCard}
                          placeholder="cvv"
                          className="border p-2 rounded-md w-full"
                        />
                      </div>
                      <button
                        className="mt-4 bg-blue-500 text-white rounded-full px-6 py-3"
                        disabled={hasEmptyVal(card) || hasEmptyVal(user)}
                        onClick={processPayment}
                        type="submit"
                      >
                        {loading ? (
                          <div className="flex items-center">Processing...</div>
                        ) : (
                          `Pay $${cartTotal}`
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openDialog && (
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <p onClick={() => setDialog(false)} className="text-end">X</p>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Payment was Successful!
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Checkout;
