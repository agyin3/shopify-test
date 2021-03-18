import { client } from "./shopify";
const getCartItems = async () => {
  let checkoutId = localStorage.getItem("checkoutId");
  let cartItems = 0;
  if (checkoutId) {
    let cart = await client.checkout.fetch(checkoutId);
    cart = JSON.parse(JSON.stringify(cart));
    cartItems = cart.lineItems.length;
    console.log(cartItems);
  }
  return cartItems;
};

export { getCartItems };
