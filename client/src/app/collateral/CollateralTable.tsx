import { MoreVertOutlined } from '@mui/icons-material';
import { Dropdown, Menu, MenuButton, MenuItem, Sheet, Table, Typography } from '@mui/joy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { collateralStateConverter } from './helper';

type CollateralTableProps = {
  setId: (id: number) => void;
  setOpen: () => void;
};

const CollateralTable: FunctionComponent<CollateralTableProps> = ({ setId, setOpen }) => {
  const queryClient = useQueryClient();
  const { data: collateralData } = useQuery({
    queryKey: ['collateralsTableData'],
    queryFn: async () => {
      const { data } = await axios.get('api/collateral/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
      return data;
    },
  });

  const { data: customers } = useQuery({
    queryKey: ['customerForCollateral'],
    queryFn: async () => {
      const { data } = await axios.get('api/customer/customersName');
      return data;
    },
  });

  const { data: assetTypes } = useQuery({
    queryKey: ['assetTypeForCollateral'],
    queryFn: async () => {
      const { data } = await axios.get('api/asset/all/assetType');
      return data;
    },
  });

  const { data: subAssetTypes } = useQuery({
    queryKey: ['subAssetTypeForCollateral'],
    queryFn: async () => {
      const { data } = await axios.get('api/asset/all/subAssetType');
      return data;
    },
  });

  const deleteCollateral = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete('api/collateral/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        params: {
          id,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collateralsTableData'] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['collateralsTableData'] });
    },
  });

  return (
    <Sheet sx={{ height: '600px', overflow: 'auto' }}>
      <Table size="md" stickyHeader variant="outlined">
        <thead>
          <tr>
            <th>Бүртгэл</th>
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
          {collateralData &&
            collateralData.map((collateral) => (
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
                      <MenuItem
                        onClick={() => {
                          setId(collateral.id);
                          setOpen();
                        }}
                      >
                        Засах
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          deleteCollateral.mutate(collateral.id);
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
  );
};

export default CollateralTable;
