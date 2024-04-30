import { AddOutlined, MoreVertOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Table,
  Typography,
} from '@mui/joy';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useState } from 'react';
import { collateralStateConverter, EditType } from '../collateral/helper';

type CollateralFormProps = {
  close: () => void;
  id: number | undefined;
};

const CollateralForm: FunctionComponent<CollateralFormProps> = ({ close, id }) => {
  const { data: collaterals, isLoading } = useQuery<EditType>({
    queryKey: ['collaterals'],
    queryFn: async () => {
      const { data } = await axios.get('/api/collateral', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const {
    data: collateralById,
    isFetched,
    refetch,
  } = useQuery<EditType[]>({
    queryKey: ['collateralById', id],
    queryFn: async () => {
      const { data } = await axios.get('/api/lend/collateral', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        params: {
          id,
        },
      });
      return data;
    },
    enabled: !!id,
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const collateralMutation = useMutation({
    mutationFn: async (data: { id: number; collateralId: number }) => {
      await axios.post('/api/lend/collateral', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },
    onSettled: () => {
      refetch();
    },
  });

  const { data: customers } = useQuery({
    queryKey: ['customerForLend'],
    queryFn: async () => {
      const { data } = await axios.get('api/customer/customersName');
      return data;
    },
  });

  const { data: assetTypes } = useQuery({
    queryKey: ['assetTypeForLend'],
    queryFn: async () => {
      const { data } = await axios.get('api/asset/all/assetType');
      return data;
    },
  });

  const { data: subAssetTypes } = useQuery({
    queryKey: ['subAssetTypeForLend'],
    queryFn: async () => {
      const { data } = await axios.get('api/asset/all/subAssetType');
      return data;
    },
  });

  return (
    <>
      <Autocomplete
        sx={{
          borderRadius: '5px',
          maxWidth: '90%',
          width: 'fit-content',
          marginY: '20px',
        }}
        startDecorator={<AddOutlined />}
        color="neutral"
        placeholder="Барьцаа хөрөнгө бүртгэх"
        loading={isLoading}
        options={collaterals}
        getOptionLabel={(collaterals) => collaterals.collateralName}
        getOptionKey={(collaterals) => collaterals.id}
        onChange={(_, val: EditType | null) => setSelectedId(val?.id)}
      />
      <Sheet sx={{ height: '40vh', overflow: 'auto' }}>
        <Table size="md" stickyHeader variant="outlined">
          <thead>
            <tr>
              <th>Бүртгэл №</th>
              <th>Эзэмшигч</th>
              <th>Хөрөнгийн төрөл</th>
              <th>Дэд төрөл</th>
              <th>Барьцааны нэр</th>
              <th>Төлөв</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isFetched &&
              collateralById?.map((collateral) => (
                <tr key={collateral.id}>
                  <td>{collateral.id}</td>
                  <td>{customers?.find((c) => c.id == collateral.ownerId).firstname}</td>
                  <td>{assetTypes?.find((a) => a.id == collateral.assetTypeId).name}</td>
                  <td>
                    {subAssetTypes &&
                      subAssetTypes.find((s) => s.id == collateral.subAssetTypeId).name}
                  </td>
                  <td>{collateral.collateralName}</td>
                  <td>{collateralStateConverter(collateral.state)}</td>
                  <td>
                    <Typography>Дэлгэрэнгүй</Typography>
                  </td>
                  <td>
                    <Dropdown>
                      <MenuButton>
                        <MoreVertOutlined />
                      </MenuButton>
                      <Menu>
                        <MenuItem>Засах</MenuItem>
                        <MenuItem>Устгах</MenuItem>
                      </Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
      <Box marginTop={2} display="flex" justifyContent="flex-end" columnGap={2}>
        <Button
          onClick={() => {
            if (id) collateralMutation.mutate({ id, collateralId: selectedId! });
          }}
          color="neutral"
        >
          Хадгалах
        </Button>
        <Button
          onClick={() => {
            close();
          }}
          color="neutral"
        >
          Буцах
        </Button>
      </Box>
    </>
  );
};

export default CollateralForm;
