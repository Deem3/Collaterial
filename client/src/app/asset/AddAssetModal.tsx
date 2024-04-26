import { Modal, ModalClose, ModalDialog, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import { FunctionComponent } from 'react';
import AddSubAssetTypeForm from './AddSubAssetTypeForm';
import AddAssetTypeForm from './AddAssetTypeForm';

type AddAssetModalProps = {
  open: boolean;
  close: () => void;
  tab: number;
  id: { typeAssetId: number; subTypeAssedId: number };
  assetType: { id: number; name: string }[];
};

const AddAssetModal: FunctionComponent<AddAssetModalProps> = ({
  open,
  close,
  tab,
  id,
  assetType,
}) => {
  return (
    <Modal open={open}>
      <ModalDialog minWidth="30%" sx={{ minHeight: '30%' }}>
        <ModalClose onClick={close} />
        <Typography>Барьцаа хөрөнгийн төрөл бүртгэх</Typography>
        <Tabs defaultValue={tab}>
          <TabList disableUnderline>
            <Tab disableIndicator>Төрөл</Tab>
            <Tab disableIndicator>Дэд төрөл</Tab>
          </TabList>
          <TabPanel value={0}>
            <AddAssetTypeForm close={close} open={open} id={id.typeAssetId} />
          </TabPanel>
          <TabPanel value={1}>
            <AddSubAssetTypeForm
              close={close}
              open={open}
              id={id.subTypeAssedId}
              assetType={assetType}
            />
          </TabPanel>
        </Tabs>
      </ModalDialog>
    </Modal>
  );
};
export default AddAssetModal;
