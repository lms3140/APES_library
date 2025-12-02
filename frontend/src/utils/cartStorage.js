const CART_KEY = "bookshop_cart";

// 장바구니 조회
export const getCartItems = () => {
  const items = localStorage.getItem(CART_KEY);
  return items ? JSON.parse(items) : [];
};

// 장바구니 추가
export const addCartItem = (item) => {
  const cart = getCartItems();
  const existingIndex = cart.findIndex(i => i.bookId === item.bookId);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// 수량 변경
export const updateCartItemQuantity = (bookId, quantity) => {
  const cart = getCartItems();
  const item = cart.find(i => i.bookId === bookId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

// 삭제
export const removeCartItem = (bookId) => {
  const cart = getCartItems().filter(i => i.bookId !== bookId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// 장바구니 초기화
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

// 장바구니에 같은 상품이 있는지 확인
export const isInCart = (bookId) => {
  const cart = getCartItems();
  return cart.some(i => i.bookId === bookId);
};
