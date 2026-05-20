import {
  Banknote,
  CreditCard,
  TrendingUp,
  Wallet,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Tag,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TRANSACTIONS = [
  {
    name: "Global Groceries",
    category: "Needs",
    amount: -85.2,
    date: "Today",
    account: "Mastercard •• 42",
    type: "Expense",
    icon: Banknote,
  },
  {
    name: "Monthly Dividend",
    category: "Passive",
    amount: 1500.0,
    date: "Today",
    account: "Fidelity Inv.",
    type: "Income",
    icon: TrendingUp,
  },
  {
    name: "Creative Suite",
    category: "Work",
    amount: -52.99,
    date: "Yesterday",
    account: "Business Pro",
    type: "Expense",
    icon: CreditCard,
  },
  {
    name: "City Housing",
    category: "Rent",
    amount: -1200.0,
    date: "Yesterday",
    account: "Checking",
    type: "Expense",
    icon: Wallet,
  },
];

export const ActivityList = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white border-y border-[#e5e7eb] -mx-6 md:mx-0 md:rounded-xl md:border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafafa] border-b border-[#e5e7eb]">
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#9ca3af]">
                Description
              </th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#9ca3af] hidden lg:table-cell">
                Account
              </th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#9ca3af] text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3f4f6]">
            {TRANSACTIONS.map((item, i) => (
              <tr
                key={i}
                className="group hover:bg-[#fafafa] transition-colors cursor-pointer"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center p-2 shadow-sm border border-[#e5e7eb] transition-all group-hover:scale-110",
                        item.amount > 0
                          ? "bg-[#f0fdf4] text-[#059669]"
                          : "bg-white text-[#6b7280]",
                      )}
                    >
                      {item.amount > 0 ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-[14.5px] font-bold text-[#111827] leading-none mb-1.5">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#008080] uppercase tracking-wide">
                          <Tag className="h-3 w-3" />
                          {item.category}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#9ca3af] uppercase tracking-wide">
                          <Clock className="h-3 w-3" />
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 hidden lg:table-cell">
                  <span className="text-[13px] font-bold text-[#4b5563] bg-[#f3f4f6] px-2 py-1 rounded-md border border-[#e5e7eb]">
                    {item.account}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <p
                    className={cn(
                      "text-[16px] font-black tabular-nums tracking-tighter",
                      item.amount > 0 ? "text-[#059669]" : "text-[#111827]",
                    )}
                  >
                    {item.amount > 0 ? "+" : ""}
                    {item.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 bg-[#fafafa] border-t border-[#e5e7eb] flex justify-center">
          <button className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9ca3af] hover:text-[#008080] transition-colors flex items-center gap-2 cursor-pointer">
            <Search className="h-4 w-4" />
            Search Archive
          </button>
        </div>
      </div>
    </div>
  );
};
