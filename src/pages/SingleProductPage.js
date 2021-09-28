import React, {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useProductsContext} from '../context/products_context';
import {single_product_url as url} from '../utils/constants';
import {formatPrice} from '../utils/helpers';
import {Loading, Error, ProductImages, AddToCart, Stars} from '../components';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const SingleProductPage = () => {
  const {
    fetchSingleProduct,
    singleProduct: data,
    single_loading: loading,
    single_error: error,
  } = useProductsContext();

  const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        history.push('/');
      }, 3000);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = data;
  return (
    <Wrapper>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available :</span>
              {stock > 0 ? 'In stock' : 'Out of stock'}
            </p>
            <p className="info">
              <span>sku :</span>
              {sku}
            </p>
            <p className="info">
              <span>brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart data={data} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
