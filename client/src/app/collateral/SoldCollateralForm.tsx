import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Input, Typography } from '@mui/joy';
import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type SoldCollateralFormProps = {
  close: () => void;
};

const SoldCollateralForm: FunctionComponent<SoldCollateralFormProps> = ({ close }) => {
  const formSchema = z.object({
    id: z.coerce.number(),
    amountSold: z.coerce.number(),
    soldDate: z.date(),
    description: z.string(),
  });

  const { control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      amountSold: 0,
      soldDate: new Date(),
      description: '',
    },
  });
  return (
    <form>
      <Grid
        display="grid"
        gridTemplateColumns="1fr"
        columnGap={5}
        gridTemplateRows="repeat(7, 1fr)"
        rowGap={2}
      >
        <Controller
          control={control}
          name="id"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Бүртгэл № : </Typography>
              <Input {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="amountSold"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Борлуулсан дүн : </Typography>
              <Input {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="soldDate"
          render={({ field }) => (
            <div className="flex justify-between items-center">
              <Typography>Борлуулсан огноо : </Typography>
              <Input {...field} type="date" />
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
          <Button onClick={close} color="neutral">
            Буцах
          </Button>
        </Box>
      </Grid>
    </form>
  );
};
export default SoldCollateralForm;
