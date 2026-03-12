export interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  type: string;
  emailDraft: string;
  reminderBefore: number; // minutes before event
  reminderSet: boolean;
}
