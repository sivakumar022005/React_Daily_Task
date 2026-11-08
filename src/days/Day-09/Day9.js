
import React, { useEffect, useState } from "react";

function Day9() {
  // Get notes from localStorage
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("my-notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // Save notes whenever notes change
  useEffect(() => {
    localStorage.setItem("my-notes", JSON.stringify(notes));
  }, [notes]);

  // Add or update note
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Please enter both title and description!");
      return;
    }

    if (editId !== null) {
      // Update existing note
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id === editId
            ? {
                ...note,
                title: title.trim(),
                description: description.trim(),
              }
            : note
        )
      );

      setEditId(null);
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
      };

      setNotes((previousNotes) => [
        ...previousNotes,
        newNote,
      ]);
    }

    setTitle("");
    setDescription("");
    setError("");
  };

  // Edit note
  const handleEdit = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note.id);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete note
  const handleDelete = (id) => {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );

    if (editId === id) {
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
    setError("");
  };

  // Search notes
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-cyan-400">
            My Notes 📝
          </h1>

          <p className="text-gray-400 mt-2">
            Create, edit, search and manage your notes.
          </p>

          <p className="text-cyan-300 mt-3">
            Total Notes: {notes.length}
          </p>
        </header>

        {/* Add / Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-6 rounded-2xl shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            {editId !== null ? "Edit Note ✏️" : "Add New Note ➕"}
          </h2>

          <input
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 mb-4 outline-none focus:border-cyan-400"
          />

          <textarea
            placeholder="Enter note description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-cyan-400 resize-none"
          />

          {error && (
            <p className="text-red-400 mt-3">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              type="submit"
              className="bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
            >
              {editId !== null ? "Update Note" : "Add Note"}
            </button>

            {editId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-slate-700 px-6 py-3 rounded-lg hover:bg-slate-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 outline-none focus:border-cyan-400"
          />
        </div>

        {/* Notes List */}
        <section>
          <h2 className="text-2xl font-bold mb-5">
            Your Notes
          </h2>

          {filteredNotes.length === 0 ? (
            <div className="bg-slate-900 p-8 rounded-xl text-center">
              <p className="text-gray-400">
                {notes.length === 0
                  ? "No notes available. Create your first note!"
                  : "No matching notes found."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-cyan-500 transition"
                >
                  <h3 className="text-xl font-bold text-cyan-400 mb-3 break-words">
                    {note.title}
                  </h3>

                  <p className="text-gray-300 whitespace-pre-wrap break-words">
                    {note.description}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleEdit(note)}
                      className="flex-1 bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
                    >
                      Edit ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(note.id)}
                      className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-400 transition"
                    >
                      Delete 🗑️
                    </button>
                  </div>
                </div>
              ))}

            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Day9;
