import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { sortNotes } from './Utils/helpers';

import ModalForm from "./Components/ModalForm";
import NotesList from "./Components/NotesList";
import Button from "./Components/Button";

const API_URL = "http://localhost:3001/notes";
const NOTES_PER_PAGE = 5;

function App() {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  //For Pagination
  const [currentPage, setCurrentPage] = useState(1);

  //For Search
  const [search, setSearch] = useState("");

  //For the Loading/Error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Loading the Notes from Databse through API
  useEffect(() => {
    setLoading(true);
    axios.get(API_URL)
      .then(res => setNotes(res.data))
      .catch(e => setError("Failed to load notes"))
      .finally(() => setLoading(false));
  }, []);

  const filteredSortedNotes = useMemo(() => {
    let fNotes = notes.filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
    );
    return sortNotes(fNotes);
  }, [notes, search]);

  const totalPages = Math.ceil(filteredSortedNotes.length / NOTES_PER_PAGE);
  const paginatedNotes = filteredSortedNotes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  //CRUD application using API Call
  async function handleAddNote(data) {
    setLoading(true);
    try {
      // json-server's POST assigns an id for us!
      const result = await axios.post(API_URL, {
        ...data, updatedAt: new Date().toISOString(), pinned: false
      });
      setNotes([result.data, ...notes]);
      setCurrentPage(1);
      setModalOpen(false);
    } catch {
      setError("Failed to add note");
    }
    setLoading(false);
  }

  async function handleEditNote(data) {
    setLoading(true);
    try {
      const updated = { ...editingNote, ...data, updatedAt: new Date().toISOString() };
      await axios.put(`${API_URL}/${editingNote.id}`, updated);
      setNotes(notes.map(n => n.id === editingNote.id ? updated : n));
      setEditingNote(null);
      setModalOpen(false);
    } catch {
      setError("Failed to edit note");
    }
    setLoading(false);
  }

  async function handleDeleteNote(id) {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(notes.filter(n => n.id !== id));
    } catch {
      setError("Failed to delete note");
    }
    setLoading(false);
  }

  async function handleTogglePin(id) {
    setLoading(true);
    try {
      const note = notes.find(n => n.id === id);
      if (!note) return;
      const updatedNote = { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() };
      await axios.put(`${API_URL}/${id}`, updatedNote);
      setNotes(notes.map(n => n.id === id ? updatedNote : n));
    } catch {
      setError("Failed to update pin");
    }
    setLoading(false);
  }

  // Modal form handling
  function openAddModal() {
    setEditingNote(null);
    setModalOpen(true);
  }
  function openEditModal(note) {
    setEditingNote(note);
    setModalOpen(true);
  }

  return (
    <div style={{
      maxWidth: 600, margin: "2em auto", background: "#f9f9f9", padding: "2em",
      borderRadius: "10px", boxShadow: "0 0 16px #0002"
    }}>
      <h1 style={{ textAlign: "center" }}>📝 Notes Taker</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Button onClick={openAddModal} style={{ flex: 1 }}>Add Note</Button>
        <input
          placeholder="Search notes..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          style={{ flex: 2, padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
        />
      </div>
      <NotesList
        notes={paginatedNotes}
        loading={loading}
        error={error}
        onEdit={openEditModal}
        onDelete={handleDeleteNote}
        onTogglePin={handleTogglePin}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <ModalForm
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingNote(null); }}
        onSubmit={editingNote ? handleEditNote : handleAddNote}
        initialNote={editingNote}
      />
    </div>
  );
}

export default App;
