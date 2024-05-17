import Input from '@/components/ui/Input';
import { mainColors } from '@/config/colorScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FunctionComponent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  AddCustomerFormSchema,
  CITY,
  CustomerDataType,
  DISTRICT,
  EDUCATION_STATUS,
  GENDER,
  MARRIAGE_STATUS,
} from './helper';

type AddCustomerModalProps = {
  open: boolean;
  close: () => void;
  userId?: string;
  edit: CustomerDataType | undefined;
};

const controllerDivStyle = 'flex items-center justify-between';

const AddCustomerModal: FunctionComponent<AddCustomerModalProps> = ({
  open,
  close,
  userId,
  edit,
}) => {
  const queryClient = useQueryClient();
  const CustomerMutation = useMutation({
    mutationFn: async (data: z.infer<typeof AddCustomerFormSchema>) => {
      if (edit) {
        axios.put(`/api/customer/`, data);
      } else {
        axios.post('/api/customer/', data);
      }
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

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof AddCustomerFormSchema>>({
    resolver: zodResolver(AddCustomerFormSchema),
    defaultValues: {
      userId,
      email: '',
      firstname: '',
      lastname: '',
      surname: '',
      register: '',
      familyMembers: 0,
      employment: '',
      address: '',
      district: DISTRICT.ULAANBAATAR_BAYANGOL,
      city: CITY.ULAANBAATAR,
      education: EDUCATION_STATUS.HIGH_SCHOOL,
      marriageStatus: MARRIAGE_STATUS.SINGLE,
      civilRegistrationNumber: '',
      khoroo: '',
      monthlyIncome: 0,
      phone: {
        first: 0,
        second: 0,
      },
      gender: GENDER.MALE,
      customerId: edit?.id ?? 0,
      birthdate: new Date(),
    },
  });

  console.log(errors);

  useEffect(() => {
    if (edit) {
      reset({
        userId,
        email: edit.email,
        firstname: edit.firstname,
        lastname: edit.lastname,
        surname: edit.surname,
        register: edit.register,
        familyMembers: edit.familyMembers,
        employment: edit.employment,
        address: edit.address,
        district: edit.district,
        city: edit.city,
        education: edit.education,
        marriageStatus: edit.marriageStatus,
        civilRegistrationNumber: edit.civilRegistrationNumber,
        khoroo: edit.khoroo,
        monthlyIncome: edit.monthlyIncome,
        phone: {
          first: edit.phone.first,
          second: edit.phone.second,
        },
        gender: edit.gender,
        customerId: edit ? edit.id : 0,
        birthdate: new Date(edit.birthdate),
      });
    } else {
      reset({
        userId,
        email: '',
        firstname: '',
        lastname: '',
        surname: '',
        register: '',
        familyMembers: 0,
        employment: '',
        address: '',
        district: DISTRICT.ULAANBAATAR_BAYANGOL,
        city: CITY.ULAANBAATAR,
        education: EDUCATION_STATUS.HIGH_SCHOOL,
        marriageStatus: MARRIAGE_STATUS.SINGLE,
        civilRegistrationNumber: '',
        khoroo: '',
        monthlyIncome: 0,
        phone: {
          first: 0,
          second: 0,
        },
        gender: GENDER.MALE,
        customerId: isFetched ? data : 0,
        birthdate: new Date(),
      });
    }
  }, [reset, edit, open]); // Add open as a dependency
  // const [selectedCity, setSelectedCity] = useState<CITY>(CITY.ULAANBAATAR);

  const onSubmit = (data: z.infer<typeof AddCustomerFormSchema>) => {
    CustomerMutation.mutate(data);
  };

  return (
    <Modal open={open}>
      <ModalDialog sx={{ paddingX: 0, minWidth: '55%' }} layout="center" variant="soft">
        <ModalClose
          onClick={() => {
            close();
            reset();
          }}
        />
        <Typography marginLeft={5} fontWeight="bold">
          Харилцагч
        </Typography>
        <Box width="100%" sx={{ borderTop: '1px solid', borderBottom: '1px solid' }}>
          <Box
            width="12%"
            display="flex"
            justifyContent="center"
            sx={{ bgcolor: mainColors.primary }}
            borderRadius={5}
          >
            <Typography sx={{ color: 'white', paddingY: '2px' }}>Үндсэн</Typography>
          </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} className="px-[3.4%]">
          <Grid container columnGap={6} gridTemplateColumns="1fr 1fr" display="grid">
            <Grid display="grid" rowGap={1.5}>
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
                    {isFetched && <Input {...field} disabled />}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="surname"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Ургийн овог : </Typography>
                    <Input required {...field} sx={{ width: '50%' }} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="lastname"
                render={({ field }) => (
                  <div className={controllerDivStyle}>
                    <Typography>Овог : </Typography>
                    <Input required {...field} />
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
                      sx={{ width: '50%' }}
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
                      sx={{ width: '50%' }}
                      type="date"
                      {...field}
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
                      sx={{ width: '50%' }}
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
                      sx={{ width: '50%' }}
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
                      sx={{ width: '50%' }}
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
                    <Input required {...field} />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="register"
                render={({ field }) => (
                  <div className={controllerDivStyle + ' row-start-5'}>
                    <Typography>Регистр : </Typography>
                    <Input required {...field} />
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
                    <Input {...field} />
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
                    <Input required {...field} />
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
                close();
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
