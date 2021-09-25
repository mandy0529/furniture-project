import React, {useEffect, useContext, useReducer} from 'react';
import reducer, {initialState} from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import {useProductsContext} from './products_context';

const FilterContext = React.createContext();

export const FilterProvider = ({children}) => {
  const {products} = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const controlGridView = () => {
    dispatch({type: SET_GRIDVIEW});
  };
  const controlListView = () => {
    dispatch({type: SET_LISTVIEW});
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({type: UPDATE_SORT, payload: value});
  };

  useEffect(() => {
    dispatch({type: LOAD_PRODUCTS, payload: products});
  }, [products]);

  useEffect(() => {
    dispatch({type: SORT_PRODUCTS});
  }, [state.sort, products]);

  return (
    <FilterContext.Provider
      value={{...state, controlGridView, controlListView, updateSort}}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
