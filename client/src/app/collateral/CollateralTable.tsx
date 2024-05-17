import DeleteModal from '@/components/DeleteModal';
import { refetchAtom } from '@/store/refetch';
import { MoreVertOutlined } from '@mui/icons-material';
import { Dropdown, Menu, MenuButton, MenuItem, Sheet, Table, Typography } from '@mui/joy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { FunctionComponent, useEffect, useState } from 'react';
import { collateralStateConverter } from './helper';

type CollateralTableProps = {
  setId: (id: number) => void;
  setOpen: () => void;
};

const CollateralTable: FunctionComponent<CollateralTableProps> = ({ setId, setOpen }) => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const { data: collateralData, refetch: refetchColTable } = useQuery({
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
  const [_, setRefetchDatas] = useAtom(refetchAtom);

  useEffect(() => {
    if (collateralData) {
      setRefetchDatas({ refetchColTable });
    }
  }, [collateralData, setRefetchDatas]);
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
    mutationFn: async () => {
      await axios.delete('api/collateral/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        params: {
          id: deleteId,
        },
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['collateralsTableData'] });
      setDeleteModalOpen(false);
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
                          setDeleteId(collateral.id);
                          setDeleteModalOpen(true);
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
      {deleteId && (
        <DeleteModal
          deleteFn={() => deleteCollateral.mutate()}
          close={() => setDeleteModalOpen(false)}
          id={deleteId}
          open={deleteModalOpen}
          type="collateral"
        />
      )}
    </Sheet>
  );
};

export default CollateralTable;
