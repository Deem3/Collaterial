import DeleteModal from '@/components/DeleteModal';
import { MoreVertOutlined } from '@mui/icons-material';
import { Dropdown, Menu, MenuButton, MenuItem, Table, Typography } from '@mui/joy';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useState } from 'react';

type CustomerTableProps = {
  setId: (id: number) => void;
  setOpen: () => void;
};

const CustomerTable: FunctionComponent<CustomerTableProps> = ({ setId, setOpen }) => {
  const { data, isFetched, refetch } = useQuery({
    queryKey: ['getCustomers'],
    queryFn: async () => {
      const { data } = await axios.get('/api/customer/customers');
      return data;
    },
  });
  const [deleteId, setDeleteId] = useState<number | null>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete('/api/customer', { params: { id: deleteId } });
    },
    onSettled: () => {
      refetch();
      setDeleteId(null);
      setDeleteOpen(false);
    },
  });
  return (
    <>
      <Typography>Харилцагч</Typography>
      <Table
        style={{ zIndex: 0 }}
        borderAxis="xBetween"
        size="md"
        stickyHeader
        variant="plain"
        sx={{ borderRadius: '10px' }}
      >
        <thead>
          <tr>
            <th>Харилцагч №</th>
            <th>Овог</th>
            <th>Нэр</th>
            <th>Регистр</th>
            <th>Утасны дугаар</th>
            <th>И-мэйл</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isFetched &&
            data.map((customer) => (
              <tr key={customer.id}>
                <th>{customer.id}</th>
                <th>{customer.lastname}</th>
                <th>{customer.firstname}</th>
                <th>{customer.register}</th>
                <th>{customer.phone.first}</th>
                <th>{customer.email}</th>
                <th>Дэлгэрэнгүй</th>
                <th>
                  <Dropdown>
                    <MenuButton>
                      <MoreVertOutlined />
                    </MenuButton>
                    <Menu>
                      <MenuItem
                        onClick={() => {
                          setId(customer.id);
                          setOpen();
                        }}
                      >
                        Засах
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setDeleteId(customer.id);
                          setDeleteOpen(true);
                        }}
                      >
                        Устгах
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
      {deleteId && (
        <DeleteModal
          close={() => setDeleteOpen(false)}
          deleteFn={() => deleteMutation.mutate()}
          id={deleteId}
          open={deleteOpen}
          type="customer"
        />
      )}
    </>
  );
};

export default CustomerTable;
