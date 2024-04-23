import { Button } from '@mui/joy';
import CustomerTable from './CustomerTable';
import { AddOutlined } from '@mui/icons-material';
import AddCustomerModal from './AddCustomerModal';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/auth';

const CustomerContainer = () => {
  const [isAddCustomerModal, setAddCustomerModal] = useState(false);
  const [user] = useAtom(userAtom);
  return (
    <div className="mt-24 px-10 gap-y-8 flex flex-col">
      <Button
        sx={{
          borderRadius: '5px',
          width: '15%',
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
