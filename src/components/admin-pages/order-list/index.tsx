import { useEffect, useState } from 'react';
import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getOrders } from '@/context/apiCalls';
import QuickSearchToolbar from '@/utils/quick-search-toolbar';

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((res) => setOrders(res));
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
      renderCell: (params: any) => {
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
      headerName: 'Order ID',
      width: 250,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'user.username',
      headerName: 'User',
      headerClassName: 'super-app-theme--header',
      width: 280,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.user.img} alt="" />
            <Typography>{params.row.user.username}</Typography>
          </Stack>
        );
      },
    },
    {
      field: 'orderStatus',
      headerClassName: 'super-app-theme--header',
      headerName: 'Status',
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Typography
              sx={{
                color:
                  params.row.orderStatus === 'pending'
                    ? 'blue'
                    : params.row.orderStatus === 'cancelled'
                    ? 'red'
                    : 'green',
              }}
            >
              {params.row.orderStatus.toUpperCase()}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: 'paymentMethod',
      headerClassName: 'super-app-theme--header',
      headerName: 'Payment',
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'totalAmount',
      headerClassName: 'super-app-theme--header',
      headerName: 'Amount',
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
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
          loading={!orders.length}
          rows={orders}
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
