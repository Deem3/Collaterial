import Input from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Option, Select, Typography } from '@mui/joy';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AdditionalFieldTypes } from './type';

type AddSubAssetTypeFormProps = {
  open: boolean;
  close: () => void;
  id: number;
  assetType: { id: number; name: string }[];
};

const AddSubAssetTypeForm: FunctionComponent<AddSubAssetTypeFormProps> = ({
  close,
  open,
  id,
  assetType,
}) => {
  const queryClient = useQueryClient();
  const addSubAssetTypeMutation = useMutation({
    mutationFn: async (data: z.infer<typeof AddSubAssetTypeFormSchema>) => {
      return axios.post('/api/asset/subAssetType', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subAssetTypeId', 'subAssetTypeData'] });
      reset();
      close();
    },
  });

  const AddSubAssetTypeFormSchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
    assetType: z.coerce.number(),
    additionalFields: z
      .array(z.object({ name: z.string(), type: z.nativeEnum(AdditionalFieldTypes) }))
      .optional(),
  });

  const { control, reset, setValue, handleSubmit } = useForm<
    z.infer<typeof AddSubAssetTypeFormSchema>
  >({
    resolver: zodResolver(AddSubAssetTypeFormSchema),
    defaultValues: {
      id,
      name: '',
      assetType: 1,
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: z.infer<typeof AddSubAssetTypeFormSchema>) => {
    addSubAssetTypeMutation.mutate(data);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalFields',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-2">
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
            <Typography>Дэд төрөл : </Typography>
            <Input {...field} />
          </div>
        )}
      />
      <Controller
        control={control}
        name="assetType"
        render={({ field }) => (
          <div className="flex justify-between items-center">
            <Typography>Хөрөнгийн төрөл : </Typography>
            <Select
              sx={{ width: '50%' }}
              {...field}
              onChange={(_, newValue: number | null) => {
                if (newValue) {
                  setValue('assetType', newValue);
                }
              }}
            >
              {assetType.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.name}
                </Option>
              ))}
            </Select>
          </div>
        )}
      />
      {fields.map((field, index) => (
        <div key={field.id} className="gird gap-y-2">
          <Controller
            control={control}
            name={`additionalFields.${index}.name`}
            render={({ field }) => <Input {...field} sx={{ width: '100%', marginY: '0.5rem' }} />}
          />
          <Controller
            control={control}
            name={`additionalFields.${index}.type`}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(_, val: AdditionalFieldTypes | null) => {
                  if (val) setValue(`additionalFields.${index}.type`, val);
                }}
                sx={{ marginBottom: '0.5rem' }}
              >
                {Object.values(AdditionalFieldTypes).map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            )}
          />
          <Button color="neutral" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button
        color="neutral"
        onClick={() => append({ name: '', type: AdditionalFieldTypes.STRING })}
      >
        Add
      </Button>
      <Box marginTop={2} display="flex" justifyContent="flex-end" columnGap={2}>
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
export default AddSubAssetTypeForm;
