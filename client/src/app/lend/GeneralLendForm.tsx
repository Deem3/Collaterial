import Input from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PercentOutlined } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { LendType } from './helper';

type GeneralLendFormProps = {
  customers: { firstname: string; id: string; lastname: string }[] | undefined;
  accountNumber: number;
  close: () => void;
  refetchTable: () => void;
  refetchAccount: () => void;
  edit: LendType;
};

const GeneralLendForm: FunctionComponent<GeneralLendFormProps> = ({
  customers,
  accountNumber,
  close,
  refetchAccount,
  refetchTable,
  edit,
}) => {
  const queryClient = useQueryClient();
  const formSchema = z.object({
    accountNumber: z.coerce.number(),
    debtorId: z.string(),
    interestRate: z.coerce.number(),
    loanAmount: z.coerce.number(),
    termOfLoan: z.coerce.number(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  });

  const { control, setValue, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: accountNumber,
      debtorId: '',
      interestRate: 3,
      loanAmount: 1,
      termOfLoan: 3,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  useEffect(() => {
    if (edit) {
      reset({
        debtorId: edit.debtorId,
        interestRate: edit.interestRate,
        loanAmount: edit.loanAmount,
        accountNumber: edit.accountNumber,
        termOfLoan: edit.termOfLoan,
        startDate: new Date(edit.startDate),
        endDate: new Date(edit.endDate),
      });
    }
  }, [edit, reset]);

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await axios.post('/api/lend/', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['lendId', 'lendTableData'] });
      refetchAccount();
      refetchTable();
      close();
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        display="grid"
        gridTemplateColumns="1fr"
        columnGap={5}
        gridTemplateRows="repeat(7, 1fr)"
        rowGap={2}
      >
        <Controller
          control={control}
          name="accountNumber"
          render={({ field }) => (
            <div className="grid grid-cols-[0.2fr_0.8fr]">
              <Typography>Дансны дугаар : </Typography>
              <Input disabled {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="debtorId"
          render={({ field }) => (
            <div className={'grid grid-cols-[0.2fr_0.4fr_0.4fr] gap-2'}>
              <Typography>Зээлдэгч : </Typography>
              <Input sx={{ width: '100%' }} {...field} disabled />
              {customers && (
                <Autocomplete
                  onChange={(_, val: { firstname: string; lastname: string; id: string } | null) =>
                    setValue('debtorId', val ? val.id : '')
                  }
                  sx={{
                    width: '100%',
                  }}
                  defaultValue={
                    edit && customers ? customers.find((c) => c.id === edit.debtorId) : null
                  }
                  options={customers}
                  getOptionLabel={(customer) => customer.firstname}
                  getOptionKey={(customer) => customer.id}
                />
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="interestRate"
          render={({ field }) => (
            <div className="grid grid-cols-[0.2fr_0.8fr]">
              <Typography>Зээлийн хүү : </Typography>
              <Input {...field} type="number" endDecorator={<PercentOutlined />} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="loanAmount"
          render={({ field }) => (
            <div className="grid grid-cols-[0.2fr_0.8fr]">
              <Typography>Зээлийн хэмжээ : </Typography>
              <Input {...field} type="number" />
            </div>
          )}
        />
        <Controller
          control={control}
          name="termOfLoan"
          render={({ field }) => (
            <div className="grid grid-cols-[0.2fr_0.8fr]">
              <Typography>Зээлийн хугацаа : </Typography>
              <Input {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <div className="grid grid-cols-[0.2fr_0.8fr]">
              <Typography>Эхлэх хугацаа : </Typography>
              <Input
                {...field}
                type="date"
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split('T')[0]
                    : field.value
                }
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <div className="grid grid-cols-[0.2fr_0.8fr]">
              <Typography>Дуусах хугацаа : </Typography>
              <Input
                {...field}
                type="date"
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split('T')[0]
                    : field.value
                }
              />
            </div>
          )}
        />
      </Grid>
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
    </form>
  );
};

export default GeneralLendForm;
