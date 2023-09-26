import { useState, useRef } from "react";
import { tagList } from "../constants/notes";

export const NotesFilters = () => {
  const [activeFilters, setActiveFilters] = useState<Array<string>>([]);
  const ref = useRef(null);

  // console.log(activeFilters);

  function handleSelect(item: string) {
    const filtered = activeFilters.filter((filter) => filter !== item);

    if (activeFilters.includes(item)) return setActiveFilters([...filtered]);

    setActiveFilters([...activeFilters, item]);
  }

  return (
    <div className="justify-start w-[100%] md:w-full flex flex-row mt-1 py-2 gap-2 items-center flex-wrap">
      <div
        className={`w-[36px] h-[36px] bg-black/10 rounded-full items-center cursor-pointer flex justify-center transition-all ease duration-75 ml-2 `}
      >
        <span className={`text-sm text-slate-400`}>all</span>
      </div>
      {tagList.map((item, index) => {
        return (
          <button
            ref={ref}
            key={index}
            id={item.id}
            onClick={() => handleSelect(item.value)}
            className={`w-filt px-3 h-[32px] ${
              item.id
            } rounded-full  items-center cursor-pointer flex justify-center transition-all ease duration-75 ml-2 
f             ${
              activeFilters.includes(item.value) ? "bg-black/50" : "border-b-0"
            }   `}
          >
            <span className={`text-sm ${item.text}`}>{item.value}</span>
          </button>
        );
      })}
    </div>
  );
};
