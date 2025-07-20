import { useState, useEffect } from 'react';
import Button from './Button';

const overlayStyle = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "center", alignItems: "center"
};
const modalStyle = {
  background: "#fff", padding: "2em", borderRadius: "8px", boxShadow: '0 0 20px #0002', width: "100%", maxWidth: 400
};

const ModalForm = ({ isOpen, onClose, onSubmit, initialNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    setTitle(initialNote?.title || '');
    setDescription(initialNote?.description || '');
  }, [initialNote, isOpen]);
  if (!isOpen) return null;
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <form onSubmit={e => {
          e.preventDefault();
          onSubmit({ title, description });
        }}>
          <h2>{initialNote ? "Edit Note" : "Add Note"}</h2>
          <div>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              required
              style={{ width: "100%", marginBottom: 8, padding: 6 }}
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              required
              rows={4}
              style={{ width: "100%", marginBottom: 8, padding: 6 }}
            ></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="button" onClick={onClose} style={{ marginRight: 8, background: '#eee', color: '#555' }}>
              Cancel
            </Button>
            <Button type="submit">
              {initialNote ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;