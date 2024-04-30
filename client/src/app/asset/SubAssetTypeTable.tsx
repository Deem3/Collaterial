import { MoreVertOutlined } from '@mui/icons-material';
import { IconButton, Sheet, Table } from '@mui/joy';
import { FunctionComponent } from 'react';
import { SubAssetTypeDataType } from './type';

type SubAssetTypeTableProps = {
  data?: SubAssetTypeDataType[];
};

const SubAssetTypeTable: FunctionComponent<SubAssetTypeTableProps> = ({ data }) => {
  return (
    <Sheet sx={{ height: '200px', overflow: 'auto' }}>
      <Table size="md" stickyHeader variant="outlined">
        <thead>
          <tr>
            <th>Дугаар</th>
            <th>Дэд төрөл</th>
            <th>Хөрөнгийн төрөл</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((subAssetType) => (
              <tr key={subAssetType.id}>
                <td>{subAssetType.id}</td>
                <td>{subAssetType.name}</td>
                <td>{subAssetType.assetType.name}</td>
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
export default SubAssetTypeTable;
