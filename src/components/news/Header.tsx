import Icon from "@/components/ui/icon";

const nav = [
  { id: "home", label: "Главная", icon: "Newspaper" },
  { id: "categories", label: "Категории", icon: "LayoutGrid" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "notifications", label: "Уведомления", icon: "Bell" },
];

export default function Header({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
}) {
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
