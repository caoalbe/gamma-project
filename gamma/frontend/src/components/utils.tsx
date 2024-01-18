const MILLISECONDS_IN_SECOND = 1_000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3_600;
const SECONDS_IN_DAY = 86_400;
const SECONDS_IN_WEEK = 604_800;

export function process_date_time(input: string) {
  const postDateTime = new Date(input);
  const currDateTime = new Date();

  const diffSeconds =
    (currDateTime.getTime() - postDateTime.getTime()) / MILLISECONDS_IN_SECOND;

  if (diffSeconds < 0) {
    return "time-travelling post";
  }

  // post is less than a minute old
  if (diffSeconds <= SECONDS_IN_MINUTE) {
    return `${Math.floor(diffSeconds)}s`;
  }

  // post is less than an hour old
  if (diffSeconds <= SECONDS_IN_HOUR) {
    return `${Math.floor(diffSeconds / SECONDS_IN_MINUTE)}m`;
  }

  // post is less than a day old
  if (diffSeconds <= SECONDS_IN_DAY) {
    return `${Math.floor(diffSeconds / SECONDS_IN_HOUR)}h`;
  }

  // post is less than a week old
  if (diffSeconds <= SECONDS_IN_WEEK) {
    return `${Math.floor(diffSeconds / SECONDS_IN_DAY)}d`;
  }

  // just spell the entire date
  const options = {
    year: "numeric" as const,
    month: "short" as const,
    day: "numeric" as const,
  };
  return postDateTime
    .toLocaleDateString(undefined, options)
    .replaceAll(" ", "-");
}
