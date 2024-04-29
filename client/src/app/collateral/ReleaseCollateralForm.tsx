import Input from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Option, Select, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type ReleaseCollateralFormProps = {
  close: () => void;
  edit: {
    collateralId: number;
    state: string;
    description: string;
  };
  resetEdit: () => void;
};

const ReleaseCollateralForm: FunctionComponent<ReleaseCollateralFormProps> = ({
  close,
  edit,
  resetEdit,
}) => {
  const queryClient = useQueryClient();
  const formSchema = z.object({
    collateralId: z.coerce.number(),
    state: z.string().default('RELEASED'),
    description: z.string(),
  });

  const { control, handleSubmit, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collateralId: edit ? edit.collateralId : 0,
      state: edit.state || '',
      description: edit.description || '',
    },
  });

  const addReleaseCollateralMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      axios.post('/api/collateral/release', data, {
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
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['collateralId', 'collateralsTableData'] });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addReleaseCollateralMutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        display="grid"
        gridTemplateColumns="1fr"
        columnGap={5}
        gridTemplateRows="repeat(4, 1fr)"
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
          name="state"
          render={({ field }) => (
            <div className={'flex justify-between items-center'}>
              <Typography>Төлөв : </Typography>
              <Select
                {...field}
                onChange={(_, value: string | null) => {
                  if (value) {
                    setValue('state', value);
                  }
                }}
                sx={{
                  width: '50%',
                }}
              >
                <Option value="RELEASED">Чөлөөлсөн</Option>
              </Select>
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

export default ReleaseCollateralForm;
