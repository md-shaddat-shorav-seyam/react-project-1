import { useEffect, useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    setNotes([
      ...notes,
      { id: Date.now(), text }
    ]);
    setText("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Notes</h1>

      <div className="input">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="notes">
        {notes.map(note => (
          <div key={note.id} className="note">
            <p>{note.text}</p>
            <button onClick={() => deleteNote(note.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
