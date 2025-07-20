

export function sortNotes(notes) {
  // First pinned notes (by updated time desc), then unpinned (by updated time desc)
  return [...notes]
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function formatDate(date) {
  return new Date(date).toLocaleString();
}