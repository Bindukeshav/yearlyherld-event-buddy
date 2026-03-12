import { CalendarDays, Mail, Bell, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EventItem } from "@/types/event";
import { motion } from "framer-motion";

interface StatsCardsProps {
  events: EventItem[];
}

export function StatsCards({ events }: StatsCardsProps) {
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now).length;
  const remindersSet = events.filter((e) => e.reminderSet).length;
  const draftsReady = events.filter((e) => e.emailDraft.length > 0).length;

  const stats = [
    { label: "Total Events", value: events.length, icon: CalendarDays, color: "text-primary" },
    { label: "Upcoming", value: upcoming, icon: Clock, color: "text-success" },
    { label: "Reminders Set", value: remindersSet, icon: Bell, color: "text-warning" },
    { label: "Drafts Ready", value: draftsReady, icon: Mail, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
        >
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
