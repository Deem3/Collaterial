import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Input, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type AddAssetTypeFormProps = {
  open: boolean;
  close: () => void;
  id: number;
};

const AddAssetTypeForm: FunctionComponent<AddAssetTypeFormProps> = ({ close, open, id }) => {
  const queryClient = useQueryClient();
  const addAssetTypeMutation = useMutation({
    mutationFn: async (data: z.infer<typeof AddAssetTypeFormSchema>) => {
      return axios.post('/api/asset/assetType', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assetTypeId', 'assetType', 'assetTypeData'] });
      reset();
      close();
    },
  });

  const AddAssetTypeFormSchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
  });

  const { control, reset, handleSubmit } = useForm<z.infer<typeof AddAssetTypeFormSchema>>({
    resolver: zodResolver(AddAssetTypeFormSchema),
    defaultValues: {
      id,
      name: '',
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: z.infer<typeof AddAssetTypeFormSchema>) => {
    addAssetTypeMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="id"
        render={({ field }) => (
          <div className="flex justify-between items-center">
            <Typography>Дугаар : </Typography>
            <Input disabled {...field} />
          </div>
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <div className="flex justify-between items-center">
            <Typography>Нэр : </Typography>
            <Input {...field} />
          </div>
        )}
      />
      <Box marginTop={5} display="flex" justifyContent="flex-end" columnGap={2}>
        <Button type="submit" color="neutral">
          Хадгалах
        </Button>
        <Button onClick={close} color="neutral">
          Буцах
        </Button>
      </Box>
    </form>
  );
};
export default AddAssetTypeForm;
