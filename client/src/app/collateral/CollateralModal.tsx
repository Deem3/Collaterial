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
import CollateralRegistrationFrom from './CollateralRegistrationFrom';
import { EditType } from './helper';
import SoldCollateralForm from './SoldCollateralForm';

type CollateralModalProps = {
  open: boolean;
  id: number;
  edit: EditType | undefined;
  close: () => void;
  resetEdit: () => void;
};

const CollateralModal: FunctionComponent<CollateralModalProps> = ({
  open,
  id,
  edit,
  close,
  resetEdit,
}) => {
  return (
    <Modal open={open}>
      <ModalDialog sx={{ minHeight: '50%' }} minWidth="40%">
        <Sheet sx={{ minHeight: '50%', maxHeight: '80%', overflow: 'auto' }}>
          <ModalClose
            onClick={() => {
              close();
              resetEdit();
            }}
          />
          <Typography>Барьцаа хөрөнгө</Typography>
          <Tabs defaultValue={0}>
            <TabList disableUnderline>
              <Tab disableIndicator>Үндсэн</Tab>
              <Tab disableIndicator>Борлуулалт</Tab>
            </TabList>
            <TabPanel value={0}>
              <CollateralRegistrationFrom close={close} id={id} edit={edit} resetEdit={resetEdit} />
            </TabPanel>
            <TabPanel value={1}>
              <SoldCollateralForm close={close} />
            </TabPanel>
          </Tabs>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default CollateralModal;
