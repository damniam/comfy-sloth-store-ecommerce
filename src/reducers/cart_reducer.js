import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);

      if (tempItem) {
        const tempProducts = state.cart.map((item) => {
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
        return { ...state, cart: tempProducts };
      } else {
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
    }
    case REMOVE_CART_ITEM:
      let tempArray = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: tempArray };
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { sign, id } = action.payload;
      let cartItem = state.cart.filter((item) => item.id === id);
      const { amount, max } = cartItem[0];

      let tempItems = state.cart.map((item) => {
        if (item.id === id) {
          if (sign === "inc") {
            let newAmount = amount + 1;
            if (newAmount > max) {
              newAmount = max;
            }
            return { ...item, amount: newAmount };
          }
          if (sign === "dec") {
            let newAmount = amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });
      return { ...state, cart: tempItems };
    }
    case CLEAR_CART:
      return { ...state, cart: [] };
    case COUNT_CART_TOTALS:
      let calculatedPrice = state.cart.reduce(
        (total, item) => {
          const { amount, price } = item;
          total.total_items += amount;
          total.total_amount += price * amount;

          return total;
        },
        { total_items: 0, total_amount: 0 }
      );
      return {
        ...state,
        total_items: calculatedPrice.total_items,
        total_amount: calculatedPrice.total_amount,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
