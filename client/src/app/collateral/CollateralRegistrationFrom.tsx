import Input from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Grid,
  Option,
  Select,
  Textarea,
  Typography,
} from '@mui/joy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { EditType } from './helper';

type collateralRegistrationFromProps = {
  id: number;
  edit: EditType | undefined;
  close: () => void;
  resetEdit: () => void;
};

const CollateralRegistrationFrom: FunctionComponent<collateralRegistrationFromProps> = ({
  id,
  edit,
  close,
  resetEdit,
}) => {
  const queryClient = useQueryClient();
  const AddCollateralFormSchema = z.object({
    id: z.coerce.number(),
    owner: z.string(),
    assetType: z.coerce.number(),
    subAssetType: z.coerce.number(),
    collateralName: z.string(),
    state: z.string(),
    quantity: z.coerce.number(),
    depositAmount: z.coerce.number(),
    marketValue: z.coerce.number(),
    dateOfAssessment: z.coerce.date().max(new Date()),
    description: z.string(),
  });

  const [formSchema, setFormSchema] = useState(AddCollateralFormSchema);
  const { control, setValue, watch, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id + 1,
      owner: '',
      assetType: 0,
      subAssetType: 0,
      collateralName: '',
      state: '',
      quantity: 0,
      depositAmount: 0,
      marketValue: 0,
      description: '',
      dateOfAssessment: new Date(),
    },
  });

  useEffect(() => {
    if (edit) {
      reset({
        id: edit.id,
        owner: edit.ownerId,
        assetType: edit.assetTypeId,
        collateralName: edit.collateralName,
        state: edit.state,
        quantity: edit.quantity,
        depositAmount: edit.depositAmount,
        marketValue: edit.marketValue,
        description: edit.description,
        dateOfAssessment: new Date(edit.dateOfAssessment),
        subAssetType: edit.subAssetTypeId,
      });

      if (edit.additionalFields) {
        for (const [key, value] of Object.entries(edit.additionalFields)) {
          setValue(`additionalFields.${key}`, value);
        }
      }
    }
  }, [edit, reset]);
  const watchedAssetType = watch('assetType');

  const { data: subAssetType, isFetched: subAssetTypeIsFetched } = useQuery({
    queryKey: ['subAssetType', watchedAssetType],
    queryFn: async () => {
      const { data } = await axios.get('api/asset/subAssetTypeForCollateral', {
        params: {
          id: watchedAssetType,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    if (watch('subAssetType') && !edit) {
      const getZodType = (type: string) => {
        switch (type) {
          case 'string':
            return z.string().optional();
          case 'number':
            return z.coerce.number().optional(); // use z.number() instead of z.coerce.number()
          default:
            throw new Error(`Unsupported type: ${type}`);
        }
      };

      const selectedSubAsset = subAssetType.find(
        (subAsset) => subAsset.id == watch('subAssetType'),
      );

      if (selectedSubAsset?.additionalFields && selectedSubAsset.additionalFields.length > 0) {
        const additionalFieldsSchema = selectedSubAsset.additionalFields.reduce((acc, field) => {
          return { ...acc, [field.name]: getZodType(field.type) };
        }, {});

        setFormSchema(
          AddCollateralFormSchema.extend({
            additionalFields: z.object(additionalFieldsSchema),
          }),
        );
      }
    }
  }, [watch('subAssetType')]);

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data } = await axios.get('api/customer/customersName');
      return data as { firstname: string; id: string; lastname: string }[];
    },
  });

  const { data: assetTypes, isFetched } = useQuery({
    queryKey: ['assetTypes'],
    queryFn: async () => {
      const { data } = await axios.get('api/asset/assetType');
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      axios.post('/api/collateral/', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collateralId', 'collateralsTableData'] });
      close();
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['collateralId', 'collateralsTableData'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      axios.put('/api/collateral/', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collateralId', 'collateralsTableData'] });
      close();
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['collateralId', 'collateralsTableData'] });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    edit ? updateMutation.mutate(data) : createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        display="grid"
        gridTemplateColumns="1fr 1fr"
        columnGap={5}
        gridTemplateRows="repeat(7, 1fr)"
        rowGap={2}
      >
        <Controller
          control={control}
          name="id"
          render={({ field }) => (
            <div className={'flex justify-between items-center col-start-1'}>
              <Typography>Бүртгэл № : </Typography>
              <Input disabled {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="owner"
          render={({ field }) => (
            <div className={'grid items-center grid-cols-[0.22fr_0.25fr_0.53fr] col-span-2 gap-6'}>
              <Typography>Эзэмшигч : </Typography>
              <Input {...field} disabled sx={{ width: '100%' }} />
              {customers && (
                <Autocomplete
                  sx={{ width: '50%' }}
                  onChange={(_, val: { firstname: string; lastname: string; id: string } | null) =>
                    setValue('owner', val ? val.id : '')
                  }
                  defaultValue={
                    edit && customers ? customers.find((c) => c.id === edit.ownerId) : null
                  }
                  loading={isLoading}
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
          name="assetType"
          render={({ field }) => (
            <div className={'flex justify-between items-center'}>
              <Typography>Хөрөнгийн төрөл : </Typography>
              <Select
                {...field}
                sx={{ width: '50%' }}
                onChange={(_, val: number | null) => {
                  if (val) {
                    setValue('assetType', val);
                  }
                }}
              >
                {isFetched &&
                  assetTypes?.map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type.name}
                    </Option>
                  ))}
              </Select>
            </div>
          )}
        />
        <Controller
          control={control}
          name="subAssetType"
          render={({ field }) => (
            <div className={'flex justify-between items-center'}>
              <Typography>Дэд төрөл : </Typography>
              <Select
                {...field}
                sx={{ width: '50%' }}
                onChange={(_, val: number | null) => {
                  if (val) {
                    setValue('subAssetType', val);
                  }
                }}
              >
                {subAssetTypeIsFetched &&
                  subAssetType.map((subAsset) => (
                    <Option key={subAsset.id} value={subAsset.id}>
                      {subAsset.name}
                    </Option>
                  ))}
              </Select>
            </div>
          )}
        />
        <Controller
          control={control}
          name="collateralName"
          render={({ field }) => (
            <div className={'flex justify-between items-center'}>
              <Typography>Барьцааны нэр : </Typography>
              <Input {...field} />
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
                <Option value="HELD_ASSET">Барьцаанд байгаа</Option>
                <Option value="RELEASED">Чөлөөлсөн</Option>
                <Option value="SOLD">Борлуулсан</Option>
              </Select>
            </div>
          )}
        />
        <Controller
          control={control}
          name="quantity"
          render={({ field }) => (
            <div className={'flex justify-between items-center '}>
              <Typography>Тоо, хэмжээ : </Typography>
              <Input {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="depositAmount"
          render={({ field }) => (
            <div className={'flex justify-between items-center'}>
              <Typography>Барьцаалах дүн : </Typography>
              <Input {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="marketValue"
          render={({ field }) => (
            <div className={'flex justify-between items-center'}>
              <Typography>Зах зээлийн үнэлгээ : </Typography>
              <Input {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="dateOfAssessment"
          render={({ field }) => (
            <div className={'flex justify-between items-center'}>
              <Typography>Үнэлгээ хийсэн огноо : </Typography>
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
            <div className={'flex justify-between items-center col-span-2'}>
              <Typography>Тайлбар : </Typography>
              <Textarea className="w-[76.5%]" {...field} />
            </div>
          )}
        />
      </Grid>
      {subAssetTypeIsFetched &&
        subAssetType.find((subAsset) => subAsset.id === watch('subAssetType')) &&
        subAssetType.find((subAsset) => subAsset.id === watch('subAssetType')).additionalFields
          .length > 0 && (
          <AccordionGroup sx={{ marginY: '14px' }}>
            <Accordion>
              <AccordionSummary>Нэмэлт</AccordionSummary>
              <AccordionDetails>
                <div className="grid  grid-cols-2 gap-4">
                  {subAssetType
                    .find((subAsset) => subAsset.id === watch('subAssetType'))
                    .additionalFields.map((fields) => (
                      <Controller
                        key={fields.name}
                        control={control}
                        name={`additionalFields.${fields.name}`}
                        render={({ field }) => {
                          return (
                            <div className="flex justify-between items-center">
                              <Typography>{fields.name}</Typography>
                              <Input {...field} />
                            </div>
                          );
                        }}
                      />
                    ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        )}
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
    </form>
  );
};

export default CollateralRegistrationFrom;
