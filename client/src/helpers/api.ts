// import { IDeeplForm } from "../models/types";

export async function fetchWeather(city: string) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=aa12b19e1f5747bcac794129231608&q=${city}&aqi=no`
  );

  if (response.status === 200) {
    return response.json();
  }
}

// export const fetchDeepl = async () => {
//   const res = await fetch(
//     "https://api.deepl.com/v1/translate?text=Hello%20World!&target_lang=EN&auth_key=279a2e9d-83b3-c416-7e2d-f721593e42a0:fx",
//     {
//       method: "POST",
//     }
//   );

//   const data = res.json();
// };
