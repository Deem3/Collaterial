import { userAtom } from '@/store/auth';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useState } from 'react';
import AddCustomerModal from './AddCustomerModal';
import CustomerTable from './CustomerTable';
import { CustomerDataType } from './helper';

const CustomerContainer = () => {
  const [isAddCustomerModal, setAddCustomerModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [user] = useAtom(userAtom);
  const { data, isFetched } = useQuery<CustomerDataType | undefined>({
    queryKey: ['getCustomers', selectedId],
    queryFn: async () => {
      const { data } = await axios.get('/api/customer/byId', { params: { id: selectedId } });
      setEdit(data);
      return data;
    },
    enabled: !!selectedId,
  });

  const [edit, setEdit] = useState<CustomerDataType | undefined>(data);
  const close = () => {
    setAddCustomerModal(false);
    setSelectedId(null);
    setEdit(undefined);
    console.log('hello');
  };

  return (
    <div className="mt-24 px-10 gap-y-8 flex flex-col">
      <Button
        sx={{
          borderRadius: '5px',
          maxWidth: '20%',
          padding: '10px',
        }}
        startDecorator={<AddOutlined />}
        color="neutral"
        onClick={() => setAddCustomerModal(true)}
      >
        Харилцагч бүртгэх
      </Button>
      <CustomerTable setOpen={() => setAddCustomerModal(true)} setId={setSelectedId} />
      <AddCustomerModal
        edit={edit}
        userId={user?.sub.id}
        open={isAddCustomerModal}
        close={() => close()}
      />
    </div>
  );
};

export default CustomerContainer;
