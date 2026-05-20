import { Landmark, CreditCard, Wallet, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCOUNTS = [
  { name: "Bank Al Habib", type: "BANK", balance: "$42,100.00", color: "bg-blue-600", icon: Landmark },
  { name: "Visa Gold", type: "CARD", balance: "$8,240.20", color: "bg-[#111827]", icon: CreditCard },
  { name: "SadaPay", type: "WALLET", balance: "$2,450.40", color: "bg-[#008080]", icon: Wallet },
  { name: "Cash in Hand", type: "CASH", balance: "$1,200.00", color: "bg-[#059669]", icon: Banknote },
];

export const AccountsGrid = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9ca3af]">My Accounts</h3>
        <button className="text-[11px] font-bold text-[#008080] hover:underline cursor-pointer">View All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACCOUNTS.map((acc, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow cursor-default group">
            <div className="flex items-start justify-between">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white", acc.color)}>
                <acc.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black text-[#9ca3af] uppercase tracking-widest">{acc.type}</span>
            </div>
            <div className="mt-8">
              <p className="text-[13px] font-bold text-[#6b7280] truncate">{acc.name}</p>
              <h4 className="text-[22px] font-black text-[#111827] mt-1 tabular-nums tracking-tight">{acc.balance}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
