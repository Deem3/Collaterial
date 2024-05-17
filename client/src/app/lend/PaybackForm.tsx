import Input from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Sheet, Table, Tooltip, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formatDate, PaymentType } from './helper';

type PaybackFormProps = {
  close: () => void;
  edit: PaymentType | undefined;
};

const PaybackForm: FunctionComponent<PaybackFormProps> = ({ close, edit }) => {
  const queryClient = useQueryClient();
  const formSchema = z.object({
    id: z.string(),
    accountNumber: z.coerce.number(),
    repaymentInfo: z.array(
      z
        .object({
          paymentPeriod: z.coerce.date(),
          principalRepayment: z.coerce.number(),
          paymentInterest: z.coerce.number(),
          loanBalance: z.coerce.number(),
        })
        .refine((data) => data.principalRepayment <= data.loanBalance, {
          message: 'Үндсэн зээлийн төлөлт зээлийн үлдэгдлээс их байж болохгүй!',
          path: ['principalRepayment'],
        }),
    ),
  });

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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
              <th>
                <Tooltip placement="top" title="Төлбөр хийх хугацаа">
                  <Typography>Төлбөр хийх хугацаа</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Үндсэн зээлийн төлөлт">
                  <Typography>Үндсэн зээлийн төлөлт</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Хүүгийн төлөлт">
                  <Typography>Хүүгийн төлөлт</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Нийт төлбөр">
                  <Typography>Нийт төлбөр</Typography>
                </Tooltip>
              </th>
              <th>
                <Tooltip placement="top" title="Зээлийн үлдэгдэл">
                  <Typography>Зээлийн үлдэгдэл</Typography>
                </Tooltip>
              </th>
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
                      render={({ field }) => (
                        <>
                          <Input style={{ width: '100%' }} type="number" {...field} />
                        </>
                      )}
                    />
                  </td>
                  <td>
                    <Controller
                      control={control}
                      name={`repaymentInfo[${index}].paymentInterest`}
                      render={({ field }) => (
                        <>
                          <Input style={{ width: '100%' }} type="number" {...field} />
                        </>
                      )}
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
                      render={({ field }) => (
                        <>
                          <Input
                            disabled
                            style={{
                              width: '100%',
                            }}
                            {...field}
                            type="number"
                          />
                        </>
                      )}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Typography color="danger">
          {errors.repaymentInfo &&
            errors.repaymentInfo?.map((repayment) => repayment?.principalRepayment?.message)}
        </Typography>
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
