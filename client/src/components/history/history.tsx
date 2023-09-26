import { useState, useCallback } from "react";
import update from "immutability-helper";

import { HistoryCard } from "../../ui/history-card";
import { IPreviewData } from "../../models/types";

interface IHistory {
  history: Array<IPreviewData>;
}

export const History = ({ history }: IHistory) => {
  const [cards, setCards] = useState(history);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: IPreviewData[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as IPreviewData],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((item: IPreviewData, index: number) => {
    return <HistoryCard index={index} item={item} moveCard={moveCard} />;
  }, [moveCard]);

  const view = cards.map((item, index) => renderCard(item, index));

  return <div className="w-full mt-8 gap-2 flex flex-col">{view}</div>;
};
