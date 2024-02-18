const MILLISECONDS_IN_SECOND = 1_000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3_600;
const SECONDS_IN_DAY = 86_400;
const SECONDS_IN_WEEK = 604_800;

function short_month(input: number) {
  // expecting input from [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  if (input < 0 || 11 < input || input - Math.floor(input) > 0) {
    return `invalid month number: ${input}`;
  }

  switch (input) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
}

function double_digit(input: number) {
  if (input.toString().length === 1) {
    return `0${input}`;
  }
  return input.toString();
}

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
  return `${postDateTime.getDate()}-${short_month(
    postDateTime.getMonth()
  )}-${postDateTime.getFullYear()}`;
}

export function full_date_time(input: string) {
  const target = new Date(input);

  return `${double_digit(target.getHours())}:${double_digit(
    target.getMinutes()
  )} · ${short_month(
    target.getMonth()
  )} ${target.getDate()}, ${target.getFullYear()}`;
}
