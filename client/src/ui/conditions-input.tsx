import { useContext, useState } from "react";

import { MoodContext } from "../app-context";
import { IConditionsInput } from "../models/types";

export const ConditionsInput = ({ data }: IConditionsInput) => {
  const [value, setValue] = useState("");
  const { conditionsScores, setConditionsScores } = useContext(MoodContext);
  const { id, high, low } = data;

  function onConditionAdd(type: string, item: string) {
    setValue(item);
    switch (type) {
      case "energy":
        return setConditionsScores({ ...conditionsScores, energy: item });
      case "sleep":
        return setConditionsScores({ ...conditionsScores, sleep: item });
      case "food":
        return setConditionsScores({ ...conditionsScores, food: item });
    }
  }

  return (
    <div className="mt-2 rounded-full items-center flex justify-between px-2 w-full h-[48px] max-w-[400px] ">
      <button
        onClick={() => onConditionAdd(id, low)}
        className={`text-4xl  ${value === low ? "scale-150" : "scale-1"}`}
      >
        {low}
      </button>

      <span className="text-xl lowercase">{id}</span>

      <button
        onClick={() => onConditionAdd(id, high)}
        className={`text-4xl  ${value === high ? "scale-150" : "scale-1"} `}
      >
        {high}
      </button>
    </div>
  );
};
