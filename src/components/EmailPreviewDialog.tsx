import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EventItem } from "@/types/event";
import { toast } from "@/hooks/use-toast";

interface EmailPreviewDialogProps {
  event: EventItem;
  onSave: (event: EventItem) => void;
  onClose: () => void;
}

export function EmailPreviewDialog({ event, onSave, onClose }: EmailPreviewDialogProps) {
  const [draft, setDraft] = useState(event.emailDraft);

  const handleSave = () => {
    onSave({ ...event, emailDraft: draft });
    toast({ title: "Email draft saved" });
  };

  const handleSend = () => {
    toast({ title: "Email sent!", description: `Reminder email for "${event.name}" has been sent.` });
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Email Draft — {event.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="min-h-[250px] font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            ✨ AI-generated draft. Edit freely before sending.
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleSave}>Save Draft</Button>
          <Button onClick={handleSend}>Send Email</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
