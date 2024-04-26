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
import GeneralLendForm from './GeneralLendForm';

type LendModalProps = {
  open: boolean;
  close: () => void;
  customers: { firstname: string; id: string; lastname: string }[] | undefined;
  accountNumber: number;
};

const LendModal: FunctionComponent<LendModalProps> = ({
  open,
  close,
  customers,
  accountNumber,
}) => {
  return (
    <Modal open={open}>
      <ModalDialog sx={{ minHeight: '50%' }} minWidth="40%">
        <Sheet sx={{ minHeight: '50%', maxHeight: '80%', overflow: 'auto' }}>
          <ModalClose
            onClick={() => {
              close();
            }}
          />
          <Typography>Барьцаа хөрөнгө</Typography>
          <Tabs defaultValue={0}>
            <TabList disableUnderline>
              <Tab disableIndicator>Үндсэн</Tab>
              <Tab disableIndicator>Эргэн төлөлт</Tab>
              <Tab disableIndicator>Барьцаа</Tab>
            </TabList>
            <TabPanel value={0}>
              <GeneralLendForm accountNumber={accountNumber} customers={customers} close={close} />
            </TabPanel>
            <TabPanel value={1}></TabPanel>
            <TabPanel value={2}></TabPanel>
          </Tabs>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default LendModal;
