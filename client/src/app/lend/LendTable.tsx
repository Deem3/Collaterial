import DeleteModal from '@/components/DeleteModal';
import { MoreVertOutlined } from '@mui/icons-material';
import { Dropdown, Menu, MenuButton, MenuItem, Sheet, Table, Typography } from '@mui/joy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useState } from 'react';
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
  setSelectedId: (id: number) => void;
  setSelectedOwnerId: (id: Uint8Array) => void;
  setOpen: () => void;
};

const LendTable: FunctionComponent<LendTableProps> = ({
  data,
  setSelectedId,
  setOpen,
  setSelectedOwnerId,
}) => {
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState<number | null>();
  const { data: customers } = useQuery({
    queryKey: ['customerForLend'],
    queryFn: async () => {
      const { data } = await axios.get('api/customer/customersName');
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete('/api/lend', { params: { id: deleteID } });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['lendTableData'] });
      setDeleteModalOpen(false);
    },
  });

  return (
    <Sheet sx={{ height: '600px', overflow: 'auto' }} style={{ zIndex: 0 }}>
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
                <td>{customers?.find((c: { id: Uint8Array }) => c.id == d.debtorId).firstname}</td>
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
                      <MenuItem
                        onClick={() => {
                          setSelectedId(d.accountNumber);
                          setSelectedOwnerId(d.debtorId);
                          setOpen();
                        }}
                      >
                        Засах
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setDeleteID(d.accountNumber);
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
      {deleteID && (
        <DeleteModal
          deleteFn={deleteMutation.mutate}
          id={deleteID}
          type="loan"
          open={deleteModalOpen}
          close={() => setDeleteModalOpen(false)}
        />
      )}
    </Sheet>
  );
};

export default LendTable;
