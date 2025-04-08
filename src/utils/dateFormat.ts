import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend Day.js with plugins
dayjs.extend(relativeTime);

const safeDateParse = (date: string | Date | null | undefined) => {
  if (!date) return null;

  try {
    const parsed = dayjs(date);
    return parsed.isValid() ? parsed : null;
  } catch (error) {
    console.error("Invalid date format:", date, error);
    return null;
  }
};

export const formatDate = {
  // For timestamps like "2 hours ago"
  relative: (date: string | Date | null | undefined) => {
    const parsed = safeDateParse(date);
    if (!parsed) return "Invalid date";

    try {
      return parsed.fromNow();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  },

  // For full dates like "Mar 15, 2024"
  short: (date: string | Date | null | undefined) => {
    const parsed = safeDateParse(date);
    if (!parsed) return "Invalid date";

    try {
      return parsed.format("MMM D, YYYY");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  },

  // For detailed dates like "March 15, 2024 14:30"
  full: (date: string | Date | null | undefined) => {
    const parsed = safeDateParse(date);
    if (!parsed) return "Invalid date";

    try {
      return parsed.format("MMMM D, YYYY HH:mm");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  },

  // For custom formats
  custom: (date: string | Date | null | undefined, formatString: string) => {
    const parsed = safeDateParse(date);
    if (!parsed) return "Invalid date";

    try {
      return parsed.format(formatString);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  },
};
