export function Input({
  name,
  id,
  type,
  placeholder,
  handleChanger,
  handleBlur,
  value,
}) {
  return (
    <div>
      <label htmlFor="">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={handleChanger}
          onBlur={handleBlur}
          value={value}
        />
      </label>
    </div>
  );
}
