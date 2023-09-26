import { useContext } from "react";

import { MoodContext } from "../../../app-context";
import { Button } from "../../../ui/button";
import { getDate } from "../../../helpers/date";
import { IPreviewData } from "../../../models/types";

import axios from "axios";
import { overallScores } from "../../../constants/scores";

export const Preview = () => {
  const { activeEmoji, conditionsScores, dayNote, onNextStep, overall, send } =
    useContext(MoodContext);

  const date = getDate("Asia/Tomsk").currentDate;
  const time = getDate("Asia/Tomsk").clock;

  const createdAt = `${date.day} ${
    date.month == 9 ? "september" : "todo!!"
  } ${time}`;

  const data: IPreviewData = {
    overall,
    activeEmoji,
    conditionsScores,
    dayNote,
    createdAt,
  };

  const emojisList = Array.from(new Set(activeEmoji?.map((i) => i.emoji)));

  const findEmoji = overallScores.filter((item) => item.score === overall)[0].text

  const submit = () => {
    send(data);
    onNextStep();
    axios.post("http://localhost:5050", data);
  };

  return (
    // todo: search for bettwer solution in UI
    <>
      <div className="flex flex-col justify-center bg-slate-50/50 rounded-[15px] py-4 px-2 mt-8 w-full items-center">
        <div className="flex  w-full   ">
          <span className="text-7xl ml-4">{findEmoji}</span>

          <div className=" flex flex-col items-start justify-center  ml-4 ">
            <span className="text-sm leading-3 text-slate-400">
              {createdAt}
            </span>

            <div className="flex flex-row gap-4 mt-2">
              {emojisList?.map((item, index) => {
                return (
                  <span key={index} className="text-xl ">
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full items-start ml-4 mt-4">
          <span className="text-lg text-slate-400">quality:</span>
          <div className="flex flex-row ml-4 justify-center gap-4 text-xl">
            <span>{conditionsScores?.energy}</span>
            <span>{conditionsScores?.sleep}</span>
            <span>{conditionsScores?.food}</span>
          </div>
        </div>

        <div className="flex gap-1 mt-2 items-center h-full justify-start  w-full ml-4">
          <span className="text-lg text-slate-400"> note:</span>
          <span className="ml-4 text-left">{dayNote}</span>
        </div>
      </div>
      <Button
        handler={submit}
        textValue="add card"
        bgColor="bg-slate-50"
        classes="text-sm w-full mt-8  "
      />
    </>
  );
};
