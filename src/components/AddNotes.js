import { React, useContext, useState } from "react";
import noteContext from "../Context/Notes/noteContext";
import alertContext from "../Context/Alert/alertContext";
import "react-toastify/dist/ReactToastify.css";

export const AddNotes = () => {
  const Context = useContext(noteContext);
  const Notification = useContext(alertContext);

  const { addNote } = Context;
  const { setMsg } = Notification;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    addNote(note.title, note.description, note.tag);

    setMsg("Note Added Sucessfully", "success");

    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h1>Add Your Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength={5}
              required
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              value={note.description}
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={note.tag}
              name="tag"
              onChange={onChange}
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddNotes;
