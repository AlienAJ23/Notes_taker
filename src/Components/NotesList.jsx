import NoteCard from "./NoteCard";
import Pagination from "./Pagination";

const NotesList = ({
  notes, loading, error, onEdit, onDelete, onTogglePin, currentPage, totalPages, onPageChange
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (notes.length === 0) return <div>No notes found.</div>;

  return (
    <>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
        />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
};
export default NotesList;