import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseFile } from "@/lib/file-parser";
import { EventItem } from "@/types/event";
import { toast } from "@/hooks/use-toast";

interface FileUploadProps {
  onEventsLoaded: (events: EventItem[]) => void;
}

export function FileUpload({ onEventsLoaded }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const events = await parseFile(file);
      if (events.length === 0) {
        toast({ title: "No events found", description: "Make sure your file has columns for name, date, time, and type.", variant: "destructive" });
        return;
      }
      onEventsLoaded(events);
      toast({ title: `${events.length} events imported`, description: "AI email drafts have been generated." });
    } catch {
      toast({ title: "Failed to parse file", description: "Please upload a valid CSV or Excel file.", variant: "destructive" });
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={handleFile}
      />
      <Button onClick={() => inputRef.current?.click()} className="gap-2">
        <Upload className="h-4 w-4" />
        Upload Calendar
      </Button>
    </>
  );
}
