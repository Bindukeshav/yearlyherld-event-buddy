import * as XLSX from "xlsx";
import { EventItem } from "@/types/event";
import { generateEmailDraft } from "./email-generator";
import { format, isValid } from "date-fns";

function formatDate(raw: string | number): string {
  const val = typeof raw === "string" ? raw.trim() : raw;
  
  // Excel serial number (number or numeric string like "46307")
  const num = typeof val === "number" ? val : Number(val);
  if (!isNaN(num) && num > 1000 && num < 200000) {
    const excelEpoch = new Date(1899, 11, 30);
    const parsed = new Date(excelEpoch.getTime() + num * 86400000);
    if (isValid(parsed)) return format(parsed, "MMM dd, yyyy");
  }

  // Try parsing string dates
  const parsed = new Date(String(val));
  if (isValid(parsed) && !isNaN(parsed.getTime())) return format(parsed, "MMM dd, yyyy");
  return String(val);
}

function normalizeHeader(header: string): string {
  return header.toLowerCase().replace(/[\s_-]+/g, "").trim();
}

function mapHeaders(headers: string[]): Record<string, number> {
  const mapping: Record<string, number> = {};
  headers.forEach((h, i) => {
    const normalized = normalizeHeader(h);
    if (normalized.includes("name") || normalized.includes("event")) mapping.name = i;
    if (normalized.includes("date")) mapping.date = i;
    if (normalized.includes("time")) mapping.time = i;
    if (normalized.includes("type") || normalized.includes("category")) mapping.type = i;
  });
  return mapping;
}

export async function parseFile(file: File): Promise<EventItem[]> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  if (rows.length < 2) return [];

  const headerMap = mapHeaders(rows[0]);
  const events: EventItem[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const name = row[headerMap.name] || "";
    const date = row[headerMap.date] || "";
    const time = row[headerMap.time] || "00:00";
    const type = row[headerMap.type] || "General";

    if (!name || !date) continue;

    const event: EventItem = {
      id: crypto.randomUUID(),
      name: String(name).trim(),
      date: formatDate(date),
      time: String(time).trim(),
      type: String(type).trim(),
      emailDraft: "",
      reminderBefore: 60,
      reminderSet: false,
    };
    event.emailDraft = generateEmailDraft(event);
    events.push(event);
  }

  return events;
}
