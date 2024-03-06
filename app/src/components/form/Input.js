import styles from './Input.module.css'

function Input({
    type,
    text,
    name,
    placeholder,
    handleOnChange,
    value,
    multiple,
    readonly,
    disabled,
}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}> {text}: </label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                readonly={readonly}
                disabled={disabled}
                onChange={handleOnChange}
                {...(multiple ? { multiple } : '')}
            />
        </div>
    )
}

export default Input