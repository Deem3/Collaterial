import { z } from 'zod';

export enum MARRIAGE_STATUS {
  MARRIED = 'Гэрлэсэн',
  SINGLE = 'Ганц бие',
  OTHER = 'Бусад',
}

export enum EDUCATION_STATUS {
  HIGH_SCHOOL = 'Бүрэн дунд',
  BACHELOR = 'Бакалавр',
  MASTER = 'Магистр',
}

export enum GENDER {
  MALE = 'Эрэгтэй',
  FEMALE = 'Эмэгтэй',
}

export enum CITY {
  ULAANBAATAR = 'Улаанбаатар',
  ARKHANGAI = 'Архангай',
  BAYAN_OLGII = 'Баян-Өлгий',
  BAYANKHONGOR = 'Баянхонгор',
  BULGAN = 'Булган',
  GOVI_ALTAI = 'Говь-Алтай',
  GOVI_SUMBER = 'Говь-Сүмбэр',
  DARKHAN_UUL = 'Дархан-Уул',
  DORNOGOVI = 'Дорноговь',
  DORNOD = 'Дорнод',
  DUNDGOVI = 'Дундговь',
  ZAVKHAN = 'Завхан',
  ORKHON = 'Орхон',
  UVUURKHANGAI = 'Өвөрхангай',
  UMNUGOVI = 'Өмнөговь',
  SUKHBAATAR = 'Сүхбаатар',
  SELENGE = 'Сэлэнгэ',
  TUV = 'Төв',
  UVS = 'Увс',
  KHOVD = 'Ховд',
  KHUVSGUL = 'Хөвсгөл',
  KHENTII = 'Хэнтий',
}

export const AddCustomerFormSchema = z.object({
  customerId: z.coerce.number(),
  surname: z.string(),
  lastname: z.string(),
  firstname: z.string(),
  gender: z.nativeEnum(GENDER),
  birthdate: z.coerce.date().max(new Date()),
  register: z
    .string()
    .min(10)
    .max(10)
    .regex(/^[а-яА-ЯүөӨҮ]{2}\d{8}$/, {
      message: 'Invalid Mongolian civil registration number',
    }),
  civilRegistrationNumber: z.string(),
  marriageStatus: z.nativeEnum(MARRIAGE_STATUS),
  education: z.nativeEnum(EDUCATION_STATUS),
  city: z.nativeEnum(CITY),
  district: z.string().min(1),
  khoroo: z.string(),
  address: z.string(),
  monthlyIncome: z.coerce.number().positive(),
  phone: z.object({
    first: z.coerce.number().positive(),
    second: z.coerce.number().positive(),
  }),
  familyMembers: z.coerce.number().positive(),
  employment: z.string(),
  email: z.string().email(),
  userId: z.string(),
});

export type CustomerDataType = Omit<z.infer<typeof AddCustomerFormSchema>, 'userId'> & {
  id: number;
};

export enum DISTRICT {
  ULAANBAATAR_BAGANUUR = 'Багануур',
  ULAANBAATAR_BAGAKHANGAI = 'Багахангай',
  ULAANBAATAR_BAYANGOL = 'Баянгол',
  ULAANBAATAR_BAYANZURKH = 'Баянзүрх',
  ULAANBAATAR_NALAIKH = 'Налайх',
  ULAANBAATAR_SONGINOHAIKHAN = 'Сонгинохайрхан',
  ULAANBAATAR_SUHBAATAR = 'Сүхбаатар',
  ULAANBAATAR_KHAN_UUL = 'Хан-Уул',
  ULAANBAATAR_CHINGELTEI = 'Чингэлтэй',
  ARKHANGAI_TSETSERLEG = 'Цэцэрлэг хот',
  ARKHANGAI_BATTSNENGEL = 'Батцэнгэл сум',
  ARKHANGAI_BULGAN = 'Булган сум',
  ARKHANGAI_JARGALANT = 'Жаргалант сум',
  ARKHANGAI_IKHTAMIR = 'Ихтамир сум',
  ARKHANGAI_UGIINUUR = 'Өгийнуур сум',
  ARKHANGAI_OLZIYT = 'Өлзийт сум',
  ARKHANGAI_ONDOR_ULAAN = 'Өндөр-Улаан сум',
  ARKHANGAI_TARIAT = 'Тариат сум',
  ARKHANGAI_TUVSHRUULIKH = 'Төвшрүүлэх сум',
  ARKHANGAI_KHAIRKHAN = 'Хайрхан сум',
  ARKHANGAI_HANGAI = 'Хангай сум',
  ARKHANGAI_KHASHAAT = 'Хашаат сум',
  ARKHANGAI_HOTONT = 'Хотонт сум',
  ARKHANGAI_TSAKHIR = 'Цахир сум',
  ARKHANGAI_TSENKHER = 'Цэнхэр сум',
  ARKHANGAI_TSETSERLEG_SUM = 'Цэцэрлэг сум',
  ARKHANGAI_CHULUUT = 'Чулуут сум',
  ARKHANGAI_ERDENEBULGAN = 'Эрдэнэбулган сум',
  ARKHANGAI_ERDENEMANDAL = 'Эрдэнэмандал сум',
  BAYAN_OLGII_OLGII = 'Өлгий хот',
  BAYAN_OLGII_ALTAI = 'Алтай сум',
  BAYAN_OLGII_ALTANTSOGT = 'Алтанцөгц сум',
  BAYAN_OLGII_BAYANNUUR = 'Баяннуур сум',
  BAYAN_OLGII_BUGAT = 'Бугат сум',
  BAYAN_OLGII_BULGAN = 'Булган Сум',
  BAYAN_OLGII_BUYANT = 'Буянт сум',
  BAYAN_OLGII_DELUUN = 'Дэлүүн сум',
  BAYAN_OLGII_NOGOONNUUR = 'Ногооннуур сум',
  BAYAN_OLGII_SAGSAY = 'Сагсай сум',
  BAYAN_OLGII_TOLBO = 'Толбо сум',
  BAYAN_OLGII_ULAANKHUS = 'Улаанхус сум',
  BAYAN_OLGII_TSAGAANNUUR = 'Цагааннуур сум',
  BAYANHONGOR_BAYANHONGOR = 'Баянхонгор хот',
  BAYANHONGOR_BAATSGAAN = 'Баацагаан сум',
  BAYANHONGOR_BAYANBULAG = 'Баянбулаг сум',
  BAYANHONGOR_BAYANGOV = 'Баянговь сум',
  BAYANHONGOR_BAYANLIG = 'Баянлиг сум',
  BAYANHONGOR_BAYAN_OVOO = 'Баян-Овоо сум',
  BAYANHONGOR_BAYAN_ONDOR = 'Баян-Өндөр сум',
  BAYANHONGOR_BAYANHONGOR_SUM = 'Баянхонгор сум',
  BAYANHONGOR_BAYANTSAGAAN = 'Баянцагаан сум',
  BAYANHONGOR_BOGD = 'Богд сум',
  BAYANHONGOR_BOMBOGOR = 'Бөмбөгөр сум',
  BAYANHONGOR_BUUTSGAAN = 'Бууцагаан сум',
  BAYANHONGOR_GALUUT = 'Галуут сум',
  BAYANHONGOR_GURVANBULAG = 'Гурванбулаг сум',
  BAYANHONGOR_JARGALANT = 'Жаргалант Сум',
  BAYANHONGOR_JINST = 'Жинст сум',
  BAYANHONGOR_ZAG = 'Заг сум',
  BAYANHONGOR_OLZIYT = 'Өлзийт Сум',
  BAYANHONGOR_KHUREEMARAL = 'Хүрээмарал сум',
  BAYANHONGOR_SHINEJINST = 'Шинэжинст сум',
  BAYANHONGOR_ERDENETSOGT = 'Эрдэнэцогт сум',
  BULGAN_BULGAN = 'Булган хот',
  BULGAN_BAYAN_AGAT = 'Баян-Агт сум',
  BULGAN_BAYANNUUR = 'Баяннуур Сум',
  BULGAN_BUGAT = 'Бугат Сум',
  BULGAN_BUREGHANGAI = 'Бүрэгхангай сум',
  BULGAN_DASHINCHILEN = 'Дашинчилэн сум',
  BULGAN_MOGOD = 'Могод сум',
  BULGAN_ORKHON = 'Орхон сум',
  BULGAN_RASHAANT = 'Рашаант сум',
  BULGAN_SAIKHAN = 'Сайхан сум',
  BULGAN_SELENGE = 'Сэлэнгэ сум',
  BULGAN_TESHIIG = 'Тэшиг сум',
  BULGAN_KHANGAL = 'Хангал сум',
  BULGAN_KHISHIG_ONDOR = 'Хишиг-Өндөр сум',
  BULGAN_KHUTAG_ONDOR = 'Хутаг-Өндөр сум',
  GOV_ALTAY_ALTAI = 'Алтай хот',
  GOV_ALTAY_ALTAI_SUM = 'Алтай Сум',
  GOV_ALTAY_BAYAN_UUL = 'Баян-Уул сум',
  GOV_ALTAY_BIGER = 'Бигэр сум',
  GOV_ALTAY_BUGAT = 'Бугат Сум, Говь-алтай',
  GOV_ALTAY_DARVI = 'Дарви сум',
  GOV_ALTAY_DELGER = 'Дэлгэр сум',
  GOV_ALTAY_JARGALAN = 'Жаргалан сум',
  GOV_ALTAY_ESONBULAG = 'Есөнбулаг сум',
  GOV_ALTAY_TAISHIR = 'Тайшир сум',
  GOV_ALTAY_TONKHIL = 'Тонхил сум',
  GOV_ALTAY_TOGROG = 'Төгрөг сум',
  GOV_ALTAY_KHALIUN = 'Халиун сум',
  GOV_ALTAY_KHOKHMORT = 'Хөхморьт сум',
  GOV_ALTAY_TSOGT = 'Цогт сум',
  GOV_ALTAY_TSEEL = 'Цээл сум',
  GOV_ALTAY_CHANDMAN = 'Чандмань сум',
  GOV_ALTAY_SHARGA = 'Шарга сум',
  GOV_ALTAY_ERDEN = 'Эрдэнэ сум',
  GOV_SUMBER_CHOIR = 'Чойр хот',
  GOV_SUMBER_SUMBER = 'Сүмбэр сум',
  GOV_SUMBER_BAYANTAL = 'Баянтал сум',
  GOV_SUMBER_SHIVEE_GOV = 'Шивээговь сум',
  DARCHAN_UUL_DARCHAN = 'Дархан хот',
  DARCHAN_UUL_DARCHAN_SUM = 'Дархан сум',
  DARCHAN_UUL_ORKHON = 'Орхон Сум',
  DARCHAN_UUL_HONGOR = 'Хонгор сум',
  DARCHAN_UUL_SHARYN_GOL = 'Шарын гол сум',
  DORN_GOV_SAINTSHAND = 'Сайншанд хот',
  DORN_GOV_AIRAG = 'Айраг сум',
  DORN_GOV_ALTAN_SHIREE = 'Алтанширээ сум',
  DORN_GOV_DALANJARGALAN = 'Даланжаргалан сум',
  DORN_GOV_DELGERTSEG = 'Дэлгэрэх сум',
  DORN_GOV_ZAMYN_UUD = 'Замын-Үүд сум',
  DORN_GOV_IKHKHET = 'Иххэт сум',
  DORN_GOV_MANDAKH = 'Мандах сум',
  DORN_GOV_URGON = 'Өргөн сум',
  DORN_GOV_SAIXANDULAAN = 'Сайхандулаан сум',
  DORN_GOV_ULAANBADRAKH = 'Улаанбадрах сум',
  DORN_GOV_KHATANBULAG = 'Хатанбулаг сум',
  DORN_GOV_KHUVSGUL = 'Хөвсгөл сум',
  DORN_GOV_ERDEN = 'Эрдэнэ Сум',
  DORNOD_CHOIBALSAN = 'Чойбалсан хот',
  DORNOD_BAYANDUN = 'Баяндун сум',
  DORNOD_BAYANTUMEN = 'Баянтүмэн сум',
  DORNOD_BAYAN_UUL = 'Баян-Уул Сум',
  DORNOD_BULGAN = 'Булган Сум, Дорнод',
  DORNOD_GURVANZAGAL = 'Гурванзагал сум',
  DORNOD_DASHBALBAR = 'Дашбалбар сум',
  DORNOD_MATAD = 'Матад сум',
  DORNOD_SERGELAN = 'Сэргэлэн сум',
  DORNOD_KHALKHGOL = 'Халхгол сум',
  DORNOD_HOLONBUYR = 'Хөлөнбуйр сум',
  DORNOD_KHERLEN = 'Хэрлэн сум',
  DORNOD_TSAGAAN_OVOO = 'Цагаан-Овоо сум',
  DORNOD_CHOYBALSAN_SUM = 'Чойбалсан сум',
  DORNOD_CHULUUNKHOROOT = 'Чулуунхороот сум',
  DUN_GOV_MANDALGOV = 'Мандалговь хот',
  DUN_GOV_ADAATSGAG = 'Адаацаг сум',
  DUN_GOV_BAYANJARGALAN = 'Баянжаргалан сум',
  DUN_GOV_GOV_UGTAAL = 'Говь-Угтаал сум',
  DUN_GOV_GURVANSAIKHAN = 'Гурвансайхан сум',
  DUN_GOV_DELGERSAUM = 'Дэлгэрхангай сум',
  DUN_GOV_DELGERTSOGT = 'Дэлгэрцогт сум',
  DUN_GOV_DEREN = 'Дэрэн сум',
  DUN_GOV_LUUS = 'Луус сум',
  DUN_GOV_OLZIYT = 'Өлзийт Сум, Дундговь',
  DUN_GOV_ONDERSHIL = 'Өндөршил сум',
  DUN_GOV_SAYNTSAGAAN = 'Сайнцагаан сум',
  DUN_GOV_SAIKHAN_OVOO = 'Сайхан-Овоо сум',
  DUN_GOV_HULD = 'Хулд сум',
  DUN_GOV_TSAGAANDELGER = 'Цагаандэлгэр сум',
  DUN_GOV_ERDENEDALAI = 'Эрдэнэдалай сум',
  ZAVKHAN_ULIASTAI = 'Улиастай хот',
  ZAVKHAN_ALDARKHAAN = 'Алдархаан сум',
  ZAVKHAN_ASGAT = 'Асгат сум',
  ZAVKHAN_BAYANTES = 'Баянтэс сум',
  ZAVKHAN_BAYANKHAIRKHAN = 'Баянхайрхан сум',
  ZAVKHAN_DORVOLJIN = 'Дөрвөлжин сум',
  ZAVKHAN_ZAVKHANMANDAL = 'Завханмандал сум',
  ZAVKHAN_IDER = 'Идэр сум',
  ZAVKHAN_IX_UUL = 'Их-Уул сум',
  ZAVKHAN_NOMROG = 'Нөмрөг сум',
  ZAVKHAN_OTGON = 'Отгон сум',
  ZAVKHAN_SANTMARGAZ = 'Сантмаргаз сум',
  ZAVKHAN_SONGINO = 'Сонгино сум',
  ZAVKHAN_TOSONTSENGEL = 'Тосонцэнгэл сум',
  ZAVKHAN_TUDEVTAY = 'Түдэвтэй сум',
  ZAVKHAN_TELMEN = 'Тэлмэн сум',
  ZAVKHAN_TES = 'Тэс сум',
  ZAVKHAN_URGAMAL = 'Ургамал сум',
  ZAVKHAN_TSAGAANKHAIRKHAN = 'Цагаанхайрхан сум',
  ZAVKHAN_TSAGAANCHULUUT = 'Цагаанчулуут сум',
  ZAVKHAN_TSETSEN_UUL = 'Цэцэн-Уул сум',
  ZAVKHAN_SHILUUSTEI = 'Шилүүстэй сум',
  ZAVKHAN_ERDENEKHAIRKHAN = 'Эрдэнэхайрхан сум',
  ZAVKHAN_YARUU = 'Яруу сум',
  ORKHON_ERDENET = 'Эрдэнэт хот',
  ORKHON_BAYAN_ONDOR = 'Баян-Өндөр Сум',
  ORKHON_JARGALANT = 'Жаргалант Сум, Орхон',
  OVORKHANGAI_ARVAIKHEER = 'Арвайхээр хот',
  OVORKHANGAI_BARUUNBAYAN_ULAAN = 'Баруунбаян-Улаан сум',
  OVORKHANGAI_BAT_OLZII = 'Бат-Өлзий сум',
  OVORKHANGAI_BAYANGOL = 'Баянгол сум',
  OVORKHANGAI_BAYAN_ONDOR = 'Баян-Өндөр Сум, Өвөрхангай',
  OVORKHANGAI_BOGD = 'Богд Сум',
  OVORKHANGAI_BURD = 'Бүрд сум',
  OVORKHANGAI_GUCHIN_US = 'Гучин-Ус сум',
  OVORKHANGAI_ESONZUUIL = 'Есөнзүйл сум',
  OVORKHANGAI_ZUUNBAYAN_ULAAN = 'Зүүнбаян-Улаан сум',
  OVORKHANGAI_NARIINTAL = 'Нарийнтээл сум',
  OVORKHANGAI_OLZII = 'Өлзийт Сум, Өвөрхангай',
  OVORKHANGAI_SANT = 'Сант сум',
  OVORKHANGAI_TARAGT = 'Тарагт сум',
  OVORKHANGAI_TOGROG = 'Төгрөг Сум',
  OVORKHANGAI_UYANGA = 'Уянга сум',
  OVORKHANGAI_KHAIRKHANDULAAN = 'Хайрхандулаан сум',
  OVORKHANGAI_KHARKHORIN = 'Хархорин сум',
  OVORKHANGAI_KHUJIRT = 'Хужирт сум',
  OMNOGOV_DALANZADGAD = 'Даланзадгад хот',
  OMNOGOV_BAYANDALAI = 'Баяндалай сум',
  OMNOGOV_BAYAN_OVOO = 'Баян-Овоо Сум',
  OMNOGOV_BULGAN = 'Булган сум, Өмнөговь',
  OMNOGOV_GURVANTES = 'Гурвантэс сум',
  OMNOGOV_MANDAL_OVOO = 'Мандал-Овоо сум',
  OMNOGOV_MANLAI = 'Манлай сум',
  OMNOGOV_NOYON = 'Ноён сум',
  OMNOGOV_NOMGON = 'Номгон сум',
  OMNOGOV_SEVREY = 'Сэврэй сум',
  OMNOGOV_KHANBOGD = 'Ханбогд сум',
  OMNOGOV_KHANHONGOR = 'Ханхонгор сум',
  OMNOGOV_KHURMEN = 'Хүрмэн сум',
  OMNOGOV_TSAGAAN_OVOO = 'Цагаан-Овоо Сум',
  OMNOGOV_TSOGTCETSIY = 'Цогтцэций сум',
  SUKHBATAAR_BARUUN_URT = 'Баруун-Урт хот',
  SUKHBATAAR_ASGAT = 'Асгат Сум',
  SUKHBATAAR_BAYANDELGER = 'Баяндэлгэр сум',
  SUKHBATAAR_DARIIGANGA = 'Дарьганга сум',
  SUKHBATAAR_MONKHAAN = 'Мөнххаан сум',
  SUKHBATAAR_NARAN = 'Наран сум',
  SUKHBATAAR_ONGON = 'Онгон сум',
  SUKHBATAAR_SUKHBATAAR = 'Сүхбаатар сум',
  SUKHBATAAR_TUVSHINSHIREET = 'Түвшинширээ сум',
  SUKHBATAAR_TUMENTSOGT = 'Түмэнцогт сум',
  SUKHBATAAR_UULBAYAN = 'Уулбаян сум',
  SUKHBATAAR_KHALZAN = 'Халзан сум',
  SUKHBATAAR_ERDENETSGAAN = 'Эрдэнэцагаан сум',
  SELNGE_SELENGE = 'Сүхбаатар хот',
  SELNGE_ALTANBULAG = 'Алтанбулаг сум',
  SELNGE_BARUUNBUREN = 'Баруунбүрэн сум',
  SELNGE_BAYANGOL = 'Баянгол Сум',
  SELNGE_EROO = 'Ерөө сум',
  SELNGE_JAVHLANT = 'Жавхлант сум',
  SELNGE_ZUUNBUREN = 'Зүүнбүрэн сум',
  SELNGE_MANDAL = 'Мандал сум',
  SELNGE_ORKHON = 'Орхон сум, Сэлэнгэ',
  SELNGE_ORHONTUUL = 'Орхонтуул сум',
  SELNGE_SAIKHAN = 'Сайхан Сум',
  SELNGE_SANT = 'Сант Сум',
  SELNGE_TUSHIG = 'Түшиг сум',
  SELNGE_KHUSHAAT = 'Хушаат сум',
  SELNGE_KHUYAGAA = 'Хүдэр сум',
  SELNGE_TSAGAANNUR = 'Цагааннуур Сум',
  SELNGE_SHAAMAR = 'Шаамар сум',
  TUV_ZUUNMOD = 'Зуунмод хот',
  TUV_ALTANBULAG = 'Алтанбулаг Сум',
  TUV_ARGALANT = 'Аргалант сум',
  TUV_ARKHUST = 'Архуст сум',
  TUV_BATSUMBER = 'Батсүмбэр сум',
  TUV_BAYAN = 'Баян сум',
  TUV_BAYANDELGER = 'Баяндэлгэр Сум',
  TUV_BAYANJARGALAN = 'Баянжаргалан Сум',
  TUV_BAYAN_ONTSUUL = 'Баян-Өнжүүл сум',
  TUV_BAYANKHANGAI = 'Баянхангай сум',
  TUV_BAYANTSAGAAN = 'Баянцагаан Сум',
  TUV_BAYANTSOGT = 'Баянцогт сум',
  TUV_BAYANCHANDMAN = 'Баянчандмань сум',
  TUV_BORNUUR = 'Борнуур сум',
  TUV_BUREN = 'Бүрэн сум',
  TUV_DELGERKHAAN = 'Дэлгэрхаан сум',
  TUV_JARGALANT = 'Жаргалант Сум, Төв',
  TUV_ZAAMAR = 'Заамар сум',
  TUV_LUN = 'Лүн сум',
  TUV_MONGONMORIT = 'Мөнгөнморьт сум',
  TUV_ONDERKHITEV = 'Өндөрширээт сум',
  TUV_SUMBER = 'Сүмбэр Сум',
  TUV_SERGELEN = 'Сэргэлэн Сум',
  TUV_UGTAAL_TSAIDAM = 'Угтаалцайдам сум',
  TUV_TSEL = 'Цээл Сум',
  TUV_ERDEN = 'Эрдэнэ Сум, Төв',
  TUV_ERDENESANT = 'Эрдэнэсант сум',
  UVS_ULAANGOM = 'Улаангом хот',
  UVS_BARUUNTURUUN = 'Баруунтуруун сум',
  UVS_BOKHMORON = 'Бөхмөрөн сум',
  UVS_DAVST = 'Давст сум',
  UVS_ZAVKHAN = 'Завхан сум',
  UVS_ZUUNGOV = 'Зүүнговь сум',
  UVS_ZUUNKHANGAI = 'Зүүнхангай сум',
  UVS_MALCHIN = 'Малчин сум',
  UVS_NARANBULAG = 'Наранбулаг сум',
  UVS_OLGII = 'Өлгий сум',
  UVS_OMNOGOV = 'Өмнөговь сум',
  UVS_ONDERKHANGAI = 'Өндөрхангай сум',
  UVS_SAGIL = 'Сагил сум',
  UVS_TARIALAN = 'Тариалан сум',
  UVS_TURGEN = 'Түргэн сум',
  UVS_TES = 'Тэс Сум',
  UVS_KHOVD = 'Ховд сум',
  UVS_KHARGAS = 'Хяргас сум',
  UVS_TSAGAANKHAIRKHAN = 'Цагаанхайрхан Сум',
  KHOVD_ALTAI = ' Алтай сум',
  KHOVD_BULGAN = ' Булган сум',
  KHOVD_BUYANT = ' Буянт сум',
  KHOVD_DARVI = ' Дарви сум',
  KHOVD_DORGN = 'Дөргөн сум',
  KHOVD_DUUT = 'Дуут сум',
  KHOVD_JARGALANT = ' Жаргалант сум',
  KHOVD_ZEREG = ' Зэрэг сум',
  KHOVD_MANKHAN = ' Манхан сум',
  KHOVD_MONKHHAIRKHAN = ' Мөнххайрхан сум',
  KHOVD_MUST = ' Мөст сум',
  KHOVD_MYANGAD = ' Мянгад сум',
  KHOVD_UENCH = ' Үенч сум',
  KHOVD_HOVD = ' Ховд сум',
  KHOVD_TSETSEG = ' Цэцэг сум',
  KHOVD_CHANDMAN = ' Чандмань сум',
  KHOVD_ERDENEBUREN = ' Эрдэнэбүрэн сум',
  KHUVSGUL_ALAG_ERDEN = 'Алаг-Эрдэнэ сум',
  KHUVSGUL_ARBULAG = 'Арбулаг сум',
  KHUVSGUL_BAYANZURKH = 'Баянзүрх сум',
  KHUVSGUL_BURENTOGTOH = 'Бүрэнтогтох сум',
  KHUVSGUL_GALT = 'Галт сум',
  KHUVSGUL_JARGALANT = 'Жаргалант сум, Хөвсгөл',
  KHUVSGUL_IX_UUL = ' Их-Уул сум',
  KHUVSGUL_MORON = 'Мөрөн сум',
  KHUVSGUL_RASHAANT = ' Рашаант сум',
  KHUVSGUL_RENCHINLHUMBE = 'Рэнчинлхүмбэ сум',
  KHUVSGUL_TARIALAN = ' Тариалан сум',
  KHUVSGUL_TOSONTSENGEL = ' Тосонцэнгэл сум',
  KHUVSGUL_TOMORBULAG = 'Төмөрбулаг сум',
  KHUVSGUL_TUNEL = 'Түнэл сум',
  KHUVSGUL_ULAAN_UUL = 'Улаан-Уул сум',
  KHUVSGUL_KHANH = 'Ханх сум',
  KHUVSGUL_KHATGAL = 'Хатгал сум',
  KHUVSGUL_TSAGAANNUR = ' Цагааннуур сум',
  KHUVSGUL_TSAGAAN_UUL = 'Цагаан-Уул сум',
  KHUVSGUL_TSAGAAN_UUR = 'Цагаан-Үүр сум',
  KHUVSGUL_TSETSERLEG = ' Цэцэрлэг сум',
  KHUVSGUL_CHANDMAN_ONDOR = 'Чандмань-Өндөр сум',
  KHUVSGUL_SHINE_IDER = 'Шинэ-Идэр сум',
  KHUVSGUL_ERDENEBULGAN = ' Эрдэнэбулган сум',
  KHENTII_CHINGGIS = 'Чингис хот',
  KHENTII_BATNOROV = 'Батноров сум',
  KHENTII_BATSHIREET = 'Батширээт сум',
  KHENTII_BAYAN_ADARGA = 'Баян-Адарга сум',
  KHENTII_BAYANMONKH = 'Баянмөнх сум',
  KHENTII_BAYAN_OVOO = ' Баян-Овоо сум',
  KHENTII_BAYANHUTAG = 'Баянхутаг сум',
  KHENTII_BINDER = 'Биндэр сум',
  KHENTII_BOR_ONDOR = 'Бор-Өндөр сум',
  KHENTII_GALSHAR = 'Галшар сум',
  KHENTII_DADAL = 'Дадал сум',
  KHENTII_DARKHAN = ' Дархан сум',
  KHENTII_DELGERKHAAN = ' Дэлгэрхаан сум',
  KHENTII_JARGALTKHAAN = 'Жаргалтхаан сум',
  KHENTII_MORON = ' Мөрөн сум',
  KHENTII_NOROVLIN = 'Норовлин сум',
  KHENTII_UMNUDELGER = 'Өмнөдэлгэр сум',
  KHENTII_KHERLEN = ' Хэрлэн сум',
  KHENTII_TSENKHERMANDAL = 'Цэнхэрмандал сум',
}
