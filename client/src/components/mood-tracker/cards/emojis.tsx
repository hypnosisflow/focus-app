import { useContext } from "react";
import { feelsEmoji } from "../../../constants/emojis";
import { IEmojiItem } from "../../../models/types";
import { Button } from "../../../ui/button";

import { overallScores } from "../../../constants/scores";
import { MoodContext } from "../../../app-context";

export const Emojis = () => {
  const { onSelect, activeEmoji, onNextStep, setOverall, overall } =
    useContext(MoodContext);

  const emojisList = new Set(activeEmoji?.map((i) => i.emoji));

  return (
    <div className="w-full max-w-[90%] flex flex-col justify-center items-center">
      <span className="text-lg mt-8">rate your mood</span>
      <div className="flex  flex-row  mt-2   items-center justify-around w-full">
        {overallScores.map((item, index) => {
          return (
            <button
              onClick={() => setOverall(item.score)}
              key={index}
              className={`h-[48px] w-[48px] ${
                item.score === overall ? "scale-[1.35] shadow-sm" : "scale-100"
              } text-center rounded-full flex justify-center  text-4xl transition-all ease-in duration-200 ${
                item.color
              } items-center`}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      <span className="mt-8 text-lg">add emotions</span>

      <div className="flex gap-1 flex-wrap justify-between  mt-2 max-w-full">
        {feelsEmoji?.map((item: IEmojiItem, index: number) => {
          return (
            <div
              key={index}
              id={item.id}
              onClick={() => onSelect(item)}
              className={` flex flex-col items-center justify-center w-[80px] h-[60px]  cursor-pointer`}
            >
              <span
                className={`transition-all duration-300 ${
                  emojisList?.has(item.emoji)
                    ? "text-5xl bg-black/50 rounded-full"
                    : "text-3xl "
                }`}
              >
                {item.emoji}
              </span>
            </div>
          );
        })}
      </div>
      <Button
        handler={() => onNextStep()}
        textValue="add overall score"
        classes="text bg-slate-50 w-full mt-8"
        textColor="text-sm"
      />
    </div>
  );
};
