import { AddOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import LendModal from './LendModal';
import LendTable from './LendTable';

const LendContainer = () => {
  const [open, setOpen] = useState(false);

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data } = await axios.get('api/customer/customersName');
      return data as { firstname: string; id: string; lastname: string }[];
    },
  });

  const { data: accountNumber } = useQuery({
    queryKey: ['lendAccountNumber'],
    queryFn: async () => {
      const { data } = await axios.get('api/lend/accountNumber', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const { data: lends } = useQuery({
    queryKey: ['lends'],
    queryFn: async () => {
      const { data } = await axios.get('api/lend/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  return (
    <Box marginTop={10} paddingX={10} rowGap={8} display="flex" flexDirection="column">
      <Button
        sx={{
          borderRadius: '5px',
          width: '15%',
          padding: '10px',
        }}
        startDecorator={<AddOutlined />}
        color="neutral"
        onClick={() => setOpen(true)}
      >
        Зээл бүртгэх
      </Button>
      <LendModal
        accountNumber={accountNumber}
        open={open}
        close={() => setOpen(false)}
        customers={customers}
      />
      <LendTable data={lends} />
    </Box>
  );
};

export default LendContainer;
