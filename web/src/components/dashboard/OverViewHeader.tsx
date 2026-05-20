import { ArrowUpRight, Calendar } from "lucide-react";

export const OverViewHeader = () => {
  return (
    <div className="flex flex-col space-y-8">
      {/* Date Filter & Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-[#111827] tracking-tight">
          Overview
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-[13px] font-bold text-[#374151] hover:bg-[#fafafa] cursor-pointer transition-all">
          <Calendar className="h-4 w-4 text-[#9ca3af]" />
          <span>This Month</span>
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-[#e5e7eb] shadow-sm group hover:border-[#008080] transition-all">
          <p className="text-[11px] font-black text-[#9ca3af] uppercase tracking-[0.2em]">
            Total Balance
          </p>
          <h2 className="text-4xl font-black text-[#111827] mt-4 tracking-tighter tabular-nums">
            $128,560.00
          </h2>
          <div className="mt-6 flex items-center gap-2 text-[12px] font-bold text-[#059669]">
            <ArrowUpRight className="h-4 w-4" />
            <span>+2.4% from last month</span>
          </div>
        </div>

        <div className="bg-[#f0fdf4] p-8 rounded-2xl border border-[#bcf0da] shadow-sm">
          <p className="text-[11px] font-black text-[#059669] uppercase tracking-[0.2em]">
            Total Income
          </p>
          <h2 className="text-4xl font-black text-[#111827] mt-4 tracking-tighter tabular-nums">
            $12,400.00
          </h2>
          <p className="mt-6 text-[12px] font-bold text-[#6b7280]">
            Received this month
          </p>
        </div>

        <div className="bg-[#fef2f2] p-8 rounded-2xl border border-[#fecaca] shadow-sm">
          <p className="text-[11px] font-black text-[#ef4444] uppercase tracking-[0.2em]">
            Total Expenses
          </p>
          <h2 className="text-4xl font-black text-[#111827] mt-4 tracking-tighter tabular-nums">
            $3,150.40
          </h2>
          <p className="mt-6 text-[12px] font-bold text-[#6b7280]">
            Spent this month
          </p>
        </div>
      </div>
    </div>
  );
};
