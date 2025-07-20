import Button from "./Button";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div style={{ margin: "1em 0", display: "flex", gap: 8, justifyContent: "center" }}>
      <Button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Prev</Button>
      {Array.from({ length: totalPages }).map((_, idx) => (
        <Button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          style={{ background: currentPage === idx + 1 ? "#ababd5ff" : undefined }}
        >
          {idx + 1}
        </Button>
      ))}
      <Button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</Button>
    </div>
  );
};
export default Pagination;