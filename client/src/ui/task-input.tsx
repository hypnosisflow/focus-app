import { useState } from "react";
import { Button } from "./button";
import { IGoalForm } from "../models/types";

interface ITaskInput {
  handler: (form: IGoalForm) => void;
}

export const TaskInput = ({ handler }: ITaskInput) => {
  const [goal, setGoal] = useState({ value: "" });
  const [goalTime, setGoalTime] = useState({ value: 0 });

  const goalForm: IGoalForm = {
    id: Math.random().toString(),
    goal: goal.value,
    time: goalTime.value,
    date: Date.now(),
    done: false,
  };

  return (
    <div className="flex w-full flex-col mt-2 justify-center bg-black/10 p-4 rounded-[15px] items-center gap-2">
      <div className="flex w-full flex-col">
        <span className="text-sm text-slate-400">description</span>
        <textarea
          id="goal"
          onChange={(e) => setGoal({ value: e.target.value })}
          maxLength={100}
          className=" w-[290px]  text-center mx-auto h-[100px] bg-transparent  text-indigo-500 text-xl p-2 rounded-[5px] resize-none "
        />
      </div>
      <div className="flex flex-row w-[290px] justify-center items-end gap-4">
        <div className="flex flex-col justify-center items-center w-[100px]">
          <span className="text-sm text-slate-400">m</span>
          <input
            onChange={(e) => setGoalTime({ value: +e.target.value })}
            type="text"
            className="w-[64px] h-[36px] text-center outline-none bg-black/20  text-indigo-500  rounded-full text-xl "
            maxLength={3}
          />
        </div>
        <Button
          handler={() => handler(goalForm)}
          classes="w-full"
          bgColor="bg-slate-50/10"
          textValue="add task"
          textColor="text-slate-300"
        />
      </div>
    </div>
  );
};
