import { Box, Button, Sheet, Table } from '@mui/joy';
import { FunctionComponent } from 'react';

type PaybackFormProps = {
  close: () => void;
};

const PaybackForm: FunctionComponent<PaybackFormProps> = ({ close }) => {
  return (
    <>
      <Sheet sx={{ height: '40vh', overflow: 'auto' }}>
        <Table size="md" stickyHeader variant="outlined">
          <thead>
            <tr>
              <th>Төлбөр хийх хугацаа</th>
              <th>Үндсэн зээлийн төлөлт</th>
              <th>Хүүгийн төлөлт</th>
              <th>Нийт төлбөр</th>
              <th>Зээлийн үлдэгдэл</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
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

export default PaybackForm;
