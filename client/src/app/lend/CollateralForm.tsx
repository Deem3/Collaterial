import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Sheet, Table } from '@mui/joy';
import { FunctionComponent } from 'react';

type CollateralFormProps = {
  close: () => void;
};

const CollateralForm: FunctionComponent<CollateralFormProps> = ({ close }) => {
  return (
    <>
      <Button
        sx={{
          borderRadius: '5px',
          maxWidth: '90%',
          width: 'fit-content',
          padding: '10px',
          marginY: '20px',
        }}
        startDecorator={<AddOutlined />}
        color="neutral"
      >
        Барьцаа хөрөнгө бүртгэх
      </Button>
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
          <tbody></tbody>
        </Table>
      </Sheet>
      <Box marginTop={2} display="flex" justifyContent="flex-end" columnGap={2}>
        <Button type="submit" color="neutral">
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
