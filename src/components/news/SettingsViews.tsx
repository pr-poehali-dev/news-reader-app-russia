import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CATEGORIES } from "./data";

// ── Switch ────────────────────────────────────────────────────────────────────

function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="relative w-9 h-5 shrink-0">
      <div className={`w-9 h-5 rounded-full transition-colors ${on ? "bg-amber/80" : "bg-secondary"}`} />
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

// ── ProfilePage ───────────────────────────────────────────────────────────────

export function ProfilePage() {
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

// ── NotificationsPage ─────────────────────────────────────────────────────────

export function NotificationsPage() {
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
