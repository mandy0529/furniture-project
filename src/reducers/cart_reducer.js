import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

export const CONTROL = 'control';

const getLocalStorage = () => {
  const control = localStorage.getItem(CONTROL);
  if (control) {
    return JSON.parse(control);
  } else {
    return [];
  }
};

export const initialState = {
  cart: getLocalStorage(),
  total_amount: 0,
  total_items: 0,
  total_price: 0,
  shipping_fee: 534,
};

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const {id, color, amount, product} = action.payload;
      const tempCartProducts = state.cart.find(
        (item) => item.id === id + color
      );
      if (tempCartProducts) {
        const tempCart = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            if (newAmount > item.stock) {
              newAmount = item.stock;
            }
            return {...state, amount: newAmount};
          } else {
            return state.cart;
          }
        });
        return {...state, cart: tempCart};
      } else {
        const newCartProducts = {
          id: id + color,
          name: product.name,
          stock: product.stock,
          images: product.images[0].url,
          price: product.price,
          color,
          amount,
        };
        return {...state, cart: [...state.cart, newCartProducts]};
      }

    case REMOVE_CART_ITEM:
      const removedItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {...state, cart: removedItem};

    case CLEAR_CART:
      return {...state, cart: []};

    case TOGGLE_CART_ITEM_AMOUNT:
      const amountedItem = state.cart
        .map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.type === 'inc') {
              if (item.amount > item.stock) {
                item.amount = item.stock;
              }
            }
            return action.payload.type === 'inc'
              ? {...item, amount: item.amount + 1}
              : {...item, amount: item.amount - 1};
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return {...state, cart: amountedItem};

    case COUNT_CART_TOTALS:
      const allPrice = state.cart.reduce(
        (total, item) => {
          const {price, amount} = item;
          total.amount += amount;
          total.price += amount * price;
          return total;
        },
        {
          price: 0,
          amount: 0,
        }
      );
      if (allPrice.price > 10000) {
        return {
          ...state,
          shipping_fee: 0,
          total_price: allPrice.price,
          total_amount: allPrice.amount,
        };
      }
      return {
        ...state,
        total_price: allPrice.price,
        total_amount: allPrice.amount,
        shipping_fee: 545,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
