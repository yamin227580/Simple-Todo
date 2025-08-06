import React, { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes, updateNote } from "../services/note";
import type { Note } from "../types/note";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [msg, setMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        throw new Error("failed to fetch data.");
      }
    };
    fetchNotes();
  }, [refresh]);

  const makeRefresh = () => {
    setRefresh(!refresh);
  };

  const addNewNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (msg.trim().length === 0) {
      return;
    }
    try {
      await createNote(msg);
      setMsg("");
      makeRefresh();
    } catch (error) {
      throw new Error("failed to create note.");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      makeRefresh();
    } catch (error) {
      throw new Error("failed to delete note.");
    }
  };

  const handleUpdateNoteCondition = async (id: string, title: string) => {
    setMsg(title);
    setEditMode(true);
    setEditId(id);
  };

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateNote(editId, msg);
      makeRefresh();
      setMsg("");
      setEditMode(false);
    } catch (error) {
      throw new Error("failed to update note.");
    }
  };

  return (
    <div>
      <h2>Note Lists</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note.title}
            <button
              type="button"
              style={{ cursor: "pointer" }}
              onClick={() => handleUpdateNoteCondition(note._id, note.title)}
            >
              Update
            </button>
            <button
              type="button"
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteNote(note._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={editMode ? handleUpdateNote : addNewNote}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">{editMode ? "Edit" : "Save"}</button>
      </form>
    </div>
  );
};
export default NoteList;
