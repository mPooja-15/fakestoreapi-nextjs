import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { CartProvider } from "../src/CartContext";
import { useDispatchCart } from "../src/CartContext";
import "../styles/globals.css";
const Hydrate = () => {
  const dispatch = useDispatchCart();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const CartLS = JSON.parse(localStorage.getItem("cart")) || [];
      const getCart = (item) => dispatch({ type: "SET_CART", payload: item });
      getCart(CartLS);
    }
  }, []);

  return <></>;
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CartProvider>
        <Hydrate />
        <Component {...pageProps} />
      </CartProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
