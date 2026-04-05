import { useState } from "react";
import Icon from "@/components/ui/icon";
import Header from "@/components/news/Header";
import { HomePage, CategoriesPage } from "@/components/news/NewsViews";
import { ProfilePage, NotificationsPage } from "@/components/news/SettingsViews";

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
