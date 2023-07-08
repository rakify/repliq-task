import { useProductContext } from '@/context/productContext';
import ProductCard from '../single-product';
import { Grid } from '@mui/material';

const ProductList = () => {
  const { products } = useProductContext();
  console.log(products);
  let cartOpen = false;

  return (
    <>
      <section className="">
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          columns={{ xs: 5, sm: cartOpen ? 5 : 10, md: cartOpen ? 10 : 15 }}
        >
          {products?.map((product) => <ProductCard item={product} />)}
        </Grid>
      </section>
    </>
  );
};
export default ProductList;
