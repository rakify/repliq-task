import { forwardRef, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getProducts } from '@/context/apiCalls';
import Link from 'next/link';
import QuickSearchToolbar from '@/utils/quick-search-toolbar';
import { InfoOutlined } from '@mui/icons-material';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'createdAt',
      headerClassName: 'super-app-theme--header',
      headerName: 'Created At',
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Typography>
            {new Date(params.row.createdAt).toLocaleString()}
          </Typography>
        );
      },
    },
    {
      field: '_id',
      headerClassName: 'super-app-theme--header',
      headerName: 'Product ID',
      width: 200,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Product',
      headerClassName: 'super-app-theme--header',
      width: 350,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.img} alt="" />
            <Typography>{params.row.title}</Typography>
          </Stack>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'inStock',
      headerName: 'Stock',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'seller',
      headerName: 'Seller',
      headerClassName: 'super-app-theme--header',
      width: 200,
      editable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'action',
      headerName: 'Action',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Link
              href={'/product/' + params.row._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <IconButton aria-label="edit">
                <InfoOutlined />
              </IconButton>
            </Link>
          </Stack>
        );
      },
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }} disableGutters>
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#2263a5',
            borderLeftWidth: 1,
            borderColor: '#f1f8ff',
            color: 'white',
          },
        }}
      >
        <DataGrid
          loading={!products.length}
          rows={products}
          getRowId={(row) => row._id}
          columns={columns}
          density="comfortable"
          initialState={{
            sorting: {
              sortModel: [{ field: 'createdAt', sort: 'desc' }],
            },
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </Box>
    </Container>
  );
}
