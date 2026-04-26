import { TelegramSettingsForm } from "@/components/dashboard/TelegramSettingsForm";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Settings</h1>
      <TelegramSettingsForm />
    </div>
  );
}
