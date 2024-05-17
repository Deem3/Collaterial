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
  Tooltip,
  Typography,
} from '@mui/joy';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useState } from 'react';
import { collateralStateConverter, EditType } from '../collateral/helper';

type CollateralFormProps = {
  close: () => void;
  id: number | undefined;
  ownerId: Uint8Array | undefined;
};

const CollateralForm: FunctionComponent<CollateralFormProps> = ({ close, id, ownerId }) => {
  const {
    data: collateralsByOwnerId,
    isLoading,
    refetch: collateralsByOwnerRefetch,
  } = useQuery<EditType>({
    queryKey: ['collateralsByOwner', ownerId],
    queryFn: async () => {
      const { data } = await axios.get('/api/collateral/byOwner', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        params: {
          ownerId,
        },
      });
      return data;
    },
    enabled: !!ownerId,
  });

  const {
    data: collateralById,
    isFetched,
    refetch,
  } = useQuery<EditType[]>({
    queryKey: ['collateralById', id],
    queryFn: async () => {
      if (id === undefined) return [];
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
      collateralsByOwnerRefetch();
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

  // delete modal
  const deleteMutation = useMutation({
    mutationFn: async (collateralId: number) => {
      await axios.delete('/api/lend/collateral', {
        params: { collateralId: collateralId, lendId: id },
      });
    },
    onSettled: async () => {
      refetch();
      collateralsByOwnerRefetch();
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
        // disabled={!id}
        startDecorator={<AddOutlined />}
        color="neutral"
        placeholder="Барьцаа хөрөнгө бүртгэх"
        loading={isLoading}
        options={collateralsByOwnerId}
        getOptionLabel={(collaterals) => collaterals.collateralName}
        getOptionKey={(collaterals) => collaterals.id}
        onChange={(_, val: EditType | null) => setSelectedId(val?.id)}
      />
      <Sheet sx={{ height: '40vh', overflow: 'auto' }}>
        <Table size="md" stickyHeader variant="outlined">
          <thead>
            <tr>
              <th>
                <Tooltip placement="top" title="Бүртгэл №">
                  <Typography>Бүртгэл №</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Эзэмшигч">
                  <Typography>Эзэмшигч</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Хөрөнгийн төрөл">
                  <Typography>Хөрөнгийн төрөл</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Дэд төрөл">
                  <Typography>Дэд төрөл</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Барьцааны нэр">
                  <Typography>Барьцааны нэр</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Төлөв">
                  <Typography>Төлөв</Typography>
                </Tooltip>
              </th>
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
                      <Menu
                        style={{
                          zIndex: 3,
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            deleteMutation.mutate(collateral.id);
                          }}
                        >
                          Устгах
                        </MenuItem>
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
