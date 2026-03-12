import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Bell, BellOff, Pencil } from "lucide-react";
import { EventItem } from "@/types/event";
import { EmailPreviewDialog } from "./EmailPreviewDialog";
import { ReminderDialog } from "./ReminderDialog";
import { motion } from "framer-motion";

interface EventTableProps {
  events: EventItem[];
  onUpdateEvent: (event: EventItem) => void;
}

const typeBadgeVariant: Record<string, string> = {
  meeting: "bg-primary/10 text-primary",
  conference: "bg-success/10 text-success",
  deadline: "bg-destructive/10 text-destructive",
  birthday: "bg-warning/10 text-warning",
};

export function EventTable({ events, onUpdateEvent }: EventTableProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [dialogType, setDialogType] = useState<"email" | "reminder" | null>(null);

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <CalendarEmpty />
        <p className="mt-4 text-lg font-medium">No events yet</p>
        <p className="text-sm">Upload a CSV or Excel file to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reminder</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, i) => (
              <motion.tr
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b transition-colors hover:bg-muted/30"
              >
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell className="font-mono text-sm">{event.date}</TableCell>
                <TableCell className="font-mono text-sm">{event.time}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={typeBadgeVariant[event.type.toLowerCase()] || "bg-secondary text-secondary-foreground"}
                  >
                    {event.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {event.reminderSet ? (
                    <span className="flex items-center gap-1 text-sm text-success">
                      <Bell className="h-3.5 w-3.5" /> {event.reminderBefore}m before
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BellOff className="h-3.5 w-3.5" /> Not set
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSelectedEvent(event); setDialogType("email"); }}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSelectedEvent(event); setDialogType("reminder"); }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedEvent && dialogType === "email" && (
        <EmailPreviewDialog
          event={selectedEvent}
          onSave={(updated) => { onUpdateEvent(updated); setSelectedEvent(null); setDialogType(null); }}
          onClose={() => { setSelectedEvent(null); setDialogType(null); }}
        />
      )}

      {selectedEvent && dialogType === "reminder" && (
        <ReminderDialog
          event={selectedEvent}
          onSave={(updated) => { onUpdateEvent(updated); setSelectedEvent(null); setDialogType(null); }}
          onClose={() => { setSelectedEvent(null); setDialogType(null); }}
        />
      )}
    </>
  );
}

function CalendarEmpty() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
