import Input from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Sheet, Table } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formatDate, PaymentType } from './helper';

type PaybackFormProps = {
  close: () => void;
  edit: PaymentType;
};

const PaybackForm: FunctionComponent<PaybackFormProps> = ({ close, edit }) => {
  const queryClient = useQueryClient();
  const formSchema = z.object({
    id: z.string(),
    accountNumber: z.coerce.number(),
    repaymentInfo: z.array(
      z.object({
        paymentPeriod: z.coerce.date(),
        principalRepayment: z.coerce.number(),
        paymentInterest: z.coerce.number(),
        loanBalance: z.coerce.number(),
      }),
    ),
  });

  const { control, reset, handleSubmit, watch, formState } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  console.log(formState.errors);

  const paybackMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await axios.put('api/lend/repayment', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['lendTableData'] });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    paybackMutation.mutate(data);
  };

  useEffect(() => {
    if (edit) {
      reset({
        id: edit.id,
        accountNumber: edit.accountNumber,
        repaymentInfo: edit.repaymentInfo,
      });
    }
  }, [reset, edit]);

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
            {edit &&
              edit.repaymentInfo.map((repayment, index) => (
                <tr key={index}>
                  <td>{formatDate(new Date(repayment.paymentPeriod))}</td>
                  <td>
                    <Controller
                      control={control}
                      name={`repaymentInfo[${index}].principalRepayment`}
                      render={({ field }) => <Input type="number" {...field} />}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name={`repaymentInfo[${index}].paymentInterest`}
                      render={({ field }) => <Input type="number" {...field} />}
                    />
                  </td>
                  <td>
                    {Number(watch(`repaymentInfo[${index}].paymentInterest`)) +
                      Number(watch(`repaymentInfo[${index}].principalRepayment`))}
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name={`repaymentInfo[${index}].loanBalance`}
                      render={({ field }) => <Input {...field} type="number" />}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
      <Box marginTop={2} display="flex" justifyContent="flex-end" columnGap={2}>
        <Button onClick={handleSubmit(onSubmit)} color="neutral">
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
