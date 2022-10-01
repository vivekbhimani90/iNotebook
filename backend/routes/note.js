const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1 Fetch All Notes
router.get("/fetchallnote", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Inerval Server Error");

    res.json(obj);
  }
});

//Route 2 Add Notes

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", " Please Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description Must Be Atleast 5 Cherecter").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Inerval Server Error");
    }
  }
);

//Route 3 Update notes

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a newNote Object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find to be note Updated and update it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Inerval Server Error");
  }
});

//Route 4  DELETE Notes

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find to be note Updated and update it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note Delete Sucessfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Inerval Server Error");
  }
});

module.exports = router;
