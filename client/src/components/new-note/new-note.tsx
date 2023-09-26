import { useCallback, useState } from "react";
import { Button } from "../../ui/button";

import { INewNote, IDescr, INewLink } from "../../models/types";

import closeIcon from "../../assets/close.svg";

export const NewNote = ({ addNote, toggleForm }: INewNote) => {
  const [title, setTitle] = useState("");

  const [descr, setDescr] = useState<IDescr>({ active: false, value: "" });
  const [newLink, setNewLink] = useState<INewLink>({
    active: false,
    value: "",
  });
  const [tag] = useState("");
  // const [bullets, setBullets] = useState<Array<string>>([]);
  const [linksList, setLinksList] = useState<Array<string>>([]);

  // console.log(bullets);

  const [overlayToggle, setOverlayToggle] = useState(false);

  function handleAddLink() {
    setOverlayToggle((prev) => !prev);
    setNewLink({ active: true, value: "" });
  }

  function newLinksList() {
    setLinksList([...linksList, newLink.value]);
    setOverlayToggle((prev) => !prev);
    setNewLink({ active: false, value: "" });
  }

  function handleOverlayClose() {
    setOverlayToggle(false);
    setDescr({ active: false, value: "" });
    setNewLink({ active: false, value: "" });
  }

  // function handleAddBullet(item: string) {
  //   setOverlayToggle(false);
  //   setBullets((prev) => [...prev, item]);
  // }

  const newNoteForm = {
    title: title,
    links: linksList,
    description: descr.value,
    id: Date.now() + Math.random(),
    createdAt: Date.now(),
    tag: tag,
  };

  const renderLinks = useCallback((arr: Array<string>) => {
    return (
      <div className="mb-2 flex flex-col gap-2">
        {arr.map((item: string, index: number) => {
          return (
            <a
              href={item}
              key={index}
              target="_blank"
              className=" p-1 hover:bg-black/30 transition duration-200 rounded-[5px]"
            >
              <span className="font-normal text-sm leading-4 text-blue-500 hover:text-orange-400 transition duration-200 ">
                {item}
              </span>
            </a>
          );
        })}
      </div>
    );
  }, []);

  const AddLink = () => {
    return (
      <div className="flex items-center flex-col h-full w-full ">
        <span className="text-white text-4xl font-thin  text-center w-full">
          enter url
        </span>
        <input
          value={newLink.value}
          onChange={(e) => setNewLink({ active: true, value: e.target.value })}
          type="text"
          className=" mb-auto mt-8 w-3/4 mx-auto h-[32px] outline-none bg-white/10 text-white px-4 rounded-full font-thin border-white "
        />
        <Button
          handler={() => newLinksList()}
          bgColor="bg-slate-50/10"
          textColor="text-slate-100"
          classes="w-full mb-4"
          textValue="add link"
        />
      </div>
    );
  };

  const Overlay = () => {
    return (
      <div className=" bg-gray-500  h-full w-full absolute transition-all ease-linear duration-500 flex flex-col justify-between p-2 items-end text-center z-50 ">
        <div className="relative w-full">
          <Button
            handler={handleOverlayClose}
            classes="absolute w-[34px] font-bold right-0 top-0 mr-1 bg-transparent hover:border-0 border-0 p-0 uppercase"
            textValue="x"
            textColor="text-slate-100"
          />
        </div>
        {newLink.active && <AddLink />}
      </div>
    );
  };

  const links = renderLinks(linksList);

  return (
    <div className="transition-all backdrop-blur-[5px] ease duration-700 rounded-[15px] relative overflow-hidden hover:max-h-[800px] min-h-[66px] bg-black/10 shadow-md w-full mt-4 flex flex-col justify-around ">
      {/* links n descr forms  */}
      {overlayToggle && <Overlay />}

      {/* title */}
      <div className="m-2 flex justify-center items-center text-left">
        <input
          required
          placeholder="add title"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className=" w-full h-[32px]  text-orange-500  px-4 bg-black/10 rounded-full"
        />
        <img
          src={closeIcon}
          alt="close-icon"
          className="ml-3 cursor-pointer"
          onClick={() => toggleForm(false)}
        />
      </div>

      {/* desct */}
      <textarea
        onChange={(e) => setDescr({ active: true, value: e.target.value })}
        name="note" 
        value={descr.value}
        maxLength={150}
        className="border-[0px] w-full resize-none  focus:border-0 active:border-0  mb-2 text-white font-thin px-2 rounded-[0px] border-slate-400 bg-transparent py-1 "
      />

      {/* link list  */}
      {linksList.length > 0 ? (
        links
      ) : (
        <span className="mb-2 text-xs text-slate-500">
          no attached links yet
        </span>
      )}

      {/* buttons */}
      <div className="px-2 gap-2 flex flex-row  w-full justify-around items-start">
        <Button
          handler={() => handleAddLink()}
          textValue="add link"
          textColor="text-slate-400"
        />
        <Button
          handler={() => alert("feature incoming")}
          textValue="add bullet"
          textColor="text-slate-400"
        />
        <Button
          handler={() => alert("feature incoming")}
          textValue="add tag"
          textColor="text-slate-400"
        />
      </div>

      {/* bottom buttons  */}
      <div className="m-2 mt-4 flex flex-col gap-2 items-center  justify-center">
        {/*tags wrapper */}
        {/* <div className="w-full flex justify-center gap-1 flex-wrap">
          {tagList.map((item, index) => {
            return (
              <div
                onClick={(e) => onTagSelect(e.currentTarget.id)}
                key={index}
                id={item.id}
                className={`w-[90px] h-[32px] ${
                  item.id
                }  rounded-full items-center cursor-pointer flex justify-center transition-all ease duration-75  ${
                  item.id === tag ? "scale-[1.1] shadow-lg" : "border-0"
                }`}
              >
                {" "}
                <span className={`text-sm ${item.text}`}>{item.value}</span>
              </div>
            );
          })}
        </div> */}
        <Button
          handler={() => addNote(newNoteForm)}
          textValue="add new personal note"
          bgColor="bg-slate-50/10"
          textColor="text-slate-200"
          classes="w-full mt-4 mb-4"
        />
      </div>
    </div>
  );
};
