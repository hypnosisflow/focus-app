import { useState, useEffect, useCallback } from "react";
import { Note } from "../../components/note/note";
import { NewNote } from "../../components/new-note/new-note";
import { Button } from "../../ui/button";
import { INote } from "../../models/types";

import { NotesFilters } from "../../ui/notes-filter";

export const Notes = () => {
  const [newNote, setNewNote] = useState(false);
  const [notes, setNotes] = useState<Array<INote>>([]);
  // const [filters, setFilters] = useState<Array<ITag>>(tagList);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes") as string);
    if (data) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("Notes", JSON.stringify(notes));
    }
  }, [notes]);

  const toggleForm = () => {
    setNewNote((prev) => (prev = !prev));
  };

  const addNote = (obj: INote) => {
    setNotes([obj, ...notes]);
    setNewNote(false);
  };

  const deleteNote = (id: string | number) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const renderNotesList = useCallback(() => {
    return (
      <div className="flex flex-col mt-4 max-h-[600px] h-full overflow-y-auto w-full">
        {notes.map((item, index) => {
          return (
            <Note
              key={index}
              id={item.id}
              title={item.title}
              links={item.links}
              description={item.description}
              tag={item.tag}
              deleteNote={() => deleteNote(item.id)}
              createdAt={item.createdAt}
            />
          );
        })}
      </div>
    );
  }, [notes]);

  const view = renderNotesList();

  return (
    <div className=" h-full w-full max-w-[420px] m-2  p-0 rounded-[15px] overflow-hidden">
      <div className="w-full flex flex-col">
        <div className=" flex flex-col items-center justify-center ">
          <span className="font-thin text-2xl text-slate-200">
            personal notes
          </span>
          <Button
            handler={toggleForm}
            textColor="text-slate-300"
            textValue="add new note"
            bgColor="bg-slate-100/10"
            classes=" w-full"
          />
        </div>
        <NotesFilters />
      </div>
      {newNote && <NewNote toggleForm={toggleForm} addNote={addNote} />}
      {view}
    </div>
  );
};
