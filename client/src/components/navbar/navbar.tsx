import { useEffect, useState } from "react";
import { getDate } from "../../helpers/date";
import { fetchWeather } from "../../helpers/api";

interface INavbar {
  themeToggle: () => void;
  modalToggle: () => void;
}

export const Navbar = ({ themeToggle, modalToggle }: INavbar) => {
  const [weather, setWeather] = useState("+21");
  const [location, setLocation] = useState("Tomsk");
  const [condition, setCondition] = useState({ icon: "", text: "" });
  const [currentDate, setCurrentDate] = useState({
    day: 0,
    month: 0,
    year: 0,
    dayNumber: 0,
  });

  const [timeMSK, setTimeMSK] = useState("");
  const [timeEST, setTimeEST] = useState("");

  const data = {
    location,
    timeEST,
    weather,
    condition,
    currentDate,
    timeMSK
  };
  console.log(data);

  useEffect(() => {
    setTimeMSK(getDate("Europe/Moscow").clock);
    setTimeEST(getDate("Asia/Novosibirsk").clock);

    setInterval(() => {
      setTimeMSK(getDate("Europe/Moscow").clock);
      setTimeEST(getDate("Asia/Novosibirsk").clock);
    }, 60000);

    fetchWeather("Tomsk").then((response) => {
      setWeather(response.current.temp_c);
      setCondition(response.current.condition);
      setLocation("Tomsk");
    });

    setCurrentDate(getDate("Asia/Tomsk").currentDate);
  }, []);

  return (
    <div className="w-full mb-2 ">
      {" "}
      {/* header */}
      <div className="flex justify-between flex-row items-center p-1 md:flex-row ">
        <header
          onClick={themeToggle}
          className="flex text-left flex-row cursor-pointer "
        >
          {/* <img src={hand} alt="" className="h-[64px]" /> */}
          <h1 className="font-semibold text-left text-2xl">focus</h1>
        </header>

       
   

        <button onClick={modalToggle} className="border px-4 py-2 rounded-full border-slate-700">
          <span>sign in</span>
        </button>

        {/* <div className="flex flex-col text-xl ">
          <div className="flex flex-row gap-4">
            <span>RUB/USD</span>
            <span className="font-semibold">{USD}</span>
          </div>
          <div className="flex flex-row gap-4">
            <span>RUB/EUR</span>
            <span className="font-semibold">{EUR}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};
