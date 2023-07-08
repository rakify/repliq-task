import { useProductContext } from '@/context/productContext';
import ProductCard from '../single-product';
import { Grid } from '@mui/material';

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <>
      <section className="">
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          columns={{ xs: 5, sm: 10, md: 15 }}
        >
          {products?.map((product) => (
            <ProductCard item={product} key={product._id} />
          ))}
        </Grid>
      </section>
    </>
  );
};
export default ProductList;
