import { AddOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import CollateralModal from './CollateralModal';
import CollateralTable from './CollateralTable';

const CollateralContainer = () => {
  const [open, setOpen] = useState(false);
  const { data: collateralId } = useQuery({
    queryKey: ['collateralId'],
    queryFn: async () => {
      const { data } = await axios.get('api/collateral/collateralId', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const [selectedCollateral, setSelectedCollateral] = useState<number | undefined>();

  const { data: editCollateralData, isFetched } = useQuery({
    queryKey: ['editCollateral', selectedCollateral],
    queryFn: async () => {
      const { data } = await axios.get(`api/collateral`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        params: {
          id: selectedCollateral,
        },
      });
      return data;
    },
    enabled: selectedCollateral !== undefined,
  });

  return (
    <Box marginTop={10} paddingX={10} rowGap={8} display="flex" flexDirection="column">
      <Button
        sx={{
          borderRadius: '5px',
          width: '15%',
          padding: '10px',
        }}
        startDecorator={<AddOutlined />}
        color="neutral"
        onClick={() => setOpen(true)}
      >
        Барьцаа хөрөнгө бүртгэх
      </Button>
      <CollateralModal
        id={collateralId}
        open={open}
        edit={isFetched ? editCollateralData[0] : undefined}
        close={() => setOpen(false)}
        resetEdit={() => setSelectedCollateral(undefined)}
      />
      <CollateralTable setId={setSelectedCollateral} setOpen={() => setOpen(true)} />
    </Box>
  );
};
export default CollateralContainer;
