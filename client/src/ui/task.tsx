import { useRef, MutableRefObject } from "react";

import { useTimer } from "../hook";
import { IGoalForm } from "../models/types";

interface ITask {
  item: IGoalForm;
  index: number;
  handleCheck: (item: boolean, id: string) => void;
}

export const Task = ({ item, index, handleCheck }: ITask) => {
  const { id, time } = item;
  const { stopTimer, timeLeft, control, timeRunning } = useTimer(time);

  const ref = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <div
      key={index}
      className="mb-2 flex flex-row justify-between items-center bg-black/20  px-4 py-2 min-h-[48px] h-full gap-2 rounded-[15px]"
    >
      <div className="flex  items-center w-full">
        <input
          ref={ref}
          name={id}
          onChange={(e) => handleCheck(e.currentTarget.checked, id)}
          type="checkbox"
          className="w-[18px] h-[18px]  rounded-full mr-3  checked:border-fuchsia-900 checked:bg-fuchsia-900 default:bg-black/50 appearance-none cursor-pointer border-black border-2"
        />
        <span className="text-sm leading-4 lowercase text-slate-200 w-full text-left">
          {item.goal}
        </span>
      </div>
      <div className="flex items-center gap-1 ">
        <span className="text-indigo-500">{timeLeft}</span>
        {!timeRunning ? (
          <button
            onClick={() => control()}
            className="  text-slate-400  rounded-[5px] h-[24px] w-[24px]"
          >
            ▶️
          </button>
        ) : (
          <button
            onClick={() => stopTimer()}
            className="   text-slate-400  rounded-[5px] h-[24px] w-[24px]"
          >
            ⏸
          </button>
        )}
      </div>
    </div>
  );
};
