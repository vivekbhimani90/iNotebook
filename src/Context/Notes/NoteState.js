import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  //ADD NOTES FUNCTION

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //DELETE NOTES FUNCTION

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setNotes(json);

    const Newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(Newnotes);
  };

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnote`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  //EDIT NOTES FUNCTION

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    let neweditNote = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < neweditNote.length; index++) {
      const element = neweditNote[index];
      if (element._id === id) {
        neweditNote[index].title = title;
        neweditNote[index].description = description;
        neweditNote[index].tag = tag;
        break;
      }
    }
    setNotes(neweditNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
