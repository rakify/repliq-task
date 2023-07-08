import { forwardRef, useEffect, useId, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getUsers } from '@/context/apiCalls';
import { IUser } from '@/interfaces/user.interface';
import QuickSearchToolbar from '@/utils/quick-search-toolbar';
import Link from 'next/link';

export default function UserList() {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  function getFullName(params: GridValueGetterParams) {
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
  }

  function getAccountType(params: GridValueGetterParams) {
    return `${
      params.row.accountType === 0
        ? 'Buyer'
        : params.row.accountType === 1
        ? 'Seller'
        : params.row.accountType === 2
        ? 'Waiting'
        : 'Admin'
    }`;
  }

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
      headerName: 'User ID',
      width: 250,
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'username',
      headerName: 'User',
      headerClassName: 'super-app-theme--header',
      width: 300,
      editable: false,
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <Avatar src={params.row.img} alt="" />
            <Typography>{params.row.username}</Typography>
          </Stack>
        );
      },
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      headerClassName: 'super-app-theme--header',
      width: 300,
      editable: false,
      headerAlign: 'center',
      valueGetter: getFullName,
    },
    {
      field: 'accountType',
      headerName: 'Account Type',
      headerClassName: 'super-app-theme--header',
      editable: false,
      headerAlign: 'center',
      valueGetter: getAccountType,
      width: 200,
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
        <Link className="underline" href="/auth/signUp">
          Add Customer
        </Link>
        <DataGrid
          loading={!users.length}
          rows={users}
          columns={columns}
          getRowId={(row: IUser) => row._id}
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
