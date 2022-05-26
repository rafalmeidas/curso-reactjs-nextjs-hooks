import './styles.css';

export const Button = ({ text, onClick, disable }) => {
  return (
    <button disabled={disable} className="button" onClick={onClick}>
      {text}
    </button>
  );
};
