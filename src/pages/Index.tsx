import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { StatsCards } from "@/components/StatsCards";
import { EventTable } from "@/components/EventTable";
import { EventItem } from "@/types/event";

const Index = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  const handleEventsLoaded = (newEvents: EventItem[]) => {
    setEvents((prev) => [...prev, ...newEvents]);
  };

  const handleUpdateEvent = (updated: EventItem) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Event Reminder AI</h1>
          </div>
          <FileUpload onEventsLoaded={handleEventsLoaded} />
        </div>
      </header>

      {/* Main */}
      <main className="container py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StatsCards events={events} />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Events</h2>
            <p className="text-sm text-muted-foreground">{events.length} total</p>
          </div>
          <EventTable events={events} onUpdateEvent={handleUpdateEvent} />
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
