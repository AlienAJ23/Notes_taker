import { formatDate } from '../Utils/helpers';
import Button from './Button';

const NoteCard = ({
  note, onEdit, onDelete, onTogglePin
}) => (
  <div style={{
    border:  '2px solid #ccc' ,
    borderRadius: '8px',
    padding: '1em',
    marginBottom: '1em',
    position: 'relative',
    background: note.pinned ? '#ccc': '#fff'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ margin: 0 }}>
        {note.title}
        {note.pinned && <span style={{ marginLeft: '8px', color: '#8d688cff' }}>📌</span>}
      </h3>
      <Button style={{ background: note.pinned ? '#aa9494ff' : '#eee', color: '#222', borderRadius: '4px'}} onClick={() => onTogglePin(note.id)}>
        {note.pinned ? 'Unpin' : 'Pin'}
      </Button>
    </div>
    <p>{note.description}</p>
    <small>Last updated: {formatDate(note.updatedAt)}</small>
    <div style={{ marginTop: 8 }}>
      <Button style={{ marginRight: 8, borderRadius: 4, color: '#000000'}} onClick={() => onEdit(note)}>Edit</Button>
      <Button style={{ background: '#b2a8c5ff', borderRadius: 4}} onClick={() => onDelete(note.id)}>Delete</Button>
    </div>
  </div>
);
export default NoteCard;