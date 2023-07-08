'use client';

import {
  Button,
  Typography,
  Card,
  CardMedia,
  Stack,
  Container,
  TextField,
  Divider,
  Slide,
  SlideProps,
} from '@mui/material';

import { GppGood, SecurityUpdateGood } from '@mui/icons-material';
import { ChangeEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProductContext } from '@/context/productContext';
import { useUserContext } from '@/context/userContext';
import Link from 'next/link';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const Product = () => {
  const route = useRouter();
  const productId = useParams().productId;
  const [quantity, setQuantity] = useState(1);

  // const [addedToCartMsg, setAddedToCartMsg] = useState(false);
  // const [addedToWishlistMsg, setAddedToWishlistMsg] = useState(false);

  const { products } = useProductContext();

  // Find the product with the matching ID
  const product = products?.find((product) => product._id === productId);

  const desc = product?.desc.split('\n');

  const { currentUser } = useUserContext();

  const productInfo = {
    productId: product?._id,
    title: product?.title,
    img: product?.img,
    quantity: quantity,
    price: product?.price,
    marketPrice: product?.marketPrice,
    seller: product?.seller,
    hasMerchantReturnPolicy: product?.hasMerchantReturnPolicy,
  };

  const handleAddToCart = () => {
    !currentUser && route.push('/login');
    // currentUser &&
    //   addToCart(currentUser._id, productInfo, dispatch).then(() => {
    //     setAddedToCartMsg(true);
    //   });
  };
  const handleAddToWishlist = () => {
    !currentUser && route.push('/login');
    // currentUser &&
    //   addToWishlist(currentUser._id, productInfo).then(() => {
    //     setAddedToWishlistMsg(true);
    //   });
  };

  return (
    <>
      <Container maxWidth="lg">
        {product ? (
          <Stack
            direction="column"
            // sx={{ flexDirection: { xs: "column", sm: "row" } }}
            spacing={2}
            justifyContent="space-between"
          >
            <Typography variant="h4">{product.title}</Typography>

            <Typography variant="subtitle2">ID: {product._id}</Typography>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              sx={{
                backgroundColor: 'whitesmoke',
                flex: 2,
              }}
            >
              <Card className="w-[300px] max-h-[400px]">
                <CardMedia
                  height="400"
                  component="img"
                  image={product.img}
                  alt="Image"
                  sx={{ objectFit: 'contain' }}
                />
              </Card>
            </Stack>
            <Stack
              direction="column"
              justifyContent="flex-start"
              sx={{ height: 500, width: 500, flex: 3 }}
            >
              <Typography variant="h5">
                ৳{product.price} /{product.unit}
              </Typography>
              <Typography variant="subtitle2">
                only {product.inStock} left In stock
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ marginTop: 5, marginBottom: 2, gap: 5 }}
              >
                <TextField
                  type="number"
                  error={
                    quantity < 1 ||
                    quantity > product.inStock ||
                    quantity % 1 !== 0
                  }
                  id="quantity"
                  label="Quantity"
                  value={quantity}
                  size="small"
                  variant="outlined"
                  helperText={
                    (quantity < 1 ||
                      quantity > product.inStock ||
                      quantity % 1 !== 0) &&
                    'Quantity must be greater than 0 & below stock'
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuantity(e.target.valueAsNumber)
                  }
                  sx={{ width: 100 }}
                />
                <Stack gap={1}>
                  <Button
                    variant="outlined"
                    disabled={
                      quantity < 1 ||
                      quantity > product.inStock ||
                      quantity % 1 !== 0
                    }
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Stack>
              </Stack>
              <Typography variant="button">Description:</Typography>
              <Typography variant="body1">
                {desc?.map((item) => <li key={item}>{item}</li>)}
              </Typography>
              <li>
                Returns:{' '}
                {product.hasMerchantReturnPolicy
                  ? '3 day returns | Buyer pays for return shipping.'
                  : 'This product can not be returned.'}
              </li>
            </Stack>
            <Stack flex={1} gap={4}>
              <Stack>
                <Typography variant="button">Seller Information</Typography>
                <Divider />
                <Typography variant="button" sx={{ mt: 1 }}>
                  {product.seller}
                  <Typography variant="caption">
                    {' '}
                    (95% positive feedback)
                  </Typography>
                  <Link
                    href={`/shop/${product.seller}`}
                    style={{ marginLeft: 1, textDecoration: 'none' }}
                  >
                    [Visit Store]
                  </Link>
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="h5">
                  <GppGood />
                  Top rated seller
                </Typography>
                <Typography>
                  Trusted seller, fast shipping and easy returns. You can shop
                  with confidence.
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="h5">
                  <SecurityUpdateGood />
                  Money Back Gurantee
                </Typography>
                <Typography>
                  Get the product you ordered or get full refund.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Stack>Product with this id does not exist</Stack>
        )}
      </Container>

      {/* <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={Boolean(addedToCartMsg)}
          TransitionComponent={SlideTransition}
          autoHideDuration={2000}
          onClose={() => setAddedToCartMsg(false)}
          message="Added To Cart"
        />
  
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={addedToWishlistMsg}
          TransitionComponent={SlideTransition}
          autoHideDuration={2000}
          onClose={() => setAddedToWishlistMsg(false)}
          message="Added To Wishlist"
        /> */}
    </>
  );
};

export default Product;
