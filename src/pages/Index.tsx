import { useState } from "react";
import Icon from "@/components/ui/icon";

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "economy", label: "Экономика", icon: "TrendingUp", count: 48 },
  { id: "politics", label: "Политика", icon: "Landmark", count: 31 },
  { id: "tech", label: "Технологии", icon: "Cpu", count: 57 },
  { id: "markets", label: "Рынки", icon: "BarChart2", count: 24 },
  { id: "energy", label: "Энергетика", icon: "Zap", count: 19 },
  { id: "law", label: "Право", icon: "Scale", count: 12 },
];

const SOURCES = ["РБК", "Ведомости", "Коммерсантъ", "Forbes Russia", "Интерфакс"];

interface NewsItem {
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

const NEWS: NewsItem[] = [
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

// ── Components ────────────────────────────────────────────────────────────────

function Header({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) {
  const nav = [
    { id: "home", label: "Главная", icon: "Newspaper" },
    { id: "categories", label: "Категории", icon: "LayoutGrid" },
    { id: "profile", label: "Профиль", icon: "User" },
    { id: "notifications", label: "Уведомления", icon: "Bell" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-amber rounded-sm flex items-center justify-center">
              <Icon name="Newspaper" size={13} className="text-background" />
            </div>
            <span className="font-serif font-semibold text-base tracking-tight">Вестник</span>
            <span className="font-mono text-[0.65rem] tracking-[0.07em] uppercase text-muted-foreground border border-border px-2 py-0.5 rounded-sm hidden sm:inline">
              Деловые новости
            </span>
          </div>

          <nav className="flex items-center gap-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all duration-150 ${
                  activeTab === item.id
                    ? "text-amber bg-amber/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon name={item.icon} size={14} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="divider-amber" />
    </header>
  );
}

function SearchBar({
  query, setQuery, dateFilter, setDateFilter, sourceFilter, setSourceFilter,
}: {
  query: string; setQuery: (v: string) => void;
  dateFilter: string; setDateFilter: (v: string) => void;
  sourceFilter: string; setSourceFilter: (v: string) => void;
}) {
  return (
    <div className="bg-surface-1 border border-border rounded p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по новостям..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-background border border-border rounded pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Icon name="Calendar" size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-background border border-border rounded pl-8 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-amber/50 transition-colors cursor-pointer"
            >
              <option value="">Любая дата</option>
              <option value="2026-04-05">Сегодня</option>
              <option value="2026-04-04">Вчера</option>
              <option value="2026-04-03">3 апреля</option>
            </select>
          </div>
          <div className="relative">
            <Icon name="Globe" size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-background border border-border rounded pl-8 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-amber/50 transition-colors cursor-pointer"
            >
              <option value="">Все источники</option>
              {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {(query || dateFilter || sourceFilter) && (
            <button
              onClick={() => { setQuery(""); setDateFilter(""); setSourceFilter(""); }}
              className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-border rounded transition-colors"
            >
              <Icon name="X" size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const cat = CATEGORIES.find((c) => c.id === item.category);
  return (
    <article
      className="news-card border border-border rounded p-5 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {item.isBreaking && (
            <span className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.05em] uppercase text-destructive">
              <span className="breaking-dot" /> Срочно
            </span>
          )}
          <span className="font-mono text-[0.65rem] tracking-[0.05em] uppercase text-amber border border-amber/30 px-2 py-0.5 rounded-sm">
            {cat?.label ?? item.category}
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.05em] uppercase text-muted-foreground border border-border px-2 py-0.5 rounded-sm">
            {item.source}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground shrink-0">
          <Icon name="Clock" size={11} />
          <span className="text-xs font-mono">{item.time}</span>
        </div>
      </div>

      <h3 className="font-serif text-lg font-semibold text-foreground leading-snug mb-2 hover:text-amber transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.excerpt}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">{item.readTime} мин чтения</span>
        <button className="flex items-center gap-1.5 text-xs text-amber hover:text-amber/80 transition-colors font-medium">
          Читать далее <Icon name="ArrowRight" size={12} />
        </button>
      </div>
    </article>
  );
}

// ── Pages ─────────────────────────────────────────────────────────────────────

function HomePage() {
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const filtered = NEWS.filter((n) => {
    const q = query.toLowerCase();
    const matchQuery = !query || n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q);
    const matchDate = !dateFilter || n.date === dateFilter;
    const matchSource = !sourceFilter || n.source === sourceFilter;
    return matchQuery && matchDate && matchSource;
  });

  const breaking = filtered.filter((n) => n.isBreaking);
  const regular = filtered.filter((n) => !n.isBreaking);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <p className="text-xs font-mono text-muted-foreground mb-1">ВС, 5 АПРЕЛЯ 2026</p>
        <h1 className="font-serif text-3xl font-semibold">Лента новостей</h1>
      </div>

      <SearchBar
        query={query} setQuery={setQuery}
        dateFilter={dateFilter} setDateFilter={setDateFilter}
        sourceFilter={sourceFilter} setSourceFilter={setSourceFilter}
      />

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">По вашему запросу ничего не найдено</p>
        </div>
      )}

      {breaking.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="breaking-dot" />
            <span className="font-mono text-[0.65rem] tracking-[0.07em] uppercase text-destructive font-semibold">Срочные новости</span>
          </div>
          <div className="flex flex-col gap-3">
            {breaking.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
          </div>
        </div>
      )}

      {regular.length > 0 && (
        <div>
          {breaking.length > 0 && (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Все новости</span>
              <div className="flex-1 border-t border-border" />
              <span className="text-xs font-mono text-muted-foreground">{regular.length}</span>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {regular.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filtered = activeCategory ? NEWS.filter((n) => n.category === activeCategory) : [];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold">Категории</h1>
        <p className="text-sm text-muted-foreground mt-1">Выберите тематику для фильтрации новостей</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            className={`flex items-center justify-between p-4 border rounded text-left transition-all duration-150 ${
              activeCategory === cat.id
                ? "border-amber/50 bg-amber/10"
                : "border-border hover:bg-secondary"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                name={cat.icon}
                size={18}
                className={activeCategory === cat.id ? "text-amber" : "text-muted-foreground"}
              />
              <span className={`text-sm font-medium ${activeCategory === cat.id ? "text-amber" : "text-foreground"}`}>
                {cat.label}
              </span>
            </div>
            <span className={`font-mono text-[0.65rem] px-2 py-0.5 rounded-sm ${
              activeCategory === cat.id ? "bg-amber/20 text-amber" : "bg-secondary text-muted-foreground"
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {activeCategory && filtered.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              {CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </span>
            <div className="flex-1 border-t border-border" />
            <button
              onClick={() => setActiveCategory(null)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Icon name="X" size={10} /> Сбросить
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {filtered.map((item, i) => <NewsCard key={item.id} item={item} index={i} />)}
          </div>
        </>
      )}

      {activeCategory && filtered.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <Icon name="Inbox" size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">В этой категории пока нет новостей</p>
        </div>
      )}

      {!activeCategory && (
        <div className="text-center py-10 text-muted-foreground">
          <Icon name="MousePointerClick" size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Выберите категорию выше</p>
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const [name, setName] = useState("Александр Петров");
  const [email, setEmail] = useState("a.petrov@company.ru");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold">Профиль</h1>
        <p className="text-sm text-muted-foreground mt-1">Персональные данные и настройки аккаунта</p>
      </div>

      <div className="flex items-center gap-4 p-5 border border-border rounded bg-surface-1 mb-6">
        <div className="w-14 h-14 rounded-full bg-amber/20 border border-amber/30 flex items-center justify-center shrink-0">
          <span className="font-serif text-xl text-amber font-semibold">АП</span>
        </div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="font-mono text-[0.65rem] tracking-[0.05em] uppercase text-amber border border-amber/30 px-2 py-0.5 rounded-sm">PRO</span>
            <span className="text-xs text-muted-foreground font-mono">Подписка активна</span>
          </div>
        </div>
      </div>

      <div className="border border-border rounded divide-y divide-border bg-surface-1">
        <div className="p-5">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Личные данные</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Полное имя</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-amber/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Электронная почта</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-amber/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Интересующие темы</h3>
          <div className="flex flex-col gap-3">
            {CATEGORIES.map((cat) => (
              <label key={cat.id} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Icon name={cat.icon} size={14} className="text-muted-foreground" />
                  {cat.label}
                </div>
                <div className="relative w-9 h-5">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={cat.id === "economy" || cat.id === "markets"}
                  />
                  <div className="w-9 h-5 bg-secondary rounded-full peer peer-checked:bg-amber/80 transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4 pointer-events-none" />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-amber text-background text-sm font-semibold rounded hover:bg-amber/90 transition-colors"
        >
          {saved ? "Сохранено ✓" : "Сохранить изменения"}
        </button>
        <button className="px-5 py-2 border border-border text-sm text-muted-foreground rounded hover:text-foreground transition-colors">
          Отмена
        </button>
      </div>
    </div>
  );
}

function NotificationsPage() {
  const [settings, setSettings] = useState({
    breaking: true,
    economy: true,
    politics: false,
    tech: true,
    markets: true,
    energy: false,
    law: false,
    digest: true,
    digestTime: "08:00",
    sound: false,
  });

  const toggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button onClick={onToggle} className="relative w-9 h-5 shrink-0">
        <div className={`w-9 h-5 rounded-full transition-colors ${on ? "bg-amber/80" : "bg-secondary"}`} />
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold">Уведомления</h1>
        <p className="text-sm text-muted-foreground mt-1">Управляйте оповещениями о срочных и важных новостях</p>
      </div>

      <div className="border border-border rounded bg-surface-1 divide-y divide-border">
        <div className="p-5">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Срочные новости</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="breaking-dot" /> Мгновенные оповещения
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Уведомления о событиях с пометкой «Срочно»</p>
            </div>
            <Switch on={settings.breaking} onToggle={() => toggle("breaking")} />
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">По категориям</h3>
          <div className="flex flex-col gap-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Icon name={cat.icon} size={14} className="text-muted-foreground" />
                  {cat.label}
                </div>
                <Switch
                  on={!!settings[cat.id as keyof typeof settings]}
                  onToggle={() => toggle(cat.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Дайджест</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-foreground">Ежедневный дайджест</p>
              <p className="text-xs text-muted-foreground mt-0.5">Сводка важнейших новостей дня</p>
            </div>
            <Switch on={settings.digest} onToggle={() => toggle("digest")} />
          </div>
          {settings.digest && (
            <div className="flex items-center gap-3 mt-2">
              <Icon name="Clock" size={13} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Время отправки:</span>
              <input
                type="time"
                value={settings.digestTime}
                onChange={(e) => setSettings((prev) => ({ ...prev, digestTime: e.target.value }))}
                className="bg-background border border-border rounded px-2 py-1 text-sm font-mono text-foreground focus:outline-none focus:border-amber/50 transition-colors"
              />
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Звуковые оповещения</p>
              <p className="text-xs text-muted-foreground mt-0.5">Звук при получении срочных новостей</p>
            </div>
            <Switch on={settings.sound} onToggle={() => toggle("sound")} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="px-5 py-2 bg-amber text-background text-sm font-semibold rounded hover:bg-amber/90 transition-colors">
          Сохранить настройки
        </button>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");

  const pages: Record<string, React.ReactElement> = {
    home: <HomePage />,
    categories: <CategoriesPage />,
    profile: <ProfilePage />,
    notifications: <NotificationsPage />,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-6xl mx-auto px-6 py-8">
        {pages[activeTab]}
      </main>
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber rounded-sm flex items-center justify-center">
              <Icon name="Newspaper" size={9} className="text-background" />
            </div>
            <span className="text-xs font-mono text-muted-foreground">ВЕСТНИК © 2026</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">v1.0</span>
        </div>
      </footer>
    </div>
  );
}