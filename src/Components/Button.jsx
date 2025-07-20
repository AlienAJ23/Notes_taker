const Button = ({ children, ...props }) => (
  <button
    style={{
      padding: '8px 12px',
      background: '#1e90ff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      ...props.style
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button;