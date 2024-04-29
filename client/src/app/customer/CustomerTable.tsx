import { MoreVertOutlined } from '@mui/icons-material';
import { IconButton, Table, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const CustomerTable = () => {
  const { data, isFetched } = useQuery({
    queryKey: ['getCustomers'],
    queryFn: async () => {
      const { data } = await axios.get('/api/customer/customers');
      return data;
    },
  });

  return (
    <>
      <Typography>Харилцагч</Typography>
      <Table
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
                  <IconButton>
                    <MoreVertOutlined />
                  </IconButton>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CustomerTable;
