import Input from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { EditSalesType } from './helper';

type SoldCollateralFormProps = {
  close: () => void;
  id: number;
  edit: EditSalesType | undefined;
  resetEdit: () => void;
};

const SoldCollateralForm: FunctionComponent<SoldCollateralFormProps> = ({
  id,
  edit,
  close,
  resetEdit,
}) => {
  const queryClient = useQueryClient();
  const formSchema = z.object({
    collateralId: z.coerce.number(),
    amountSold: z.coerce.number(),
    soldDate: z.date(),
    description: z.string(),
  });

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collateralId: id ? id : 0,
      amountSold: edit?.amountSold ?? 0,
      soldDate: edit?.soldDate ? new Date(edit.soldDate) : new Date(),
      description: edit?.description ?? '',
    },
  });

  const addSoldCollateralMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      axios.post('/api/collateral/sold', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collateralId', 'collateralsTableData'] });
      resetEdit();
      close();
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addSoldCollateralMutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        display="grid"
        gridTemplateColumns="1fr"
        columnGap={5}
        gridTemplateRows="repeat(5, 1fr)"
      >
        <Controller
          control={control}
          name="collateralId"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Бүртгэл № : </Typography>
              <Input disabled {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="amountSold"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Борлуулсан дүн : </Typography>
              <Input {...field} required />
            </div>
          )}
        />
        <Controller
          control={control}
          name="soldDate"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Борлуулсан огноо : </Typography>
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
          name="description"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Тайлбар : </Typography>
              <Input {...field} />
            </div>
          )}
        />
        <Box marginTop={2} display="flex" justifyContent="flex-end" columnGap={2}>
          <Button type="submit" color="neutral">
            Хадгалах
          </Button>
          <Button
            onClick={() => {
              close();
              resetEdit();
            }}
            color="neutral"
          >
            Буцах
          </Button>
        </Box>
      </Grid>
    </form>
  );
};
export default SoldCollateralForm;
