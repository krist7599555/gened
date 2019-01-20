import _ from "lodash";

interface Info {
  th: string;
  en: string;
  up: string;
  sht: string;
  num: number;
}

const gened: Info[] = [
  {
    th: "สังคมศาสตร์",
    en: "so",
    up: "SO",
    sht: "สังคม",
    num: 1
  },
  {
    th: "มนุษยศาสตร์",
    en: "hu",
    up: "HU",
    sht: "มนุษย์​",
    num: 2
  },
  {
    th: "วิทยาศาสตร์-คณิตศาสตร์",
    en: "sci",
    up: "SCI",
    sht: "วิทย์",
    num: 3
  },
  {
    th: "สหศาสตร์",
    en: "in",
    up: "IN",
    sht: "สหฯ",
    num: 4
  },
  {
    th: "ภาษาต่างประเทศ",
    en: "lang",
    up: "LANG",
    sht: "ภาษา",
    num: 5
  }
];

const days: Info[] = [
  {
    th: "จันทร์",
    en: "monday",
    sht: "mo",
    up: "MO",
    num: 1
  },
  {
    th: "อังคาร",
    en: "tuesday",
    sht: "tu",
    up: "TU",
    num: 2
  },
  {
    th: "พุธ",
    en: "wednesday",
    sht: "we",
    up: "WE",
    num: 3
  },
  {
    th: "พฤหัสบดี",
    en: "thursday",
    sht: "th",
    up: "TH",
    num: 4
  },
  {
    th: "ศุกร์",
    en: "friday",
    sht: "fr",
    up: "FR",
    num: 5
  }
];

export const multimapping = (ar: any) =>
  _.assign(
    {},
    ..._.chain(ar)
      .map(v => _.values(v).map(atr => ({ [atr]: v })))
      .flatten()
      .value()
  );

export const DAYS = multimapping(days);
export const GENED = multimapping(gened);

export const BUILDING = {
  ANAND: "ตึกอานันทมหิดล ANANDHAMAHIDOL",
  ANAT: "ตึกกายวิภาคศาสตร์ ANATOMY",
  APAN: "ตึกอภันตรีปชา APANTRIPACHA",
  AR: "AR AR",
  ARCH: "ตึกคณะสถาปัตยกรรมศาสตร์ ARCHITECTURE",
  ARCH1: "อาคารสถาปัตยกรรม 1 ARCHITECTURE 1",
  ARCH2: "อาคารสถาปัตยกรรม 2 ARCHITECTURE 2",
  ARTS2: "ตึก 2 ARTS 2",
  ARTS4: "ตึก 4 ARTS 4",
  BANGK: "ตึกธนาคารกรุงเทพ BANGKOK BANK",
  BHPR: "ตึก ภ.ป.ร. BHOR POR ROR",
  BHUMI: "ภูมิสิริมังคลานุสรณ์ BHUMISIRIMANGALANUSORN",
  BIO1: "ตึกชีววิทยา 1 BIOLOGY 1",
  BOT: "ตึกพฤกษศาสตร์ BOTANY",
  BRK: "อาคารบรมราชกุมารี BOROMRAJAKUMARI BUILDING",
  BSB: "อาคารบรมราชชนนีศรีศตพรรษ BOROMMARATCHONNANI SRISATAPHAT BUILDING",
  BSB2: "อาคารบรมราชชนนีศรีศตพรรษ BOROMMARATCHONNANI SRISATAPHAT BUILDING",
  CAMP: "ค่ายฝึกสำรวจ SURVEYING CAMP",
  CAR: "สถาบันวิทยบริการ CENTER OF ACADEMIC RESOURCES",
  CART1: "ตึก 1 COMMUNICATION ARTS 1",
  CART2: "ตึก 2 COMMUNICATION ARTS 2",
  CE: "ภาควิชาวิศวกรรมโยธา CIVIL ENGINEERING DEPARTMENT",
  CELAB: "ตึกปฏิบัติการภาควิชาวิศวกรรมโยธา CIVIL ENGINEERING LABORATORY",
  CHALE: "อาคารเฉลิมราชกุมารี 60 พรรษา CHALERM RAJAKUMARI 60",
  CHAN: "โรงพยาบาลพระปกเกล้าจันทบุรี PRAPOKKLAO CHANTHABURI HOSPITAL",
  CHANT: "จันทนยิ่งยง CHANTANAYINGYONG",
  CHARO: "ตึกเจริญ-สมศรี เจริญรัชต์ภาคย์ CHAROEN-SOMSRI CHAROENRAJAPARK",
  CHE: "ตึกภาควิชาวิศวกรรมเคมี CHEMICAL ENGINEERING DEPARTMENT",
  CHEM1: "ตึกเคมี 1 CHEMISTRY I",
  CHEM2: "ตึกเคมี 2 CHEMISTRY II",
  CHEM3: "ตึกเคมี 3 CHEMISTRY III",
  CHEMT: "ตึกเคมีเทคนิค CHEMICAL TECHNOLOGY",
  CHLAB: "ตึกภาควิชาวิศวกรรมเคมี CHEMICAL ENGINEERING LABORATORY",
  CHMSQ:
    "จัตุรัสจามจุรี ชั้น 14 ธุรกิจเทคโนโลยีและการจัดการนวัตกรรม CHAMCHURI SQUARE F14 TIP",
  CHOL: "โรงพยาบาลชลบุรี CHOLBURI HOSPITAL",
  CHOM1: "ชมพูภูคา1 CHOMPOOPHUKA1",
  CHONG: "ตึกจงกลณี CHONGKOLNEE",
  CHUHO:
    "โรงพยาบาลจุฬาภรณ์ (ศูนย์โรคลมชัก สถาบันวิจัยจุฬาภรณ์) CHULABHORN HOSPITAL",
  CHUL: "ตึกจุลจักรพงษ์ CHULACHAKRAPONG BUILDING",
  CHULA: "จุฬาภรณ์ CHULABHORN",
  CHULM: "ตึกจุลจักรพงษ์ CHULACHAKRAPONGSE",
  CHUMP: "ตึกจุมภฎพงษ์บริพัตร ภาควิชาจักษุวิทยา CHUMPORTPONGBORIPAT",
  CIVIL: "วิศวกรรมโยธา ENGINEERNING DEPARTMENT",
  COM1: "อาคารไชยยศสมบัติ 1 CHAIYOSSOMBAT 1",
  COM2: "อาคารไชยยศสมบัติ 2 CHAIYOSSOMBAT 2",
  COM3: "อาคารไชยยศสมบัติ 3 CHAIYOSSOMBAT 3",
  COM4: "อาคาร 4 COMMERCE AND ACCOUNTANCY 4",
  COM5: "อาคาร 5 COMMERCE AND ACCOUNTANCY 5",
  COM7: "อาคาร 7 COMMERCE AND ACCOUNTANCY 7",
  COM8: "อาคาร 8 (อนุสรณ์ 50 ปี) COMMERCE AND ACCOUNTANCY 8 : 50 YEAR ANUSORN",
  COM9: "อาคาร 9 COMMERCE AND ACCOUNTANCY 9",
  COMP: "ตึกคอมพิวเตอร์ COMPUTER ENGINEERING",
  CU14A: "จุฬาพัฒน์ 14 (คณะสหเวชศาสตร์) CHULAPAT 14 (ALLIED HEALTH SCIENCE)",
  CU14S: "จุฬาพัฒน์ 14 CHULAPAT 14",
  CUE4:
    "โรงเรียนสาธิตจุฬาลงกรณ์มหาวิทยาลัย (ฝ่ายมัธยม) CHULALONGKORN UNIVERSITY DEMONSTRATION SECONDARY SCHOOL",
  CUP10: "จุฬาพัฒน์ 10 CHULAPAT 10",
  CUP12: "จุฬาพัฒน์ 12 CHULAPAT 12",
  CUP13: "จุฬาพัฒน์ 13 CHULAPAT 13",
  CUP1A: "อาคารจุฬาพัฒน์ 1(คณะสหเวชศาสตร์) CHULAPAT1(ALLIED HEALTH SCIENCES)",
  CUP2: "จุฬาพัฒน์ 2 CHULAPAT 2",
  CUP2A: "อาคารจุฬาพัฒน์ 2 (คณะสหเวชศาสตร์) CHULAPAT 2 (ALLIED HEALTH SCIENCE)",
  CUP3A: "อาคารจุฬาพัฒน์3 (คณะสหเวชศาสตร์) CHULAPAT3(ALLIED HEALTH SCIENCE)",
  CUP4: "จุฬาพัฒน์ 4 CHULAPAT 4",
  CUP4A: "อาคารจุฬาพัฒน์ 4(คณะสหเวชศาสตร์) CHULAPAT 4(ALLIED HEALTH SCIENCES)",
  CUP5: "จุฬาพัฒน์ 5 CHULAPAT 5",
  CUP5N: "จุฬาพัฒน์5 (คณะพยาบาลศาสตร์) CHULAPAT5 (NURSING)",
  CUP5P: "จุฬาพัฒน์ 5 (คณะจิตวิทยา) CHULAPAT 5 (PSYCHOLOGY)",
  CUP7: "อาคารจุฬาพัฒน์7 CHULAPAT7 BUILDING",
  CUP8: "อาคารจุฬาพัฒน์8 CHULAPAT8",
  CUSC:
    "ศูนย์กีฬาแห่งจุฬาลงกรณ์มหาวิทยาลัย CHULALONGKORN UNIVERSITY SPORTS CENTER",
  CUSCS:
    "สระว่ายน้ำ ศูนย์กีฬาแห่งจุฬาลงกรณ์มหาวิทยาลัย CU SPORTCENTER SWIMMIN POOL",
  CUSCT:
    "สนามเทนนิส ศูนย์กีฬาแห่งจุฬาลงกรณ์มหาวิทยาลัย CU SPORTSCENTER TENNIS COURT",
  CUSTA: "สนามกีฬาจุฬาลงกรณ์มหาวิทยาลัย CU STADUIM",
  CUW1: "จุฬาวิชช์ 1 CHULAWIT 1",
  DEN14: "ตึก 14 DENTISTRY 14",
  DEN15: "ตึกสมเด็จย่า 93 ปี SOMDEJYA 93",
  DEN16: "อาคารทันตแพทยศาสตร์เฉลิมนวมราช80 CHALERMNAWAMARAJ",
  DENT1: "ตึก 1 DENTISTRY 1",
  DENT2: "ตึก 2 DENTISTRY 2",
  DENT3: "ตึก 3 DENTISTRY 3",
  DENT4: "ตึก 4 DENTISTRY 4",
  DENT5: "ตึก 5 DENTISTRY 5",
  DENT6: "ตึก 6 DENTISTRY 6",
  DENT7: "ตึก 7 DENTISTRY 7",
  DENT8: "ตึก 8 DENTISTRY 8",
  DHAMA: "ตึกธรรมสถาน DHAMASATHAN BUILDING",
  ECON: "ตึกคณะ FACULTY OF ECONOMICS",
  EDL: "ตึกปฏิบัติการออกแบบวงจรอิเล็กทรอนิกส์ ELECTRONIC DESIGN LABORATORY",
  EDU1: "ตึก 1 EDUCATION 1",
  EDU2:
    "ตึก 2 (อาคารพระมิ่งขวัญการศึกษาไทย) EDUCATION 2 (PHARMINGKHWANKARNSUKSATHAI)",
  EDU3: "ตึก 3 EDUCATION 3",
  EDU4: "ตึก 4 EDUCATION 4",
  EDU6: "ตึก 6 EDUCATION 6",
  EDU7: "ตึก 7 EDUCATION 7",
  EDU8: "ตึก 8 EDUCATION 8",
  EDU9: "ตึก 9 (Satit) EDUCATION 9 (SATIT)",
  EE: "ตึกวิศวกรรมไฟฟ้า ELECTRICAL ENGINEERING",
  EELAB: "ตึกภาควิชาวิศวกรรมไฟฟ้า ELECTRICAL ENGINEERING LABORATORY",
  EN100: "ตึก 100 ปี ENGINEERING 100 YEARS ANNIVERSARY",
  ENG1: "ตึก 1 ENGINEERING 1",
  ENG2: "ตึก 2 ENGINEERING 2",
  ENG3: "ตึก 3 ENGINEERING 3",
  ENG4: "ตึก 4 ENGINEERING 4",
  ENG5: "ตึก 5 ENGINEERING 5",
  ENV: "ตึกวิศวกรรมสิ่งแวดล้อม ENVIRONMENTAL ENGINEERING",
  FA3: "ตึกคณะศิลปกรรมศาสตร์ 3 FACULTY OF FINE AND APPLIED ARTS 3",
  FA4: "ตึกคณะศิลปกรรมศาสตร์ 4 FACULTY OF FINE APPLIED ARTS 4",
  FAA1: "ตึกศิลปกรรมศาสตร์ 1 FACULTY OF FINE AND APPLIED ARTS 1",
  FAA2: "ตึกศิลปกรรมศาสตร์ 2 FACULTY OF FINE AND APPLIED ARTS 2",
  FOOD: "ตึกเทคโนโลยีทางอาหาร FOOD TECHNOLOGY",
  FOREN: "ตึกนิติเวชศาสตร์ FORENSIC SCIENCE",
  GEM: "อาคารวิจัยและตรวจสอบอัญมณี GEMMOLOGICAL RESEARCH AND TESTING BUILDING",
  GENSC: "ตึกวิทยาศาสตร์ทั่วไป GENERAL SCIENCE",
  GEO: "ตึกธรณีวิทยา GEOLOGY",
  GEW: "ตึกเกเวอร์ท GEWERTZ",
  HANS:
    "ตึกภาควิชาวิศวกรรมเครื่องกล (ฮันส์ บันตสิ) MECHANICAL ENGINEERING (HANS BUILDING)",
  HEAL2: "อาคาร 2 มหาวิทยาลัยศรีนครินทรวิโรฒ HEALT SCIENCE (2)",
  HEAL3: "อาคารบริหารและเทคนิคการแพทย์ HEALT SCIENCE 3",
  HEAL4: "อาคาร 4 มหาวิทยาลัยศรีนครินทรวิโรฒ HEALT SCIENCE (4)",
  HV: "ตึกไฟฟ้าแรงสูง HIGH VOLTAGE",
  HVLAB: "ตึกไฟฟ้าแรงสูง HIGH VOLTAGE LABORATORY",
  IA: "IA IA",
  ID: "ตึกภาควิชาออกแบบอุตสาหกรรม DEPARTMENT OF INDUSTRIAL DESIGN",
  IE: "ตึกวิศวกรรมอุตสาหการ INDUSTRIAL ENGINEERING",
  IELAB: "ตึกภาควิชาวิศวกรรมอุตสาหการ INDUSTRIAL ENGINEERING LABORATORY",
  IN2ER:
    "อาคารสถาบัน 2, สถาบันวิจัยสภาวะแวดล้อม INSTITUTE 2, ENVIRONMENTAL RESEARCH INSTITUTE",
  INST2:
    "อาคารสถาบัน2 (วิทยาลัยวิทยาศาสตร์สาธารณสุข) INSTITUTE BUILDING2 (CILLEGE OF PUBLIC HEALTH SCIENCES)",
  INST3:
    "อาคารสถาบัน 3 (วิทยาลัยวิทยาศาสตร์สาธารณสุข) INSTITUTE BUILDING 3 (COLLEGE OF PUBLIC HEALTH SCIENCES)",
  JIRA: "ตึกจิรประวัติ JIRAPRAWAT",
  KKKKK: "kk KK",
  KUMKL:
    "อาคารคุ้มเกล้า โรงพยาบาลภูมิพล กรมการแพทย์ทหารอากา KUMKLAO, PHUMIPHOL HOSPITAL",
  LERT: "อาคารเลิศ อุรัสยะนันทน์ LERT URASYANUNT",
  MAHAV: "อาคารมหาวชิราวุธ MAHA VAJIRAVUDH BUILDING",
  MAHIT: "อาคารมหิตลาธิเบศร MAHITALADHIBESRA",
  MATH: "ตึกคณิตศาสตร์ MATHEMATICS",
  MATSC: "ตึกวัสดุศาสตร์ MATERIAL SCIENCE",
  MCS: "มหาจักรีสิรินธร MAHACHAKRISIRINDHORN",
  MED: "ตึกอายุรศาสตร์ MEDICINE",
  MED14: "ตึกเวชศาสตร์ชันสูตร MEDICINE 14 OR LABORATORY MEDICINE",
  MELB1: "ตึกฮันส์ บันตลิ HANS BUNTLI",
  MELB2: "ตึกปฏิบัติการเครื่องกล 2 MECHANICAL ENGINEERING LABORATORY 2",
  MHMK: "อาคารมหามกุฎ MAHAMAKUT BUILDING",
  MHVH: "มหาวชิรุณหิศ MAHA VAJIRUNHIS",
  MICRO: "ตึกจุลชีววิทยา MICROBIOLOGY",
  MKSW: "มงกุฎสมมติวงศ์ MONGKUTSAMATIWONG",
  MNBLD:
    "ตึกภาควิชาวิศวกรรมเหมืองแร่และปิโตรเลียม MINING AND PETROLEUM ENGINEERING",
  MTBLD: "ตึกภาควิชาวิศวกรรมโลหการ MATALLURGICAL ENGINEERING",
  NARA: "นราธิปพงศ์ประพันธ์-สุพิณ NARADHIPPONG PRAPHAN-SUPIN",
  NART: "อาคารนารถ โพธิประสาท NART POTIPRASART",
  NIGHT: "ตึกไนติงเกล - โอลิมปิก NIGHTINGALE - OLYMPIC",
  NT: "ตึกนิวเคลียร์ NUCLEAR TECHNOLOGY BUILDING",
  "O.P.R": "อปร. OR POR ROR",
  OBROM: "ตึกอบรมวิชาการ OBROMWICHAKARN",
  OGR:
    "ตึกภาควิชาสูติศาสตร์ เธนุเวชวิทยาและวิทยาการสืบพันธุ์ OBSTETRICS GYNAECOLOGY AND REPRODUCTION",
  OSOT:
    "สถานปฎิบัติการเภสัชกรรมชุมชน(โอสถศาลา) COMMUNITY PHARMACY LABORATORY (OSOTSARA) BLD.",
  PADTA: "แพทยพัฒน์ PADTAYAPATANA",
  PATH: "ตึกพยาธิวิทยา PATHOLOGY",
  PETAN: "สนามเปตอง PETANQUE YARD",
  PHA80: "ตึก 80 ปีเภสัชศาสตร์ 80 YEAR PHARMACY BLD.",
  PHAIN: "อาคารนวัตกรรมทางเภสัชศาสตร์ PHARMACY INNOVATION BLD.",
  PHANT: "ตึกพันธุ์ทิพย์ PHANTIP",
  PHAR: "ตึกคณะ FACULTY OF PHARMACEUTICAL SCIENCES",
  PHOTO:
    "ตึกวิทยาศาสตร์ทางภาพถ่ายและเทคโนโลยีทางการพิมพ์ PHOTOGRAPHIC SCIENCE AND PRINTING TECHNOLOGY",
  PHYS1: "ตึกฟิสิกส์ 1 PHYSICS 1",
  PINIT: "พินิตประชานาถ PHINITPRACHANAT",
  POL1: "ตึก 1 POLITICAL SCIENCE 1",
  POL2: "ตึก 2 POLITICAL SCIENCE 2",
  POL3: "ตึก 3 POLITICAL SCIENCE 3",
  POSA: "ตึกโปษยานนท์ POSAYANOND",
  PRAJ2: "อาคารประชาธิปก-รำไพพรรณี PRAJADHIPOK-RAMPHAI BARNI",
  PRAJ7: "อาคารประชาธิปก-รำไพพรรณี PRAJADHIPOK-RAMPHAI BARNI",
  PRAJ8: "ประชาธิปก-รำไพพรรณี PRAJADHIPOK-RAMPHAIBARNI",
  PRAJA: "อาคารประชาธิปก-รำไพพรรณี PRAJADHIPOK-RAMPHAI BARNI",
  PREML:
    "อาคารเปรมบุรฉัตร(สถาบันภาษา) PREM PURACHATRA BUILDING(LANGUAGE INSTUTUTE)",
  PREMP: "อาคารเปรมบุรฉัตร PREM PURACHATRA BUILDING",
  PREVM:
    "ตึกภาควิชาเวชศาสตร์ป้องกันและสังคม DEPARTMENT OF PREVENTIVE AND SOCIAL MEDICINE",
  PSY: "บรมราชชนนีศรีศตพรรษ BOROMMARATCHACHONNANISRISATTAPAT",
  PTUM5:
    "อาคาร 5 มหาวิทยาลัยศรีนครินทรวิโรฒ PTUM 5, SRI NAKHARINWIROT UNIVERSITY",
  PYSIO: "ตึกสรีรวิทยา PHYSIOLOGY",
  RANG: "ตึกหรั่งกันตารัติ RANG KANTARAT",
  "S.K": "ตึก ส.ก. H.M. QUEEN SIRIKIT",
  "S.T.C": "ศูนย์ฝึกนิสิต STUDENT TRAINING CENTER",
  SACT: "ตึกสถานศึกษาเคมีปฏิบัติ SCIENCE ANALYTICAL CHEMISTRY TRAINING",
  SALAB:
    "ตึกภาควิชาวิศวกรรมเครื่องกล (สลับ ลดาวัลย์) MECHANICAL BUILDING (SALAB LADAWAN)",
  SCI10: "ตึก 7 ชั้น SCIENCE 10",
  SCI25: "อาคารมหามกุฏ MAHA MAKUT BUILDING",
  SCI26: "อาคารคลังสารเคมี 0",
  SIRIN: "ตึกสิรินธร SIRINTHORN",
  SK: "ตึกสิริกิติ์ H.M. QUEEN SIRIKIT",
  SSWNB: "อาคารศึกษาวัฒนา SUKSAWATTANA BUILDING",
  SUKRI: "ตึกสุกรี - สุภา โพธิรัตนังกูร SUKRI - SUPA POOTHIRATTANANGKOON",
  SVAS: "สวัสดิ์-ล้อม โอสถานุเคราะห์ SVASTJ-LOM OSATHANUGRAH",
  SVBLD: "ตึกภาควิชาวิศวกรรมสำรวจ SURVEY ENGINEERING",
  TAB: "อาคารแถบ นีละนิธิ TAB NILANITI",
  TECHA: "ตึกเตชะไพบูลย์ TECHA - PAIBOON",
  THEB: "อาคารเทพทวาราวดี THEBTARAVADEE BUILDING",
  UPPA: "อาคารอุปการเวชกิจ UPPAKARNWEJJAKIJ",
  VCK1: "วิชชาคาม1 จ.น่าน ",
  VCK2: "วิชชาคาม2 จ.น่าน ",
  VET1: "ตึก 1 VETERINARY SCIENCE 1",
  VET2: "ตึก 2 VETERINARY SCIENCE 2",
  VET3: "ตึก 3 VETERINARY SCIENCE 3",
  VET4: "ตึก 4 VETERINARY SCIENCE 4",
  VET5: "ตึก 5 VETERINARY SCIENCE 5",
  VET6: "ตึก 6 VETERINARY SCIENCE 6",
  VIDF5:
    "วิทยพัฒนา ชั้น 5 บัณฑิตวิทยาลัย VIDHAYAPATTANA BUILDING F5 GRADUATE SCHOOL",
  VIDHA: "อาคารวิทยพัฒนา VIDHAYAPATTANA",
  VISID: "อาคารวิศิษฐ์ ประจวบเหมาะ VISID PRACHUABMOH",
  VOD: "อาคารโวฒยากร VODHYAKORN",
  VONG: "ตึกว่องวานิช VONGVANIT",
  VSID3: "อาคารวิศิษฐ์ ประจวบเหมาะ VISID PRACHUABMOH",
  VSID4: "อาคารวิศิษฐ์ ประจวบเหมาะ VISID PRACHUABMOH",
  WKB12: "วิทยกิตติ์/คณะพยาบาลศาสตร์ WITHAYAKIT/FACULTY OF NURSING",
  WKB13: "อาคารวิทยกิตต์ WITTHYAKIT BUILDING",
  WRLAB: "ห้องปฏิบัติการแหล่งน้ำ WATER RESOURCES LABORATORY",
  YIM3: "ยิมเนเซี่ยม 3 GYMNASIUM 3"
};

export default {
  GENED,
  DAYS,
  BUILDING
};
