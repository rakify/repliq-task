import { useProductContext } from '@/context/productContext';
import ProductCard from '../single-product';
import { Grid } from '@mui/material';

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <>
      <section className="">
        <Grid container columns={{ sm: 5, md: 15 }}>
          {products?.map((product) => (
            <ProductCard item={product} key={product._id} />
          ))}
        </Grid>
      </section>
    </>
  );
};
export default ProductList;
