import { createContext, useState } from "react";
import {
  IConditions,
  IEmojiItem,
  IMoodContext,
  IMoodWrapper,
  IPreviewData,
} from "./models/types";

export const MoodContext = createContext<IMoodContext>({} as IMoodContext);

export const MoodWrapper = ({ children }: IMoodWrapper) => {
  const [step, setStep] = useState(1);
  const [activeEmoji, setAactiveEmoji] = useState<Array<IEmojiItem>>([]);
  const [conditionsScores, setConditionsScores] = useState<IConditions>({
    energy: "",
    sleep: "",
    food: "",
  });
  const [dayNote, setDayNote] = useState("");
  const [moodList, setMoodList] = useState<Array<number>>([]);
  const [graphData, setGraphData] = useState<Array<number>>([]);
  const [overall, setOverall] = useState(0);
  const [history, setHistory] = useState<Array<IPreviewData>>([]);

  function onNextStep() {
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      setStep(1);
    }
  }

  function onMoodAdd(form: number) {
    setMoodList([...moodList, form]);
    setGraphData([...graphData, form]);
    onNextStep();
  }

  function send(item: IPreviewData) {
    onMoodAdd(overall);
    setHistory([...history, item]);
  }

  function onSelect(emoji: IEmojiItem) {
    const filtered = activeEmoji.filter((i) => i !== emoji);
    if (activeEmoji.includes(emoji)) return setAactiveEmoji([...filtered]);

    setAactiveEmoji([...activeEmoji, emoji]);
  }

  // separate

  return (
    <MoodContext.Provider
      value={{
        activeEmoji,
        onSelect,
        setConditionsScores,
        conditionsScores,
        setDayNote,
        dayNote,
        step,
        onNextStep,
        graphData,
        onMoodAdd,
        moodList,
        overall,
        setOverall,
        send,
        history,
        setHistory,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
