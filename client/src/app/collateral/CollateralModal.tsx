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
import { EditSalesType, EditType } from './helper';
import ReleaseCollateralForm from './ReleaseCollateralForm';
import SoldCollateralForm from './SoldCollateralForm';

type CollateralModalProps = {
  id: number;
  open: boolean;
  edit: EditType | undefined;
  close: () => void;
  resetEdit: () => void;
  editSales: EditSalesType | undefined;
};

const CollateralModal: FunctionComponent<CollateralModalProps> = ({
  open,
  id,
  edit,
  close,
  resetEdit,
  editSales,
}) => {
  return (
    <Modal open={open}>
      <ModalDialog sx={{ minHeight: '50%', paddingX: 0 }} minWidth="40%" layout="center">
        <Sheet sx={{ minHeight: '50%', maxHeight: '80%', overflow: 'auto' }}>
          <ModalClose
            onClick={() => {
              close();
              resetEdit();
            }}
          />
          <Typography fontWeight="bold" marginY="16px" marginLeft={2}>
            Барьцаа хөрөнгө
          </Typography>
          <Tabs defaultValue={0}>
            <TabList disableUnderline className="border-y-[1px] border-[#505156]">
              <Tab disableIndicator>Үндсэн</Tab>
              <Tab disableIndicator disabled={!edit}>
                Чөлөөлөх
              </Tab>
              <Tab disableIndicator disabled={!edit}>
                Борлуулалт
              </Tab>
            </TabList>
            <TabPanel value={0} className="px-[3%]">
              <CollateralRegistrationFrom close={close} id={id} edit={edit} resetEdit={resetEdit} />
            </TabPanel>
            {edit && (
              <TabPanel value={1} className="px-[3%]">
                <ReleaseCollateralForm
                  close={close}
                  edit={{ collateralId: edit.id, description: edit.description, state: edit.state }}
                  resetEdit={resetEdit}
                />
              </TabPanel>
            )}
            {edit && (
              <TabPanel value={2} className="px-[3%]">
                <SoldCollateralForm
                  edit={{ ...editSales, description: edit.description }}
                  resetEdit={resetEdit}
                  close={close}
                  id={edit.id}
                />
              </TabPanel>
            )}
          </Tabs>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default CollateralModal;
