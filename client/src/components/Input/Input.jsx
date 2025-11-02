import style from './Input.module.css';

export const Input = ({ name, label, error, value, ...props }) => {
  if (name === 'message') {
    return (
      <div className={style.Input}>
        <label htmlFor={name}>{label}:</label>
        <textarea name={name} value={value || ''} {...props} />
        {value && error && <span>{error}</span>}
      </div>
    );
  }

  return (
    <div className={style.Input}>
      <label htmlFor={name}>{label}:</label>
      <input name={name} value={value || ''} {...props} />
      {value && error && <span>{error}</span>}
    </div>
  );
};
