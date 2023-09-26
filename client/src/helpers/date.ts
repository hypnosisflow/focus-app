export function getDate(zone: string ) {
  const date = new Date(new Date().toLocaleString("en-US", { timeZone: zone }));
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const currentDate = {
    day: day,
    dayNumber: date.getDay(),
    month: month,
    year: year,
  };

  const clock = `${hours}:${
    minutes.toString().split("").length == 1 ? "0" + minutes : minutes
  }`;

  return { clock, currentDate };
}
