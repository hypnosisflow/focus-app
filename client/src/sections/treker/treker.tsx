import { useCallback, useState } from "react";
import { IGoalForm } from "../../models/types";
import { Button } from "../../ui/button";
import { TaskInput } from "../../ui/task-input";
import { Task } from "../../ui/task";

export const Treker = () => {
  const [formOpened, setFormOpened] = useState(false);
  const [goalsList, setGoalsList] = useState<Array<IGoalForm>>([]);
  const [goalsCheckedList, setGoalsCheckedList] = useState<Array<string>>([]);
  const [goalsDone, setGoalsDone] = useState<Array<IGoalForm>>([]);
  const [showDone, setShowDown] = useState(false);

  console.log(showDone, goalsDone);

  const tasksCount = goalsList.length;
  const doneCount = goalsCheckedList.length;

  const goalsClearedFromDone = goalsList.filter(
    (item) => !goalsCheckedList.includes(item.id)
  );

  const handleShowDoneGoals = () => {
    const filtered = goalsList.filter((item) =>
      goalsCheckedList.includes(item.id)
    );
    setGoalsDone([...filtered]);
    setShowDown(true);
  };

  const handleTask = (form: IGoalForm) => {
    setGoalsList([...goalsList, form]);
    setFormOpened(false);
  };

  const handleFormToggle = () => {
    setFormOpened((prev) => !prev);
  };

  const handleCheck = (isChecked: boolean, id: string) => {
    console.log(isChecked);
    if (isChecked) return setGoalsCheckedList((prev) => [...prev, id]);
    if (!isChecked)
      return setGoalsCheckedList((prev) => [...prev].filter((i) => i !== id));
  };

  const renderTaskList = useCallback((arr: Array<IGoalForm>) => {
    return (
      <div className="mt-4 flex flex-col">
        {arr?.map((item: IGoalForm, index: number) => {
          return <Task item={item} index={index} handleCheck={handleCheck} />;
        })}
      </div>
    );
  }, []);

  const renderStats = useCallback((t: number, d: number) => {
    return (
      <div className="w-full flex items-center justify-evenly">
        <span className="text-sm font-semibold text-slate-800">
          total: <strong>{t}</strong>
        </span>
        <span className="text-sm font-semibold text-slate-800">
          done: <strong>{d}</strong>
        </span>
      </div>
    );
  }, []);

  // const renderDone = useCallback((arr: Array<IGoalForm>) => {
  //   return (
  //     <div className="mt-4 flex flex-col">
  //       {arr?.map((item: IGoalForm) => {
  //         return (
  //           <div>
  //             <span>{item.id}</span>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }, []);

  const tasks = renderTaskList(goalsList);
  const stats = renderStats(tasksCount, doneCount);
  // const done = renderDone(goalsDone);

  return (
    <div className="flex flex-col w-full max-w-[420px] p-2 items-center rounded-[5px]">
      <span className=" text-2xl w-full text-center font-thin  text-slate-200">
        task treker
      </span>
      <Button
        handler={handleFormToggle}
        textValue="add new task for today"
        classes="w-full "
        bgColor="bg-slate-50/10"
        textColor="text-slate-300"
      />
      <div className=" w-full h-full m-2 ">
        {stats}
        {formOpened && <TaskInput handler={handleTask} />}
        {/* {tasks} */}
        {tasks}
      </div>
      <div className="flex gap-4 mb-4 w-full">
        <Button
          handler={() => setShowDown(false)}
          bgColor="bg-slate-50/10"
          textValue="show all"
          textColor="text-slate-300"
        />
        <Button
          handler={handleShowDoneGoals}
          bgColor="bg-slate-50/10"
          textValue="show done goals"
          textColor="text-slate-300"
        />
      </div>

      <Button
        handler={() => setGoalsList([...goalsClearedFromDone])}
        bgColor="bg-slate-50/10"
        textValue="clear done goals"
        textColor="text-slate-300"
      />
    </div>
  );
};
