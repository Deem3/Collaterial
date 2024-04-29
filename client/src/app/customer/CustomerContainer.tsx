import { userAtom } from '@/store/auth';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/joy';
import { useAtom } from 'jotai';
import { useState } from 'react';
import AddCustomerModal from './AddCustomerModal';
import CustomerTable from './CustomerTable';

const CustomerContainer = () => {
  const [isAddCustomerModal, setAddCustomerModal] = useState(false);
  const [user] = useAtom(userAtom);
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
      <CustomerTable />
      <AddCustomerModal
        userId={user?.sub.id}
        open={isAddCustomerModal}
        close={() => setAddCustomerModal(false)}
      />
    </div>
  );
};

export default CustomerContainer;
