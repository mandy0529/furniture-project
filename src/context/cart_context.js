import React, {useEffect, useContext, useReducer} from 'react';
import reducer, {CONTROL, initialState} from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

const CartContext = React.createContext();

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({type: ADD_TO_CART, payload: {id, color, amount, product}});
  };

  const removeCartItem = (id) => {
    dispatch({type: REMOVE_CART_ITEM, payload: id});
  };

  const clearCartItem = () => {
    dispatch({type: CLEAR_CART});
  };

  const toggleCartItem = (id, type) => {
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, type}});
  };

  const calculatedItem = () => {
    dispatch({type: COUNT_CART_TOTALS});
  };

  useEffect(() => {
    calculatedItem();
    localStorage.setItem(CONTROL, JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeCartItem,
        clearCartItem,
        toggleCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
