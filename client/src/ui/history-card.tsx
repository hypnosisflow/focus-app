import { useRef } from "react";

import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { IPreviewData } from "../models/types";
import { overallScores } from "../constants/scores";

interface IHistoryCard {
  index: number;
  item: IPreviewData;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export const HistoryCard = ({ index, item, moveCard }: IHistoryCard) => {
  const ref = useRef<HTMLDivElement>(null);

  console.log(item);

  const [{ handlerId }, drop] = useDrop<
    IHistoryCard,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IHistoryCard, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "card",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const findEmoji = overallScores.filter((i) => i.score === item.overall)[0]
    .text;

  return (
    <div
      ref={ref}
      key={index}
      data-handler-id={handlerId}
      className="rounded-[15px] transition-all ease-linear duration-150 bg-slate-50/50 border-black/20 w-full flex flex-col gap-1 py-4"
    >
      <span className="text-xs text-slate-400">{item.createdAt}</span>

      <div className="flex w-full justify-center gap-8">
        <span className="text-7xl">{findEmoji}</span>
        <div className="flex flex-col text-xl justify-around ">
          <div className="mt-2 gap-2 flex">
            {item.activeEmoji?.map((i) => {
              return <span>{i.emoji}</span>;
            })}
          </div>

          <div className="mt-2 flex gap-2">
            <span>{item.conditionsScores?.energy}</span>
            <span>{item.conditionsScores?.sleep}</span>
            <span>{item.conditionsScores?.food}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-start px-2 mt-2 mx-2  gap-1">
        <span className="text-left leading-5 text-sm ">
          <span className="text-slate-400 mr-2 text-lg leading-4">note:</span>
          {item.dayNote}
        </span>
      </div>
    </div>
  );
};
