export interface NewsItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  source: string;
  time: string;
  date: string;
  isBreaking: boolean;
  readTime: number;
  ageGroups: string[];
}

export const CATEGORIES = [
  { id: "economy", label: "Экономика", icon: "TrendingUp", count: 48 },
  { id: "politics", label: "Политика", icon: "Landmark", count: 31 },
  { id: "tech", label: "Технологии", icon: "Cpu", count: 57 },
  { id: "markets", label: "Рынки", icon: "BarChart2", count: 24 },
  { id: "energy", label: "Энергетика", icon: "Zap", count: 19 },
  { id: "law", label: "Право", icon: "Scale", count: 12 },
];

export const AGE_GROUPS = [
  {
    id: "kids",
    label: "7–16 лет",
    sublabel: "Школьники",
    icon: "BookOpen",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/10",
    description: "Новости о науке, природе, спорте и открытиях — простым языком",
  },
  {
    id: "youth",
    label: "17–25 лет",
    sublabel: "Молодёжь",
    icon: "Rocket",
    color: "text-sky-400",
    border: "border-sky-400/30",
    bg: "bg-sky-400/10",
    description: "Технологии, карьера, образование и тренды",
  },
  {
    id: "adult",
    label: "25–45 лет",
    sublabel: "Взрослые",
    icon: "Briefcase",
    color: "text-amber",
    border: "border-amber/30",
    bg: "bg-amber/10",
    description: "Экономика, бизнес, политика и право",
  },
  {
    id: "senior",
    label: "45–99 лет",
    sublabel: "Старшее поколение",
    icon: "Heart",
    color: "text-rose-400",
    border: "border-rose-400/30",
    bg: "bg-rose-400/10",
    description: "Здоровье, социальная политика, пенсии и культура",
  },
];

export const SOURCES = ["РБК", "Ведомости", "Коммерсантъ", "Forbes Russia", "Интерфакс"];

export const NEWS: NewsItem[] = [
  {
    id: 1,
    category: "economy",
    title: "ЦБ сохранил ключевую ставку на уровне 16% на фоне замедления инфляции",
    excerpt: "Банк России принял решение сохранить ключевую ставку на заседании в апреле. Регулятор отметил признаки торможения потребительских цен.",
    source: "РБК",
    time: "14:32",
    date: "2026-04-05",
    isBreaking: true,
    readTime: 3,
    ageGroups: ["adult", "senior"],
  },
  {
    id: 2,
    category: "tech",
    title: "Яндекс анонсировал новую языковую модель для корпоративного сектора",
    excerpt: "Компания представила YandexGPT Enterprise — версию для бизнеса с расширенной защитой данных и локальным развёртыванием.",
    source: "Ведомости",
    time: "12:15",
    date: "2026-04-05",
    isBreaking: false,
    readTime: 4,
    ageGroups: ["youth", "adult"],
  },
  {
    id: 3,
    category: "markets",
    title: "Индекс МосБиржи вырос на 1,8% по итогам торговой сессии",
    excerpt: "Российский рынок акций продемонстрировал уверенный рост. Лидерами стали бумаги энергетического и металлургического секторов.",
    source: "Интерфакс",
    time: "19:00",
    date: "2026-04-04",
    isBreaking: false,
    readTime: 2,
    ageGroups: ["adult", "senior"],
  },
  {
    id: 4,
    category: "politics",
    title: "Государственная Дума приняла поправки к закону о предпринимательстве",
    excerpt: "Изменения упрощают регистрацию малого бизнеса и снижают административную нагрузку на предпринимателей.",
    source: "Коммерсантъ",
    time: "11:40",
    date: "2026-04-04",
    isBreaking: false,
    readTime: 5,
    ageGroups: ["adult", "senior"],
  },
  {
    id: 5,
    category: "energy",
    title: "«Газпром» подписал долгосрочные контракты на поставку СПГ в Азию",
    excerpt: "Контракты рассчитаны на 15 лет и предусматривают ежегодные поставки объёмом 12 млн тонн сжиженного природного газа.",
    source: "РБК",
    time: "09:22",
    date: "2026-04-04",
    isBreaking: false,
    readTime: 4,
    ageGroups: ["adult", "senior"],
  },
  {
    id: 6,
    category: "law",
    title: "Верховный суд разъяснил порядок взыскания убытков в корпоративных спорах",
    excerpt: "Пленум ВС принял постановление, которое устраняет правовую неопределённость при разрешении споров между акционерами.",
    source: "Forbes Russia",
    time: "16:55",
    date: "2026-04-03",
    isBreaking: false,
    readTime: 6,
    ageGroups: ["adult", "senior"],
  },
  {
    id: 7,
    category: "tech",
    title: "Российские школьники победили на международной олимпиаде по робототехнике",
    excerpt: "Команда из Москвы заняла первое место в категории автономных роботов. Ребята создали машину, умеющую самостоятельно сортировать мусор.",
    source: "РБК",
    time: "10:00",
    date: "2026-04-05",
    isBreaking: false,
    readTime: 3,
    ageGroups: ["kids", "youth"],
  },
  {
    id: 8,
    category: "tech",
    title: "В России запустили новую программу стажировок для студентов IT-специальностей",
    excerpt: "Крупнейшие технологические компании страны откроют 5 000 оплачиваемых мест для студентов с 2026 года.",
    source: "Ведомости",
    time: "09:30",
    date: "2026-04-05",
    isBreaking: false,
    readTime: 3,
    ageGroups: ["youth", "adult"],
  },
  {
    id: 9,
    category: "economy",
    title: "Пенсии в России вырастут на 8,5% с июля 2026 года",
    excerpt: "Правительство утвердило плановую индексацию страховых пенсий выше уровня инфляции. Повышение затронет более 40 млн человек.",
    source: "Коммерсантъ",
    time: "13:20",
    date: "2026-04-04",
    isBreaking: false,
    readTime: 2,
    ageGroups: ["senior"],
  },
  {
    id: 10,
    category: "tech",
    title: "Учёные создали приложение, которое помогает детям учить математику через игры",
    excerpt: "Разработка петербургских программистов уже используется в 200 школах. Успеваемость участников эксперимента выросла на 30%.",
    source: "Интерфакс",
    time: "11:00",
    date: "2026-04-03",
    isBreaking: false,
    readTime: 3,
    ageGroups: ["kids"],
  },
];
