import { useUserContext } from '@/context/userContext';
import { ICartProduct, IGroupedCart } from '@/interfaces/cart.interface';
import { Celebration, Clear } from '@mui/icons-material';
import { Avatar, Button, Stack, Typography, IconButton } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const { currentUser, cart, fetchCartProducts } = useUserContext();
  const [groupedCart, setGroupedCart] = useState<IGroupedCart>({});
  const [totalSaved, setTotalSaved] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) fetchCartProducts(currentUser._id);
  }, [currentUser]);

  useEffect(() => {
    let totalMarketPrice = 0;
    const groupedCart: IGroupedCart = cart.products.reduce(
      (
        sellers: {
          [seller: string]: {
            products: ICartProduct[];
            totalAmount: number;
            totalMarketPrice: number;
          };
        },
        {
          productId,
          title,
          img,
          quantity,
          price,
          marketPrice,
          seller,
          hasMerchantReturnPolicy,
        }
      ) => {
        if (!sellers[seller]) {
          sellers[seller] = {
            products: [],
            totalAmount: 0,
            totalMarketPrice: 0,
          };
        }
        sellers[seller].products.push({
          productId,
          title,
          img,
          quantity,
          price,
          marketPrice,
          seller,
          hasMerchantReturnPolicy,
        });
        sellers[seller].totalAmount += price * quantity;
        sellers[seller].totalMarketPrice += marketPrice * quantity;
        totalMarketPrice += marketPrice * quantity;
        return sellers;
      },
      {}
    );
    totalMarketPrice -= cart.total;
    setGroupedCart(groupedCart);
    setTotalSaved(totalMarketPrice);
  }, [cart]);

  return (
    <>
      <Stack direction="column" gap={1}>
        {!currentUser && (
          <Typography sx={{ textAlign: 'center', marginTop: 5 }}>
            You must login to access cart facility.
          </Typography>
        )}
        {cart && cart.products.length === 0 && !cart.isError && currentUser && (
          <Typography sx={{ textAlign: 'center', marginTop: 5 }}>
            YOUR CART IS CURRENTLY EMPTY!
          </Typography>
        )}

        {cart && cart.products.length > 0 && !cart.isError && (
          <Stack
            direction="column"
            sx={{
              height: '70vh',
              overflowY: 'scroll',
              overflowX: 'hide',
            }}
          >
            {Object.entries(groupedCart).map(
              ([seller, { products, totalAmount, totalMarketPrice }]) => {
                return (
                  <Stack
                    direction="column"
                    key={seller}
                    sx={{ border: '1px solid #9af', mb: 1 }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="overline"
                        sx={{ bgcolor: '#9af', color: 'white', pl: 2, pr: 2 }}
                      >
                        {seller}
                      </Typography>
                      <Typography
                        variant="overline"
                        sx={{
                          bgcolor: '#9af',
                          color: 'white',
                          pr: 2,
                          pl: 2,
                        }}
                      >
                        <s> ৳ {totalMarketPrice}</s> ৳ {totalAmount}
                      </Typography>
                    </Stack>
                    {products.map(
                      ({
                        productId,
                        title,
                        img,
                        quantity,
                        price,
                        marketPrice,
                        seller,
                        hasMerchantReturnPolicy,
                      }) => (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{
                            borderBottom: '0.1px solid #D2D2CF',
                            flexDirection: { xs: 'column', sm: 'row' },
                          }}
                          key={productId}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Avatar
                              src={img}
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 0,
                                mr: 1,
                              }}
                            />
                            <Stack>
                              <Typography sx={{ width: 100 }}>
                                {title.slice(0, 50)}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: 'gray', fontSize: 10 }}
                              >
                                <s>৳ {marketPrice}</s> ৳ {price}
                              </Typography>
                            </Stack>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: 'orangered' }}
                            >
                              ৳ {price * quantity}
                            </Typography>
                          </Stack>
                          <IconButton
                            disabled={loading}
                            size="large"
                            onClick={() => {}}
                          >
                            <Clear />
                          </IconButton>
                        </Stack>
                      )
                    )}
                  </Stack>
                );
              }
            )}
          </Stack>
        )}
        {cart.products.length > 0 && (
          <>
            <Stack
              sx={{
                color: 'orangered',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'center',
              }}
            >
              <Celebration />{' '}
              <Typography>
                <span style={{ color: 'orangered' }}>৳{totalSaved}</span> Saved!
                Great Deal!
              </Typography>
            </Stack>

            <Button variant="contained">
              <Link
                href="/checkout"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  display: 'flex',
                  gap: 10,
                }}
              >
                <Typography>CHECKOUT NOW</Typography>
                <Typography>৳{cart.total}</Typography>
              </Link>
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};

export default CartPage;
