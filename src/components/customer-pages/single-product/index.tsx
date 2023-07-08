import { addToCart } from '@/context/apiCalls';
import { useUserContext } from '@/context/userContext';
import { IAddToCartInput } from '@/interfaces/cart.interface';
import { IProduct } from '@/interfaces/product.interface';
import { ShoppingCartOutlined, InfoOutlined } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  width: 400,
  height: 300,
  margin: 5,
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  width: '100%',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontWeight: 700,
}));

const ProductComponent: React.FC<{ item: IProduct }> = ({ item }) => {
  const route = useRouter();

  const { currentUser, setCart } = useUserContext();

  const handleAddToCart = () => {
    !currentUser && route.push('/auth/signIn');

    if (currentUser && item) {
      const productInfo = {
        productId: item._id,
        title: item.title,
        img: item.img,
        quantity: 1,
        price: item.price,
        marketPrice: item.marketPrice,
        seller: item.seller,
        hasMerchantReturnPolicy: item.hasMerchantReturnPolicy,
      };
      const addToCartInput: IAddToCartInput = {
        id: currentUser?._id,
        product: productInfo,
      };
      addToCart(addToCartInput).then((res) => {
        setCart(res.data);
        toast.success('Product added to cart');
      });
    }
  };

  return (
    <Grid item>
      <Item
        sx={{
          '&:hover': {
            '& .details': {
              opacity: 1,
              height: 40,
              webkitTransition: 'all 0.5s linear',
              mozTransition: 'all 0.5s linear',
              transition: 'all 0.5s linear',
              overflow: 'hidden',
            },
          },
        }}
      >
        <Stack
          direction="column"
          sx={{
            flex: 2,
            height: 150,
            width: 200,
            position: 'relative',
          }}
        >
          <Image
            className="m-auto block max-w-full max-h-full"
            alt="PRODUCT"
            src={item.img}
          />
          <Stack
            direction="row"
            justifyContent="space-around"
            className="details"
            sx={{
              opacity: 0,
              width: 200,
              height: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              bgcolor: 'transparent',
              pt: 1,
              position: 'absolute',
              bottom: 0,
              color: 'black',
            }}
          >
            <IconButton
              color="primary"
              size="medium"
              onClick={handleAddToCart}
              sx={{ '&:hover': { bgcolor: '#CBF1F5' } }}
            >
              <Tooltip title="Add to Cart" placement="top" arrow>
                <ShoppingCartOutlined fontSize="inherit" />
              </Tooltip>
            </IconButton>
            <IconButton
              color="primary"
              size="medium"
              sx={{ '&:hover': { bgcolor: '#CBF1F5' } }}
            >
              <Link
                href={`/product/${item._id}`}
                style={{ textDecoration: 'none' }}
              >
                <Tooltip title="View Details" placement="top" arrow>
                  <InfoOutlined fontSize="inherit" />
                </Tooltip>
              </Link>
            </IconButton>
          </Stack>
        </Stack>

        <Button
          onClick={() => route.push('/product/' + item._id)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            width: 300,
          }}
        >
          <ProductTitle>{item.title}</ProductTitle>
          <Typography sx={{ fontWeight: 600, color: 'orangered' }}>
            ৳{item.price}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: 400 }}
          >
            <s>৳{item.marketPrice}</s>{' '}
            <b style={{ fontWeight: 600 }}>
              {Math.round(
                ((item.marketPrice - item.price) / item.marketPrice) * 100
              ) > 0 &&
                Math.round(
                  ((item.marketPrice - item.price) / item.marketPrice) * 100
                ) + '%'}
            </b>
          </Typography>
        </Button>
      </Item>
    </Grid>
  );
};

export default ProductComponent;
