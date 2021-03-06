import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

export const initialState = {
  filltered_products: [],
  all_products: [],
  grid_view: false,
  sort: 'price-lowest',
  filter: {
    query: '',
    category: 'all',
    company: 'all',
    colors: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((item) => {
        return item.price;
      });
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        all_products: [...action.payload],
        filltered_products: [...action.payload],
        filter: {...state.filter, max_price: maxPrice, price: maxPrice},
      };

    case SET_LISTVIEW:
      return {...state, grid_view: false};

    case SET_GRIDVIEW:
      return {...state, grid_view: true};

    case UPDATE_SORT:
      return {...state, sort: action.payload};

    case SORT_PRODUCTS:
      const {filltered_products, sort} = state;
      let tempProducts = [...filltered_products];
      if (sort === 'price-lowest') {
        console.log(sort, 'sort');
        tempProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === 'price-highest') {
        console.log(sort, 'sort');
        tempProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === 'name-a') {
        console.log(sort, 'sort');
        tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === 'name-z') {
        console.log(sort, 'sort');
        tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return {...state, filltered_products: tempProducts};

    case UPDATE_FILTERS:
      const {name, value} = action.payload;

      return {...state, filter: {...state.filter, [name]: value}};

    case FILTER_PRODUCTS:
      const {
        all_products,
        filter: {query, category, company, colors, price, shipping},
      } = state;
      let allProducts = [...all_products];
      if (query) {
        allProducts = allProducts.filter((item) => {
          return item.name.includes(query);
        });
      }
      if (category !== 'all') {
        allProducts = allProducts.filter((item) => {
          return item.category === category;
        });
      }
      if (company !== 'all') {
        allProducts = allProducts.filter((item) => {
          return item.company === company;
        });
      }
      if (colors !== 'all') {
        allProducts = allProducts.filter((item) => {
          return item.colors.find((item) => {
            return item === colors;
          });
        });
      }
      allProducts = allProducts.filter((item) => {
        return item.price <= price;
      });

      if (shipping) {
        allProducts = allProducts.filter((item) => {
          return item.shipping === true;
        });
      }
      return {...state, filltered_products: allProducts};

    case CLEAR_FILTERS:
      return {
        ...state,
        filter: {
          ...state.filter,
          query: '',
          category: 'all',
          company: 'all',
          colors: 'all',
          price: state.filter.max_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
