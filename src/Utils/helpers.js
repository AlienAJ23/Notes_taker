

export function sortNotes(notes) {
  // First pinned notes (by updated time in descending order), then unpinned (by updated time in descending order)
  return [...notes]
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function formatDate(date) {
  return new Date(date).toLocaleString();
}
