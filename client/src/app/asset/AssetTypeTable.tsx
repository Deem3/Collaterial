import { MoreVertOutlined } from '@mui/icons-material';
import { IconButton, Sheet, Table } from '@mui/joy';
import { FunctionComponent } from 'react';
import { AssetTypeDataType } from './type';

type AssetTypeTableProps = {
  data?: AssetTypeDataType[];
};
const AssetTypeTable: FunctionComponent<AssetTypeTableProps> = ({ data }) => {
  return (
    <Sheet sx={{ height: '200px', overflow: 'auto' }}>
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
                  <IconButton>
                    <MoreVertOutlined />
                  </IconButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};
export default AssetTypeTable;
