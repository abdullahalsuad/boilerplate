import { Link, useLocation } from "react-router";
import {
  Receipt,
  PiggyBank,
  Briefcase,
  Wallet,
  TrendingUp,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Transactions", href: "/transactions", icon: Receipt },
  { label: "Accounts", href: "/accounts", icon: Wallet },
  { label: "Expenses", href: "/expenses", icon: TrendingUp },
  { label: "Savings", href: "/savings", icon: PiggyBank },
  { label: "Budgets", href: "/budgets", icon: Briefcase },
];

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ className, isCollapsed, onToggle }: SidebarProps) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-[#e5e7eb] transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-[72px]" : "w-72",
        className,
      )}
    >
      {/* Collapse Toggle Button (PC only) */}
      <button
        onClick={onToggle}
        className="hidden lg:flex absolute -right-3 top-20 h-6 w-6 bg-white border border-[#e5e7eb] rounded-full items-center justify-center text-[#6b7280] hover:text-[#111827] shadow-sm cursor-pointer z-50 transition-transform hover:scale-110"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Brand Section */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-[#f3f4f6] transition-all",
          isCollapsed ? "justify-center px-0" : "px-6",
        )}
      >
        <Link
          to="/home"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center p-1.5 shadow-sm shrink-0">
            <Sprout className="w-full h-full text-white fill-white" />
          </div>
          {!isCollapsed && (
            <span className="text-[18px] font-black tracking-tight text-[#111827]">
              MyRizq
            </span>
          )}
        </Link>
      </div>

      {/* Primary Navigation */}
      <div className="flex-1 py-10 overflow-y-auto custom-scrollbar">
        <nav className={cn("space-y-2", isCollapsed ? "px-2" : "px-4")}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const content = (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-md transition-all relative h-11",
                  isCollapsed ? "justify-center px-0 w-full" : "px-4 gap-4",
                  isActive
                    ? "bg-teal-600 text-white"
                    : "text-[#4b5563] hover:text-teal-600 hover:bg-[#f9fafb]",
                )}
              >
                <item.icon
                  className={cn(
                    "shrink-0 transition-colors duration-300",
                    isCollapsed ? "w-5 h-5" : "w-[20px] h-[20px]",
                    isActive
                      ? "text-white"
                      : "text-[#9ca3af] group-hover:text-teal-600",
                  )}
                />
                {!isCollapsed && (
                  <span className="text-[15px] font-bold truncate tracking-tight">
                    {item.label}
                  </span>
                )}
              </Link>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{content}</TooltipTrigger>
                  <TooltipContent
                    side="right"
                    sideOffset={10}
                    className="bg-[#111827] border-none text-white font-bold text-xs py-2 px-3 rounded-lg shadow-xl translate-x-1"
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return content;
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Actions */}
      <div
        className={cn(
          "p-4 border-t border-[#f3f4f6] space-y-3",
          isCollapsed ? "items-center" : "",
        )}
      >
        <div
          className={cn(
            "bg-[#f9fafb] rounded-xl border border-[#f3f4f6] transition-colors hover:bg-[#f3f4f6] overflow-hidden",
            isCollapsed ? "p-1.5" : "p-3",
          )}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-lg border border-[#e5e7eb] shadow-sm shrink-0">
              <AvatarImage src={user?.image_url || ""} />
              <AvatarFallback className="bg-[#111827] text-white text-[11px] font-black underline decoration-[#008080] decoration-2">
                {user?.name?.substring(0, 2).toUpperCase() || "US"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-[14.5px] font-bold text-[#111827] truncate leading-tight">
                  {user?.name || "Guest"}
                </p>
                <p className="text-[11px] font-semibold text-[#9ca3af] truncate mt-1">
                  {user?.email || "guest@rizq.com"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col gap-1",
            isCollapsed ? "items-center" : "",
          )}
        >
          <Link
            to="/settings"
            className={cn(
              "flex items-center rounded-lg text-[#6b7280] hover:bg-[#f9fafb] hover:text-[#111827] transition-all group h-10",
              isCollapsed ? "justify-center w-10 px-0" : "px-3 gap-3",
            )}
          >
            <Settings className="w-5 h-5 text-[#9ca3af] group-hover:text-[#111827]" />
            {!isCollapsed && (
              <span className="text-[14px] font-bold">Settings</span>
            )}
          </Link>
          <button
            onClick={logout}
            className={cn(
              "flex items-center rounded-lg text-rose-500 hover:bg-rose-50 transition-all group cursor-pointer h-10 w-full",
              isCollapsed ? "justify-center w-10 px-0" : "px-3 gap-3",
            )}
          >
            <LogOut className="w-5 h-5 text-rose-400 group-hover:text-rose-500" />
            {!isCollapsed && (
              <span className="text-[14px] font-bold">Sign out</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
