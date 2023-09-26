import { useContext } from "react";
import { MoodContext } from "../../../app-context";
import { Button } from "../../../ui/button";

export const Loader = () => {
  const { onNextStep } = useContext(MoodContext);

  return (
    <div className="text-slate-300/70 w-full flex flex-col">
      <span className="mt-8">some tips for mood boost: </span>
      <span className="mt-4">sleep 8h</span>
      <span className="mt-1">eat banced food and hydrate</span>
      <span className="mt-1">working out for 30m</span>
      <span className="mt-1">avoid toxicity</span>
      <span className="mt-1">help others</span>

      <div className="mt-8 w-full justify-center flex">
        <Button
          handler={() => onNextStep()}
          bgColor="bg-slate-50/10"
          textValue="loader"
          classes="text-sm w-full  font-thin "
          textColor="text-slate-300"
        />
      </div>
    </div>
  );
};
