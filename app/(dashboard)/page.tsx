import { Overview } from "@/components/dashboard/Overview";
import { BotControl } from "@/components/dashboard/BotControl";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <BotControl />
      <Overview />
    </div>
  );
}
