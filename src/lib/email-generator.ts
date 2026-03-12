import { EventItem } from "@/types/event";

export function generateEmailDraft(event: EventItem): string {
  const templates: Record<string, (e: EventItem) => string> = {
    meeting: (e) =>
      `Subject: Reminder: ${e.name}\n\nHi there,\n\nThis is a friendly reminder about your upcoming meeting "${e.name}" scheduled for ${e.date} at ${e.time}.\n\nPlease ensure you have all necessary materials prepared. Let me know if you need to reschedule.\n\nBest regards`,
    conference: (e) =>
      `Subject: Don't Miss: ${e.name}\n\nHello,\n\nWe wanted to remind you that "${e.name}" is coming up on ${e.date} at ${e.time}.\n\nMake sure to register and review the agenda beforehand. Looking forward to seeing you there!\n\nCheers`,
    deadline: (e) =>
      `Subject: Deadline Approaching: ${e.name}\n\nHi,\n\nThis is a reminder that the deadline for "${e.name}" is ${e.date} at ${e.time}.\n\nPlease make sure all deliverables are submitted on time. Reach out if you need an extension.\n\nRegards`,
    birthday: (e) =>
      `Subject: Happy Birthday! 🎂\n\nHi,\n\nJust a reminder that ${e.name} is on ${e.date}!\n\nDon't forget to send your wishes and maybe grab a gift. 🎉\n\nCheers`,
    default: (e) =>
      `Subject: Reminder: ${e.name}\n\nHello,\n\nThis is a reminder about "${e.name}" on ${e.date} at ${e.time}.\n\nPlease make sure you're prepared and let us know if anything changes.\n\nBest regards`,
  };

  const typeLower = event.type.toLowerCase();
  const generator = templates[typeLower] || templates.default;
  return generator(event);
}
