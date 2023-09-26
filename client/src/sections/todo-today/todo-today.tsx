import { useEffect, useState } from "react";

interface IGoal {
  id: string;
  goal: string;
}

export const TodoToday = () => {
  const [counter, setCounter] = useState(0);
  const [suggestions, setSuggestions] = useState<Array<IGoal>>([]);

  useEffect(() => {
    setSuggestions(gs);
  }, []);

  const suggestedGoals = [
    "love family",
    "eat good",
    "exersice 30m",
    "study 60m",
    "code 120m",
    "sleep well 8h",
  ];

  const gs = suggestedGoals.map((g) => {
    return {
      id: Math.random().toString(),
      goal: g,
    };
  });

  const toggleGoal = (id: string) => {
    const t = document.getElementById(id);
    if (!t?.classList.contains("underline")) {
      t?.classList.add("underline");
      t?.classList.add("bg-green-100");
      setCounter((prev) => prev + 1);
    } else {
      setCounter((prev) => prev - 1);
      t.classList.remove("underline");
      t?.classList.remove("bg-green-100");
    }
  };

  return (
    <div className="h-[40%] border-t-2 w-full">
      <h2 className="text-2xl text-left font-bold">to-do today {counter}</h2>
      <ul className="text-left mt-2 ml-2 flex flex-wrap gap-2">
        {suggestions.map((item, index) => {
          return (
            <li
              id={item.id}
              key={index}
              onClick={(e) => toggleGoal(e.currentTarget.id)}
              className="border mb-2 px-4 bg-slate-100 rounded-[20px]"
            >
              <span className="font-semibold">{item.goal}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
