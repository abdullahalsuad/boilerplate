import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import { TooltipProvider } from "@/components/ui/tooltip";

const ProtectedLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-[#fcfcfc] flex overflow-hidden font-sans">
      {/* Sidebar - Desktop Only with Toggle */}
      <aside className="hidden lg:block shrink-0 transition-all duration-300">
        <Sidebar 
          className="h-screen sticky top-0" 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen bg-[#fcfcfc]">
        <Header className="sticky top-0 z-40" isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    </TooltipProvider>
  );
};


export default ProtectedLayout;


