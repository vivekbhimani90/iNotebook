import { React, useContext } from "react";
import noteContext from "../Context/Notes/noteContext";
import alertContext from "../Context/Alert/alertContext";

export const Notesitem = (props) => {
  const Context = useContext(noteContext);
  const { deleteNote } = Context;
  const { note, update } = props;
  const Notification = useContext(alertContext);
  const { setMsg } = Notification;
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body" style={{wordBreak:"break-word"}} >
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
                setMsg("Notes Delete Sucessfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                update(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Notesitem;
