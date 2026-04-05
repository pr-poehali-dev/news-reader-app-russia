import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CATEGORIES, AGE_GROUPS, SOURCES, NEWS, NewsItem } from "./data";

// ── SearchBar ─────────────────────────────────────────────────────────────────

export function SearchBar({
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

// ── NewsCard ──────────────────────────────────────────────────────────────────

export function NewsCard({ item, index }: { item: NewsItem; index: number }) {
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
          {item.ageGroups.map((ag) => {
            const group = AGE_GROUPS.find((g) => g.id === ag);
            if (!group) return null;
            return (
              <span
                key={ag}
                className={`font-mono text-[0.65rem] tracking-[0.05em] uppercase px-2 py-0.5 rounded-sm border ${group.color} ${group.border}`}
              >
                {group.label}
              </span>
            );
          })}
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

// ── HomePage ──────────────────────────────────────────────────────────────────

export function HomePage() {
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

// ── CategoriesPage ────────────────────────────────────────────────────────────

export function CategoriesPage() {
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

// ── AgeGroupsPage ─────────────────────────────────────────────────────────────

export function AgeGroupsPage() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const group = AGE_GROUPS.find((g) => g.id === activeGroup);
  const filtered = activeGroup ? NEWS.filter((n) => n.ageGroups.includes(activeGroup)) : [];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-semibold">По возрасту</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Новости подобраны по интересам — выберите свою группу. Все материалы доступны без ограничений.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {AGE_GROUPS.map((g) => {
          const count = NEWS.filter((n) => n.ageGroups.includes(g.id)).length;
          const isActive = activeGroup === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGroup(isActive ? null : g.id)}
              className={`flex items-start gap-4 p-5 border rounded text-left transition-all duration-150 ${
                isActive ? `${g.border} ${g.bg}` : "border-border hover:bg-secondary"
              }`}
            >
              <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 border ${
                isActive ? `${g.border} ${g.bg}` : "border-border bg-secondary"
              }`}>
                <Icon name={g.icon} size={20} className={isActive ? g.color : "text-muted-foreground"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`font-semibold text-sm ${isActive ? g.color : "text-foreground"}`}>
                    {g.label}
                  </span>
                  <span className={`font-mono text-[0.65rem] px-2 py-0.5 rounded-sm shrink-0 ${
                    isActive ? `${g.bg} ${g.color}` : "bg-secondary text-muted-foreground"
                  }`}>
                    {count}
                  </span>
                </div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-1">{g.sublabel}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {activeGroup && group && filtered.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className={`flex items-center gap-2 ${group.color}`}>
              <Icon name={group.icon} size={13} />
              <span className="text-xs font-mono uppercase tracking-widest">{group.label} — {group.sublabel}</span>
            </div>
            <div className="flex-1 border-t border-border" />
            <button
              onClick={() => setActiveGroup(null)}
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

      {activeGroup && filtered.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <Icon name="Inbox" size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">В этой группе пока нет новостей</p>
        </div>
      )}

      {!activeGroup && (
        <div className="text-center py-10 text-muted-foreground">
          <Icon name="Users" size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Выберите возрастную группу выше</p>
        </div>
      )}
    </div>
  );
}
