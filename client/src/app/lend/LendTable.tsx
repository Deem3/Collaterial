import { MoreVertOutlined } from '@mui/icons-material';
import { Dropdown, Menu, MenuButton, MenuItem, Sheet, Table, Typography } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { formatDate } from './helper';

type LendTableProps = {
  data: {
    accountNumber: number;
    debtorId: BigInteger;
    interestRate: number;
    loanAmount: number;
    termOfLoan: number;
    startDate: Date;
    endDate: Date;
  }[];
};

const LendTable: FunctionComponent<LendTableProps> = ({ data }) => {
  const { data: customers } = useQuery({
    queryKey: ['customerForLend'],
    queryFn: async () => {
      const { data } = await axios.get('api/customer/customersName');
      return data;
    },
  });
  return (
    <Sheet sx={{ height: '600px', overflow: 'auto' }}>
      <Table size="md" stickyHeader variant="outlined">
        <thead>
          <tr>
            <th>Зээл №</th>
            <th>Данс</th>
            <th>Зээлдэгч</th>
            <th>Зээлийн хэмжээ</th>
            <th>Эхлэх огноо</th>
            <th>Дуусах огноо</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((d) => (
              <tr key={d.accountNumber}>
                <td>{d.accountNumber}</td>
                <td>{d.accountNumber}</td>
                <td>{customers?.find((c) => c.id == d.debtorId).firstname}</td>
                <td>{d.loanAmount}</td>
                <td>{formatDate(new Date(d.startDate))}</td>
                <td>{formatDate(new Date(d.endDate))}</td>
                <td>
                  <Typography>Дэлгэрэнгүй</Typography>
                </td>
                <td>
                  <Dropdown>
                    <MenuButton>
                      <MoreVertOutlined />
                    </MenuButton>
                    <Menu>
                      <MenuItem>edit</MenuItem>
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

export default LendTable;
