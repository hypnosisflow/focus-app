import { useCallback, useContext } from "react";
import { MoodContext } from "../../../app-context";
import { emojis } from "../../../constants/emojis";

import { Button } from "../../../ui/button";
import { ConditionsInput } from "../../../ui/conditions-input";
import { IConditionsEmoji } from "../../../models/types";

export const Conditions = () => {
  const { dayNote, setDayNote, onNextStep } = useContext(MoodContext);

  const renderInputs = useCallback((arr: Array<IConditionsEmoji>) => {
    return (
      <div className="w-[210px]">
        {arr.map((data, index) => {
          return <ConditionsInput data={data} key={index} />;
        })}
      </div>
    );
  }, []);

  const inputs = renderInputs(emojis.conditionsEmoji);

  return (
    <div className="flex w-[95%] mt-8 justify-center items-center flex-col">
      {inputs}

      <span className="mt-8 text-sm leading-4">
        share any additional information to track what conditions can affect
        your mood
      </span>

      <textarea
        value={dayNote}
        onChange={(e) => setDayNote(e.target.value)}
        className="mt-2 mb-4 w-full h-[150px] text-white bg-black/10 outline-none rounded-[15px] p-2 resize-none"
      />

      <Button
        handler={() => onNextStep()}
        textValue="add extra conditions"
        classes=" bg-slate-50  w-full "
      />
    </div>
  );
};
