import { Bell, Search, Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  className?: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Header = ({ className, isCollapsed, onToggle }: HeaderProps) => {
  const { user, logout } = useAuth();
  return (
    <header className={cn("h-16 flex items-center justify-between px-6 bg-white border-b border-[#e5e7eb]", className)}>
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden p-2 rounded hover:bg-[#f3f4f6] cursor-pointer">
              <Menu className="h-5 w-5 text-[#374151]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-none">
            {/* onToggle is a no-op on mobile because we don't collapse there */}
            <Sidebar isCollapsed={false} onToggle={() => {}} />
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center gap-2 group border border-[#e5e7eb] rounded px-3 py-1.5 bg-[#f9fafb] focus-within:bg-white focus-within:border-[#008080] focus-within:ring-2 focus-within:ring-[#008080]/10 transition-all duration-300">
          <Search className="h-3.5 w-3.5 text-[#9ca3af] group-focus-within:text-[#008080]" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="bg-transparent border-none outline-none text-[13px] font-bold text-[#111827] placeholder:text-[#9ca3af] w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="h-9 w-9 flex items-center justify-center bg-white border border-[#e5e7eb] rounded text-[#6b7280] hover:text-[#111827] hover:border-[#9ca3af] transition-all cursor-pointer">
          <Bell className="h-4 w-4" />
        </button>

        <div className="h-8 w-px bg-[#e5e7eb] hidden md:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 group p-1 transition-opacity hover:opacity-80 cursor-pointer">
              <Avatar className="h-8 w-8 rounded-full border border-[#e5e7eb]">
                <AvatarImage src={user?.image_url || ""} />
                <AvatarFallback className="bg-[#111827] text-white text-[10px] font-black">
                  {user?.name?.substring(0, 2).toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden lg:block">
                <p className="text-[13px] font-bold text-[#111827] leading-none mb-1">{user?.name || "Guest"}</p>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#008080] leading-none">Premium Account</p>
              </div>
              <ChevronDown className="h-3 w-3 text-[#9ca3af] group-hover:text-[#111827] transition-all" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2 p-1 rounded-md bg-white border-[#e5e7eb] shadow-lg shadow-black/5 ring-1 ring-black/5">
            <DropdownMenuLabel className="px-3 py-2">
              <span className="text-[11px] font-bold text-[#6b7280] uppercase tracking-widest leading-none">Settings</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#f3f4f6]" />
            <div className="p-1">
              <DropdownMenuItem className="p-2.5 rounded flex items-center gap-2 text-[13px] font-bold text-[#374151] focus:bg-[#f9fafb] focus:text-[#111827] cursor-pointer">
                <User className="h-4 w-4 text-[#9ca3af]" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2.5 rounded flex items-center gap-2 text-[13px] font-bold text-[#374151] focus:bg-[#f9fafb] focus:text-[#111827] cursor-pointer">
                <Settings className="h-4 w-4 text-[#9ca3af]" />
                Security
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-[#f3f4f6]" />
            <DropdownMenuItem 
              onClick={logout}
              className="m-1 p-2.5 rounded flex items-center gap-2 text-[13px] font-black text-rose-500 focus:bg-rose-50 focus:text-rose-600 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

