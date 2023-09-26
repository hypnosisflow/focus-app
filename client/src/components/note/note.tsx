import { Button } from "../../ui/button";
import { INote } from "../../models/types";
import { useRef } from "react";

export const Note = ({
  title,
  links,
  description,
  // tag,
  id,
  createdAt,
  deleteNote,
}: INote) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleExpand() {
    const cur = ref.current;
    if (cur) cur.classList.toggle("expand");
  }

  const createdAtTransformed = () => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return { day, month, hours, minutes };
  };

  const viewDate =
    createdAtTransformed().day +
    "." +
    createdAtTransformed().month +
    " - " +
    createdAtTransformed().hours +
    ":" +
    createdAtTransformed().minutes;

  return (
    <div
      ref={ref}
      onClick={() => handleExpand()}
      className="transition-all  shadow-sm ease duration-700 rounded-[15px] relative overflow-hidden h-full max-h-[52px]  bg-black/20 mt-4 flex flex-col justify-between p-2 "
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-between w-full ">
          <span className="text-left  text-xl text-orange-400">{title}</span>
          <span className="text-left text-slate-400 text-xs">{viewDate}</span>
        </div>
      </div>

      {/* link list  */}
      <div className="text-sm text-left text-indigo-500 font-semibold flex flex-col leading-4 mt-4">
        {links?.map((item, index) => {
          return (
            <span key={index} className="mb-2 ">
              {item}
            </span>
          );
        })}
      </div>

      <div className="mt-4 text-left flex flex-col">
        <span className="text-left text-slate-300 text-[14px] leading-4 mb-2">
          {description}
        </span>
      </div>

      <div className="flex flex-row gap-2 mt-8 justify-end">
        <Button
          handler={() => alert("edit incoming")}
          classes="min-w-["
          textColor="text-slate-500"
          textValue="edit"
        />
        <Button
          // @ts-ignore
          handler={() => deleteNote(id)}
          classes="min-w-"
          textColor="text-slate-500"
          textValue="delete"
        />
      </div>
    </div>
  );
};
