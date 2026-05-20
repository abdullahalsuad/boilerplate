import { OverViewHeader } from "@/components/dashboard/OverViewHeader";
import { AccountsGrid } from "@/components/dashboard/AccountsGrid";
import { ActivityList } from "@/components/dashboard/ActivityList";

const OverView = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-32 pt-4 animate-in fade-in duration-700">
      {/* 1. Stats Bar (Balance, Income, Expenses) */}
      <OverViewHeader />

      {/* 2. All Accounting Cards */}
      <AccountsGrid />

      {/* 3. Recent Transactions */}
      <div className="space-y-6">
        <div className="px-2">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9ca3af]">Recent Transactions</h3>
        </div>
        <ActivityList />
      </div>
    </div>
  );
};

export default OverView;
