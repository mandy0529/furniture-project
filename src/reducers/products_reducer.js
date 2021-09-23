import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

export const initialState = {
  sidebar: false,
  isOpen: false,
};

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return {...state, sidebar: true, isOpen: true};

    case SIDEBAR_CLOSE:
      return {...state, sidebar: false, isOpen: false};
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
