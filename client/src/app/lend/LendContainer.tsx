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

  const { data: accountNumber, refetch: refetchAccount } = useQuery({
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

  const { data: lends, refetch: refetchTable } = useQuery({
    queryKey: ['lendTableData'],
    queryFn: async () => {
      const { data } = await axios.get('api/lend/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const [selectedId, setSelectedId] = useState<number>();
  const [selectedOwnerId, setSelectedOwnerId] = useState<Uint8Array>();

  const { data: lendById } = useQuery({
    queryKey: ['lendId', selectedId],
    queryFn: async () => {
      const { data } = await axios.get('api/lend/byId', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        params: {
          id: selectedId,
        },
      });
      setEditLend(data);
      return data;
    },
    enabled: !!selectedId,
  });

  const { data: repaymentById } = useQuery({
    queryKey: ['repaymentById', selectedId],
    queryFn: async () => {
      const { data } = await axios.get('api/lend/repayment', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        params: {
          id: selectedId,
        },
      });
      setEditRepayment(data);
      return data;
    },
    enabled: !!selectedId,
  });
  const [editLend, setEditLend] = useState(lendById);
  const [editRepayment, setEditRepayment] = useState(repaymentById);

  const close = () => {
    setOpen(false);
    setSelectedId(undefined);
    setSelectedOwnerId(undefined);
    setEditLend(undefined);
    setEditRepayment(undefined);
  };

  return (
    <Box marginTop={10} paddingX={10} rowGap={8} display="flex" flexDirection="column">
      <Button
        sx={{
          borderRadius: '5px',
          maxWidth: '20%',
          padding: '10px',
        }}
        startDecorator={<AddOutlined />}
        color="neutral"
        onClick={() => setOpen(true)}
      >
        Зээл бүртгэх
      </Button>
      <LendModal
        editLend={editLend}
        editRepayment={editRepayment}
        refetchAccount={refetchAccount}
        refetchTable={refetchTable}
        accountNumber={accountNumber}
        open={open}
        close={() => close()}
        customers={customers}
        selectedId={selectedId}
        selectedOwnerId={selectedOwnerId}
      />
      <LendTable
        setOpen={() => setOpen(true)}
        setSelectedOwnerId={setSelectedOwnerId}
        setSelectedId={setSelectedId}
        data={lends}
      />
    </Box>
  );
};

export default LendContainer;
