import DeleteModal from '@/components/DeleteModal';
import { MoreVertOutlined } from '@mui/icons-material';
import { Dropdown, Menu, MenuButton, MenuItem, Sheet, Table } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useState } from 'react';
import { AssetTypeDataType } from './type';

type AssetTypeTableProps = {
  data?: AssetTypeDataType[];
};
const AssetTypeTable: FunctionComponent<AssetTypeTableProps> = ({ data }) => {
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState<number | null>();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete('/api/asset', {
        params: { id: deleteID },
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access-token') },
      });
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['assetTypeData'] });
      setDeleteModalOpen(false);
    },
  });

  return (
    <>
      <Sheet sx={{ height: '200px', overflow: 'auto', zIndex: 0 }}>
        <Table size="md" stickyHeader variant="outlined">
          <thead>
            <tr>
              <th>Дугаар</th>
              <th>Хөрөнгийн төрөл</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((assetType) => (
                <tr key={assetType.id}>
                  <td>{assetType.id}</td>
                  <td>{assetType.name}</td>
                  <td>
                    <Dropdown>
                      <MenuButton>
                        <MoreVertOutlined />
                      </MenuButton>
                      <Menu>
                        <MenuItem>Засах</MenuItem>
                        <MenuItem
                          onClick={() => {
                            setDeleteID(assetType.id);
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
      </Sheet>
      {deleteID && (
        <DeleteModal
          close={() => setDeleteModalOpen(false)}
          deleteFn={() => deleteMutation.mutate()}
          id={deleteID}
          open={deleteModalOpen}
          type="asset"
        />
      )}
    </>
  );
};
export default AssetTypeTable;
