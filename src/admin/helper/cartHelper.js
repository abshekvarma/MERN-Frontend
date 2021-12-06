export default function addItemToCart(item, next) {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...item, count: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    next();
  }
}

export function loadCart() {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
}

export function removeItemFromCart(productId) {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
}

export function cartEmpty(next) {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    next();
  }
}
