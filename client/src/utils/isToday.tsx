enum DAYS {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export default function isToday(text: string) {
  const day = DAYS[new Date().getDay()];
  if (text.toLocaleLowerCase().includes(day.toLocaleLowerCase())) {
    return <strong>{text}</strong>;
  }
  return text;
}
