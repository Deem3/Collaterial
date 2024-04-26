import { zodResolver } from '@hookform/resolvers/zod';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Input,
  Grid,
  Button,
  Box,
  Select,
  Option,
  CircularProgress,
} from '@mui/joy';
import { FunctionComponent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  AddCustomerFormSchema,
  CITY,
  DISTRICT,
  EDUCATION_STATUS,
  EMPLOYMENT_STATUS,
  GENDER,
  MARRIAGE_STATUS,
} from './helper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { mainColors } from '@/config/colorScheme';

type AddCustomerModalProps = {
  open: boolean;
  close: () => void;
  userId?: string;
};

const controllerDivStyle = 'flex items-center justify-between';

const AddCustomerModal: FunctionComponent<AddCustomerModalProps> = ({ open, close, userId }) => {
  const queryClient = useQueryClient();
  const CustomerMutation = useMutation({
    mutationFn: async (data: z.infer<typeof AddCustomerFormSchema>) => {
      return axios.post('/api/customer/', data);
    },
    onSuccess: () => {
      close();
      reset();
      queryClient.invalidateQueries({ queryKey: ['getCustomers'] });
    },
  });

  const { data, isFetched, isLoading } = useQuery({
    queryKey: ['getCustomerId'],
    queryFn: async () => {
      const { data } = await axios.get('/api/customer/getId');
      setValue('customerId', data);
      return data;
    },
    enabled: open,
  });

  const { control, setValue, handleSubmit, formState, reset } = useForm<
    z.infer<typeof AddCustomerFormSchema>
  >({
    resolver: zodResolver(AddCustomerFormSchema),
    defaultValues: {
      userId: userId,
      email: '',
      firstname: '',
      lastname: '',
      surname: '',
      register: '',
      familyMembers: 0,
      employment: EMPLOYMENT_STATUS.EMPLOYED,
      address: '',
      district: DISTRICT.ULAANBAATAR_BAYANGOL,
      city: CITY.ULAANBAATAR,
      education: EDUCATION_STATUS.NONE,
      marriageStatus: MARRIAGE_STATUS.SINGLE,
      civilRegistrationNumber: '',
      khoroo: '',
      monthlyIncome: 0,
      phone: {
        first: 0,
        second: 0,
      },
      gender: GENDER.MALE,
      customerId: '',
      birthdate: new Date(),
    },
  });

  console.log(formState.errors);
  // const [selectedCity, setSelectedCity] = useState<CITY>(CITY.ULAANBAATAR);

  const onSubmit = (data: z.infer<typeof AddCustomerFormSchema>) => {
    CustomerMutation.mutate(data);
  };

  return (
    <Modal open={open}>
      <ModalDialog layout="center" variant="soft">
        <ModalClose
          onClick={() => {
            close();
            reset();
          }}
        />
        <Typography fontWeight="bold">Харилцагч</Typography>
        <Typography>Үндсэн</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columnGap={6} gridTemplateColumns="1fr 1fr" display="grid">
            <Grid>
              <Controller
                control={control}
                name="customerId"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Харилцагч № : </Typography>

                    {isLoading && (
                      <Input
                        endDecorator={
                          <CircularProgress
                            determinate={false}
                            size="sm"
                            value={40}
                            variant="plain"
                            sx={{ color: mainColors.primary }}
                          />
                        }
                      />
                    )}
                    {isFetched && <Input {...field} value={data} disabled />}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="surname"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Ургийн овог : </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="lastname"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Овог : </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Хүйс : </Typography>
                    <Select
                      sx={{ width: '51%' }}
                      {...field}
                      onChange={(_, newValue: GENDER | null) => {
                        if (newValue) {
                          setValue('gender', newValue);
                        }
                      }}
                    >
                      {Object.entries(GENDER).map(([key, value]) => (
                        <Option key={key} value={value}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="birthdate"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Төрсөн огноо : </Typography>
                    <Input
                      sx={{ width: '51%' }}
                      type="date"
                      {...field}
                      // onChange={(_, date: string) => {
                      //   if (date) {
                      //     setValue('birthdate', new Date(date));
                      //   }
                      // }}
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
                name="civilRegistrationNumber"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Иргэний бүртгэлтийн дугаар : </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="marriageStatus"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Гэрлэлтийн байдал: </Typography>
                    <Select
                      sx={{ width: '51%' }}
                      {...field}
                      onChange={(_, newValue: MARRIAGE_STATUS | null) => {
                        if (newValue) {
                          setValue('marriageStatus', newValue);
                        }
                      }}
                    >
                      {Object.entries(MARRIAGE_STATUS).map(([key, value]) => (
                        <Option key={key} value={value}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="education"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Боловсрол: </Typography>
                    <Select
                      {...field}
                      sx={{ width: '51%' }}
                      onChange={(_, newValue: EDUCATION_STATUS | null) => {
                        if (newValue) {
                          setValue('education', newValue);
                        }
                      }}
                    >
                      {Object.entries(EDUCATION_STATUS).map(([key, value]) => (
                        <Option value={value} key={key}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Аймаг/Хот: </Typography>
                    <Select
                      sx={{ width: '51%' }}
                      {...field}
                      onChange={(_, newValue: CITY | null) => {
                        if (newValue) {
                          setValue('city', newValue);
                          // setSelectedCity(newValue);
                        }
                      }}
                    >
                      {Object.entries(CITY).map(([key, value]) => (
                        <Option value={value} key={key}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="khoroo"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Баг/Хороо: </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="monthlyIncome"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Сарын орлого: </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="phone.first"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Утасны дугаар: </Typography>
                    <Input required {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Цахим шуудан: </Typography>
                    <Input type="email" {...field} />
                  </div>
                )}
              />
            </Grid>
            <Grid display="grid" gridTemplateRows="repeat(13, 1fr)">
              <Controller
                control={control}
                name="firstname"
                render={({ field }) => (
                  <div className={controllerDivStyle + ' row-start-3'}>
                    <Typography>Нэр : </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="register"
                render={({ field }) => (
                  <div className={controllerDivStyle + ' row-start-5'}>
                    <Typography>Регистр : </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="familyMembers"
                render={({ field }) => (
                  <div className={controllerDivStyle + ' row-start-7'}>
                    <Typography>Ам бүл : </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="employment"
                render={({ field }) => (
                  <div className={controllerDivStyle + ' row-start-8'}>
                    <Typography>Ажил эрхлэлт : </Typography>
                    <Select
                      sx={{ width: '51%' }}
                      {...field}
                      onChange={(_, newValue: EMPLOYMENT_STATUS | null) => {
                        if (newValue) setValue('employment', newValue);
                      }}
                    >
                      {Object.entries(EMPLOYMENT_STATUS).map(([key, value]) => (
                        <Option key={key} value={value}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="district"
                render={({ field }) => (
                  <div className={controllerDivStyle + ' row-start-9'}>
                    <Typography>Сум/Дүүрэг : </Typography>
                    {/* <Select */}
                    {/*   sx={{ width: '51%' }} */}
                    {/*   {...field} */}
                    {/*   onChange={(_, value: DISTRICT | null) => { */}
                    {/*     if (value) setValue('district', value); */}
                    {/*   }} */}
                    {/* > */}
                    {/*   {Object.entries(DISTRICT) */}
                    {/*     .filter(([key]) => key.startsWith(selectedCity)) */}
                    {/*     .map(([key, value]) => ( */}
                    {/*       <Option key={key} value={value}> */}
                    {/*         {value} */}
                    {/*       </Option> */}
                    {/*     ))} */}
                    {/* </Select> */}
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <div className={controllerDivStyle + ' row-start-10'}>
                    <Typography>Байршил : </Typography>
                    <Input {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="phone.second"
                render={({ field }) => (
                  <div className={controllerDivStyle + ' row-start-[12]'}>
                    <Input {...field} />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Box display="flex" width="100%" justifyContent="flex-end" gap={2}>
            <Button type="submit" color="neutral">
              Хадгалах
            </Button>
            <Button
              onClick={() => {
                reset(), close();
              }}
              color="neutral"
            >
              Буцах
            </Button>
          </Box>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default AddCustomerModal;
