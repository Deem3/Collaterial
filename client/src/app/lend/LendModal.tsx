import {
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from '@mui/joy';
import { FunctionComponent } from 'react';
import CollateralForm from './CollateralForm';
import GeneralLendForm from './GeneralLendForm';
import PaybackForm from './PaybackForm';
import { LendType, PaymentType } from './helper';

type LendModalProps = {
  open: boolean;
  close: () => void;
  customers: { firstname: string; id: string; lastname: string }[] | undefined;
  accountNumber: number;
  refetchTable: () => void;
  refetchAccount: () => void;
  editLend: LendType;
  editRepayment: PaymentType;
  selectedId: number | undefined;
  selectedOwnerId: Uint8Array | undefined;
};

const LendModal: FunctionComponent<LendModalProps> = ({
  open,
  close,
  customers,
  accountNumber,
  refetchAccount,
  refetchTable,
  editLend,
  editRepayment,
  selectedId,
  selectedOwnerId,
}) => {
  return (
    <Modal open={open} style={{ zIndex: 2 }}>
      <ModalDialog sx={{ minHeight: '60%' }} minWidth="50%">
        <Sheet sx={{ minHeight: '50%', maxHeight: '80%', overflow: 'auto' }}>
          <ModalClose onClick={() => close()} />
          <Typography fontWeight="bold" marginY="16px" marginLeft={2}>
            Зээлийн данс
          </Typography>
          <Tabs defaultValue={0}>
            <TabList disableUnderline>
              <Tab disableIndicator>Үндсэн</Tab>
              <Tab disableIndicator>Эргэн төлөлт</Tab>
              <Tab disableIndicator>Барьцаа</Tab>
            </TabList>
            <TabPanel value={0}>
              <GeneralLendForm
                refetchAccount={refetchAccount}
                refetchTable={refetchTable}
                accountNumber={accountNumber}
                customers={customers}
                close={close}
                edit={editLend}
              />
            </TabPanel>
            <TabPanel value={1}>
              <PaybackForm close={close} edit={editRepayment} />
            </TabPanel>
            <TabPanel value={2}>
              <CollateralForm id={selectedId} ownerId={selectedOwnerId} close={close} />
            </TabPanel>
          </Tabs>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default LendModal;
