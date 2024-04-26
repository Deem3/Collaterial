import { zodResolver } from '@hookform/resolvers/zod';
import { PercentOutlined } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid, Input, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type GeneralLendFormProps = {
  customers: { firstname: string; id: string; lastname: string }[] | undefined;
  accountNumber: number;
  close: () => void;
};

const GeneralLendForm: FunctionComponent<GeneralLendFormProps> = ({
  customers,
  accountNumber,
  close,
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

  const { control, setValue, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: accountNumber + 1,
      debtorId: '',
      interestRate: 3,
      loanAmount: 1,
      termOfLoan: 3,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      axios.post('/api/lend/', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lendId'] });
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
            <div className="flex justify-between items-center">
              <Typography>Дансны дугаар : </Typography>
              <Input disabled {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="debtorId"
          render={({ field }) => (
            <div className={'flex justify-between items-center'}>
              <Typography>Зээлдэгч : </Typography>
              <Input {...field} disabled />
              {customers && (
                <Autocomplete
                  onChange={(_, val: { firstname: string; lastname: string; id: string } | null) =>
                    setValue('debtorId', val ? val.id : '')
                  }
                  sx={{
                    width: '31%',
                  }}
                  //   defaultValue={
                  //     edit && customers ? customers.find((c) => c.id === edit.ownerId) : null
                  //   }
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
            <div className="flex justify-between items-center">
              <Typography>Зээлийн хүү : </Typography>
              <Input
                sx={{ width: '31%' }}
                {...field}
                type="number"
                endDecorator={<PercentOutlined />}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="loanAmount"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Зээлийн хэмжээ : </Typography>
              <Input {...field} type="number" />
            </div>
          )}
        />
        <Controller
          control={control}
          name="termOfLoan"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Зээлийн хугацаа : </Typography>
              <Input {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Эхлэх хугацаа : </Typography>
              <Input
                {...field}
                type="date"
                sx={{ width: '31%' }}
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
            <div className="flex justify-between items-center">
              <Typography>Дуусах хугацаа : </Typography>
              <Input
                {...field}
                type="date"
                sx={{ width: '31%' }}
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
