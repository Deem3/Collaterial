import { Box, Button, Modal, ModalClose, ModalDialog, Sheet, Typography } from '@mui/joy';
import { FunctionComponent } from 'react';

type DeleteModalProps = {
  open: boolean;
  close: () => void;
  id: number;
  type: 'customer' | 'loan' | 'collateral' | 'asset' | 'subAsset';
  deleteFn: () => void;
};

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ close, deleteFn, id, open, type }) => {
  const getType = (type: 'customer' | 'loan' | 'collateral' | 'asset' | 'subAsset') => {
    switch (type) {
      case 'customer':
        return 'харилцагч';
      case 'loan':
        return 'зээл';
      case 'collateral':
        return 'Барьцаа хөрөнгө';
      case 'asset':
        return 'хөрөнгө';
      case 'subAsset':
        return 'дэд хөрөнгө';
      default:
        return 'мэдээллийг';
    }
  };

  return (
    <Modal open={open} style={{ zIndex: 5 }}>
      <ModalDialog>
        <Sheet sx={{ minHeight: '50%', maxHeight: '80%', overflow: 'auto' }}>
          <Typography fontWeight="bold" marginY="16px" marginLeft={2}>
            Анхааруулга
          </Typography>
          <ModalClose onClick={() => close()} />
          <Typography marginY="16px" marginLeft={2}>
            Та <strong>{id}</strong> дугаартай <strong>{getType(type)}</strong> устгахдаа итгэлтэй
            байна уу?
          </Typography>
        </Sheet>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="flex-end"
          width="100%"
          columnGap={2}
        >
          <Button onClick={() => close()} color="danger">
            No
          </Button>
          <Button onClick={() => deleteFn()} color="neutral">
            Yes
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
