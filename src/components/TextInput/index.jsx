import './styles.css';

export const TextInput = ({ actionFn, inputValue }) => {
  return (
    <input
      className="text-input"
      type="text"
      onChange={actionFn}
      value={inputValue}
      placeholder="Type your search"
    />
  );
};
