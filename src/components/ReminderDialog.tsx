import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EventItem } from "@/types/event";
import { toast } from "@/hooks/use-toast";

interface ReminderDialogProps {
  event: EventItem;
  onSave: (event: EventItem) => void;
  onClose: () => void;
}

const REMINDER_OPTIONS = [
  { value: "15", label: "15 minutes before" },
  { value: "30", label: "30 minutes before" },
  { value: "60", label: "1 hour before" },
  { value: "120", label: "2 hours before" },
  { value: "1440", label: "1 day before" },
  { value: "10080", label: "1 week before" },
];

export function ReminderDialog({ event, onSave, onClose }: ReminderDialogProps) {
  const [reminderSet, setReminderSet] = useState(event.reminderSet);
  const [reminderBefore, setReminderBefore] = useState(String(event.reminderBefore));

  const handleSave = () => {
    onSave({ ...event, reminderSet, reminderBefore: Number(reminderBefore) });
    toast({
      title: reminderSet ? "Reminder scheduled" : "Reminder removed",
      description: reminderSet
        ? `You'll be reminded ${REMINDER_OPTIONS.find(o => o.value === reminderBefore)?.label || ""}`
        : undefined,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Reminder — {event.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="reminder-toggle">Enable Reminder</Label>
            <Switch id="reminder-toggle" checked={reminderSet} onCheckedChange={setReminderSet} />
          </div>
          {reminderSet && (
            <div className="space-y-2">
              <Label>Remind me</Label>
              <Select value={reminderBefore} onValueChange={setReminderBefore}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REMINDER_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
