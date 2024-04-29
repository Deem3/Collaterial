import { mainColors } from '@/config/colorScheme';
import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import AddAssetModal from './AddAssetModal';
import AssetTypeTable from './AssetTypeTable';
import SubAssetTypeTable from './SubAssetTypeTable';

const AssetContainer = () => {
  const [tab, setTab] = useState<{ value: number; open: boolean }>({ value: 0, open: false });

  const { data: assetType } = useQuery({
    queryKey: ['assetType'],
    queryFn: async () => {
      const { data } = await axios.get('/api/asset/assetType', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const { data: assetTypeId } = useQuery({
    queryKey: ['assetTypeId'],
    queryFn: async () => {
      const { data } = await axios.get('/api/asset/assetTypeId', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const { data: subAssetTypeId } = useQuery({
    queryKey: ['subAssetTypeId'],
    queryFn: async () => {
      const { data } = await axios.get('/api/asset/subAssetTypeId', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const { data: assetTypeData } = useQuery({
    queryKey: ['assetTypeData'],
    queryFn: async () => {
      const { data } = await axios.get('/api/asset/all/assetType', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });
  const { data: subAssetTypeData } = useQuery({
    queryKey: ['subAssetTypeData'],
    queryFn: async () => {
      const { data } = await axios.get('/api/asset/all/subAssetType', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  return (
    <Box height="100vh">
      <Box borderBottom="1px solid #776E6E" height="10%" display="flex" alignItems="center">
        <Typography
          marginLeft={10}
          fontSize={20}
          fontWeight={300}
          sx={{ color: mainColors.primary }}
        >
          Барьцаа хөрөнгө бүртгэлийн программ
        </Typography>
      </Box>
      <Box marginX={20} marginY={5} rowGap={5} display="flex" flexDirection="column">
        <Button
          sx={{
            borderRadius: '5px',
            width: '25%',
            padding: '10px',
          }}
          startDecorator={<AddOutlined />}
          color="neutral"
          onClick={() => setTab({ value: 0, open: true })}
        >
          Барьцаа хөрөнгийн төрөл нэмэх
        </Button>
        <AssetTypeTable data={assetTypeData} />
        <Button
          sx={{
            borderRadius: '5px',
            width: '25%',
            padding: '10px',
            margin: '0px',
          }}
          startDecorator={<AddOutlined />}
          color="neutral"
          onClick={() => setTab({ value: 1, open: true })}
        >
          Барьцаа хөрөнгийн дэд төрөл нэмэх
        </Button>
        <SubAssetTypeTable data={subAssetTypeData} />
      </Box>
      <AddAssetModal
        assetType={assetType}
        id={{ typeAssetId: assetTypeId + 1, subTypeAssedId: subAssetTypeId + 1 }}
        tab={tab.value}
        open={tab.open}
        close={() => setTab({ open: false, value: tab.value })}
      />
    </Box>
  );
};
export default AssetContainer;
