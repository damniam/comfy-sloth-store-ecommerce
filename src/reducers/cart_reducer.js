import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      // check if product with certain id is already added to cartArray
      const tempItem = state.cart.find((item) => item.id === id + color);

      if (tempItem) {
        //true
        // get that item with all property
        const tempItem = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          } else {
            return item;
          }
        });
        return {...state, cart: tempItem}
      } else {
        // if we don't have item create new one
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
