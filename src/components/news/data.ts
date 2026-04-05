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
}

export const CATEGORIES = [
  { id: "economy", label: "Экономика", icon: "TrendingUp", count: 48 },
  { id: "politics", label: "Политика", icon: "Landmark", count: 31 },
  { id: "tech", label: "Технологии", icon: "Cpu", count: 57 },
  { id: "markets", label: "Рынки", icon: "BarChart2", count: 24 },
  { id: "energy", label: "Энергетика", icon: "Zap", count: 19 },
  { id: "law", label: "Право", icon: "Scale", count: 12 },
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
  },
];
