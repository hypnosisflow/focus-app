import "chart.js/auto";

import { ICard } from "../models/types";

import { Emojis } from "../components/mood-tracker/cards/emojis";
import { Conditions } from "../components/mood-tracker/cards/conditions";
import { Preview } from "../components/mood-tracker/cards/preview";
import { Loader } from "../components/mood-tracker/cards/loader";
import { Total } from "../components/mood-tracker/cards/total";

export const Card = ({ title, type }: ICard) => {
  const renderSteps = (type: string | undefined) => {
    switch (type) {
      case "card":
        return <Emojis />;
      case "conditions":
        return <Conditions />;
      case "preview":
        return <Preview />;
      case "loader":
        return <Loader />;
      case "total":
        return <Total />;
    }
  };

  const view = renderSteps(type);

  return (
    <div className=" w-full h-full mt-2 flex flex-col items-center">
      <span className="text-3xl text-slate-800 leading-7 font-semibold">
        {title}
      </span>
      {view}
    </div>
  );
};
